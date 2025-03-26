export function usePromise<_data, _args extends Array<unknown>>(fn: (...args: _args) => Promise<_data>) {
  const state = ref<_data>()
  const pending = ref(false)

  async function execute(...args: _args) {
    pending.value = true
    state.value = await fn(...args)
    pending.value = false
  }

  return { execute, state, pending }
}