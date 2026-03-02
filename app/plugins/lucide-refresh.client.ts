export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const refreshLucide = () => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons()
    }
  }

  refreshLucide()
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', refreshLucide)
})
