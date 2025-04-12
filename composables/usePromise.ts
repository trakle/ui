export function usePromise<_data, _args extends Array<unknown>>(fn: (...args: _args) => Promise<_data>) {
  const state = ref<_data>()
  const pending = ref(false)
  const error = ref()

  async function execute(...args: _args) {
    pending.value = true
    try {
      state.value = await fn(...args)
    } catch (err) {
      error.value = err
    }
    pending.value = false
  }

  return { execute, state, pending }
}