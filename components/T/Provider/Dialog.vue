<script setup lang="ts">
const modalState = inject(dialogInjectionKey)
</script>

<template>
  <component :is="component" v-for="([symbol, { component, props }]) in modalState" :key="symbol" v-bind="props" />
</template>
