export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(toastInjectionKey, reactive(new Map()))
})
