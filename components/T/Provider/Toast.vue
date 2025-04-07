<script setup lang="ts">
import { ToastProvider, ToastViewport } from 'reka-ui'

const toasts = inject(toastInjectionKey)
if (!toasts) throw new Error('toasts is injected without provider')

const position: 'top-center' | 'top-right' | 'bottom-right' | 'bottom-center' | 'top-left' | 'bottom-left' = 'bottom-right'

const hovered = ref(false)

const refs = ref<{ height: number }[]>([])

const height = computed(() => refs.value.reduce((acc, { height }) => acc + height + 16, 0))
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0)

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + 16, 0)
}
</script>

<template>
  <toast-provider swipe-direction="right">
    <component
      :is v-for="([symbol, { props, component: is, remove }], index) of toasts" :key="symbol" v-bind="props"
      :style="{
        '--index': (index - toasts.size) + toasts.size,
        '--before': toasts.size - 1 - index,
        '--offset': getOffset(index),
        '--scale': hovered ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--translate': hovered ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))',
      }"
      @update:open="!$event && remove()"
    />

    <toast-viewport
      p="8" position="fixed" bottom="0" right="0" flex="~ col gap-6" w="390px"
      max-w="100%" m="0" list-style="none" z="2147483647" outline="none hidden"
      :data-expanded="hovered"
      :style="{
        '--scale-factor': '0.05',
        '--translate-factor': position?.startsWith('top') ? '1px' : '-1px',
        '--gap': position?.startsWith('top') ? '16px' : '-16px',
        '--front-height': `${frontHeight}px`,
        '--height': `${height}px`,
      }"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    />
  </toast-provider>
</template>
