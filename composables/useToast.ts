import type { ToastRoot } from 'reka-ui'
import type { Component, Reactive } from 'vue'

import type { ComponentProps } from 'vue-component-type-helpers'
import { createSharedComposable } from '@vueuse/core'

interface _item<T = Component> {
  props: ComponentProps<T>
  component: T
  remove: () => void
}
export const toastInjectionKey: InjectionKey<Reactive<Map<symbol, _item>>> = Symbol('trakle.toast')

export const useToast = createSharedComposable(<T extends Component>(component: T) => {
  type _props = ComponentProps<T>
  const toasts = inject(toastInjectionKey)
  if (!toasts) throw new Error('useToast() is called without provider')
  component = markRaw(component)

  return function open(props: _props) {
    const symbol = Symbol('Toast')
    function remove() {
      toasts?.delete(symbol)
    }

    toasts.set(symbol, { props, component, remove })
    return function patch(props: _props) {
      toasts.set(symbol, { props, component, remove })
    }
  }
})
