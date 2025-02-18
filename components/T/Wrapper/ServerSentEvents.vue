<script setup lang="ts" generic="T extends unknown">
const { url } = defineProps<{ url: string }>()

const { close, event, eventSource, lastEventId, error, status, data, open } = useEventSource(url, [], { immediate: false, withCredentials: true, autoConnect: false, autoReconnect: false })
status.value = 'CLOSED'
</script>

<template>
  <slot :open :event :close :data :status :error :last-event-id :event-source />
</template>
