<template>
  <nav aria-label="breadcrumb" class="[&amp;_.preview]:p-2" op="80">
    <ol text="sm" font="500" flex="~ gap-2.5 items-center wrap">
      <li>
        <nuxt-link hover="text-primary" to="/"> Home</nuxt-link>
      </li>
      <Icon role="presentation" op="80" aria-hidden="true" name="material-symbols:arrow-forward-ios"></Icon>

      <template v-for="item in items">
        <li>
          <nuxt-link hover="text-primary" :to="item.to">{{ item.label }}</nuxt-link>
        </li>
        <Icon role="presentation" op="80" aria-hidden="true" name="material-symbols:arrow-forward-ios"></Icon>
      </template>
      <li class="inline-flex gap-1.5 items-center">
        <span role="link" aria-disabled="true" aria-current="page" class="text-foreground font-normal">{{ route.name}}</span>
      </li>
    </ol>

  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ label: string, to: RouteLocationRaw }>
}>()

const route = useRoute()

</script>