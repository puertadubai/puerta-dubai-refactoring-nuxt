export default defineNuxtPlugin(async () => {
  if (!import.meta.client) return

  const { isLoading } = usePreloader()

  // attendre le prochain frame (DOM prêt)
  await nextTick()

  const preloader = document.getElementById('preloader')
  if (!preloader) {
    isLoading.value = false
    return
  }

  // ⏱ délai minimum pour l'effet
  setTimeout(() => {
    preloader.classList.add('hide')

    setTimeout(() => {
      isLoading.value = false
    }, 800)
  }, 600)
})
