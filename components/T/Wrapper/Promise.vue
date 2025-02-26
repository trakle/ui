<script setup lang="ts" generic="T extends unknown, _args extends unknown[]">
const props = defineProps<{ execute: (...args: _args) => Promise<T> }>()

const emit = defineEmits<{
  resolve: [value: T]
  reject: [error: unknown]
}>()

const { isReady: ready, state, error, isLoading: loading, execute } = useAsyncState(props.execute, null, {
  onSuccess: value => {
    if (!value) throw new Error('success value cannot be null')
    emit('resolve', value)
  },
  onError: error => emit('reject', error),
  immediate: false,
})

defineExpose({execute})
</script>

<template>
  <slot :execute="(...args: _args) => execute(0, ...args)" :ready :state :error :loading />
</template>
