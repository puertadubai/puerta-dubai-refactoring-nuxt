export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const cursor = document.querySelector('.custom-cursor')
  if (!cursor) return

  window.addEventListener('mousemove', (e) => {
    cursor.setAttribute(
      'style',
      `transform: translate(${e.clientX}px, ${e.clientY}px)`
    )
  })
})
