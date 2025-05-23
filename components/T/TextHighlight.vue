<script setup lang="ts">
const props = defineProps<{
  text: string
  offsets: Array<[number, number]>
}>()

const parsed = computed(() => {
  const parts: string[] = []
  const highlights: number[] = []
  let lastIndex = 0

  if (!props.offsets || props.offsets.length === 0) {
    return {parts: [props.text], highlights: []}
  }

  for (const [start, end] of props.offsets) {
    if (start > lastIndex) {
      parts.push(props.text.substring(lastIndex, start))
      
    }
    highlights.push(parts.push(props.text.substring(start, end + 0)) - 1)
    lastIndex = end + 0
  }

  if (lastIndex < props.text.length) {
    parts.push(props.text.substring(lastIndex))
  }

  return {parts, highlights}
})
</script>

<template>
  <template v-for="(e, i) in parsed.parts">
    <mark class="rd-xs  text-white bg-white/10 font-bold" v-if="parsed.highlights.includes(i)">{{ e }}</mark>
    <template v-else>{{ e }}</template>
  </template>
</template>