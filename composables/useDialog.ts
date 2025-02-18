import type { Reactive } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { createSharedComposable } from '@vueuse/core'

export interface ModalState {
  component: Component | string
  props: ComponentProps<Component>
}

export const dialogInjectionKey: InjectionKey<Reactive<Map<symbol, ModalState>>> = Symbol('trakle.modal')

export const useDialog = createSharedComposable(() => {
  const state = inject(dialogInjectionKey)
  if (!state) throw new Error('useModal() is called without provider')

  return function open<T extends Component, C = Parameters<ComponentProps<T>['onClose']>[0]>(component: T, props?: ComponentProps<T>): Promise<C> {
    component = markRaw(component)
    const symbol = Symbol('Dialog')
    const { promise, resolve } = Promise.withResolvers<C>()
    state.set(symbol, { component, props: { ...props, onClose: resolve } })
    promise.finally(() => state.delete(symbol))
    return promise
  }
})
