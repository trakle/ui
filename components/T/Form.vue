<script setup lang="ts" generic="T extends unknown">
const props = defineProps<{ execute: () => Promise<T> }>()

const emit = defineEmits<{
  resolve: [value: T | null]
  reject: [error: unknown]
}>()

const { isReady: ready, state, error, isLoading: loading, execute } = useAsyncState(props.execute, null, {
  onSuccess: value => emit('resolve', value),
  onError: error => emit('reject', error),
  immediate: false,
})

defineExpose({ execute })

const _form = ref<HTMLFormElement>()
</script>

<template>
  <form @submit.prevent="execute()" ref="_form">
    <slot :execute="() => _form?.checkValidity() && execute()" :ready :state :error :loading  ref="_form"/>
  </form>
</template>
