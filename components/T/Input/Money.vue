<script setup lang="ts">
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui'
import { focusOnInput } from '~~/layers/ui/utils/misc';

const id = useId()

const model = defineModel<number>()

defineProps<{ min?: number, max?: number, icon: string, label: string }>()
</script>

<template>
  <NumberFieldRoot v-model="model" :id
    :format-options="{ style: 'currency', currency: 'USD', currencyDisplay: 'symbol', currencySign: 'accounting', }"
    :min :max
    b="solid 1 primary/10" bg="primary/5 @hover:not-focus-within:op-10" rd="lg" shadow="primary/10" p="x4 y2" relative
    focus-within="shadow-sm b-op-50 bg-op-20" lh="1" flex="~ nowrap items-center gap-4" cursor="text" transition="ease-in-out 250"
    @pointerdown="focusOnInput"
  >
    <Icon v-if="icon" :name="icon" size="150%" />
    <div flex="~ col">
      <label font="200" op="80" text="xs" :for="id" pointer-events="none">{{label}}</label>
      <NumberFieldInput tabular-nums outline="focus:0" w="20" />
    </div>
    <NumberFieldDecrement un-disabled="op-20" size="1em">
      <Icon name="radix-icons:minus" />
    </NumberFieldDecrement>
    <NumberFieldIncrement un-disabled="op-20" size="1em">
      <Icon name="radix-icons:plus" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>