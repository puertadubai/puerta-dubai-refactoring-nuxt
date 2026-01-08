export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const updateProgress = () => {
    const progress = document.querySelector<HTMLSpanElement>(
      '#scroll-progress span'
    )
    if (!progress) return

    const scrollTop = window.scrollY
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight

    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    progress.style.width = `${percent}%`
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)

  // initial call
  requestAnimationFrame(updateProgress)
})
