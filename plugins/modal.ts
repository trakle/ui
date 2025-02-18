export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(dialogInjectionKey, reactive(new Map()))
})
