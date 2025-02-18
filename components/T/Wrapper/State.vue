<script setup lang="ts" generic="T">
defineProps<{ state: T }>()
defineSlots<{ default: (props: T) => VNode }>()
</script>

<template>
  <slot v-bind="state" />
</template>
