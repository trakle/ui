<script setup lang="ts" generic="T extends unknown">
const props = defineProps<{ execute: () => Promise<T> }>()

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
  <form  @submit.prevent="() => execute(0)" >
    <slot :ready :state :error :loading :execute="() => execute(0)" />
  </form>
</template>
