export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle')
    const menu = document.getElementById('side-menu')
    const overlay = document.getElementById('menu-overlay')

    if (!toggle || !menu || !overlay) return

    toggle.addEventListener('click', () => {
      menu.classList.add('open')
      overlay.classList.add('active')
    })

    overlay.addEventListener('click', () => {
      menu.classList.remove('open')
      overlay.classList.remove('active')
    })
  })
})
