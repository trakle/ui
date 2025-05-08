<script setup lang="ts">
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui'

const id = useId()

const model = defineModel<number>()

defineProps<{min?: number, max?: number, icon?: string}>()
</script>

<template>
  <NumberFieldRoot
    v-model="model"
    :id
    :format-options="{
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      currencySign: 'accounting',
    }"
    b="solid 1 primary/10" bg="primary/5" rd="lg" shadow="sm" p="x4 y2" relative
    focus-within="shadow-[0_0_0_2px] shadow-stone-800 b-op-50 bg-op-10" hover="bg-op-10" lh="1"
    flex="~ nowrap items-center gap-4"
  >
  <Icon v-if="icon" :name="icon" size="150%"></Icon>
  <div flex="~ col" >
    <label font="200" op="80" text="xs" :for="id" pointer-events="none" >Starting Price</label>
    <NumberFieldInput tabular-nums  outline="focus:0" w="20"   />
  </div>
    <NumberFieldDecrement un-disabled="op-20" size="1em" >
      <Icon name="radix-icons:minus"  />
    </NumberFieldDecrement>
    <NumberFieldIncrement un-disabled="op-20" size="1em" >
      <Icon name="radix-icons:plus"  />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>