export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  // éviter double injection
  if (document.getElementById('lucide-script')) return

  const script = document.createElement('script')
  script.id = 'lucide-script'
  script.src = 'https://cdn.jsdelivr.net/npm/lucide@0.475.0/dist/umd/lucide.min.js'
  script.defer = true

  script.onload = () => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons()
    }
  }

  document.head.appendChild(script)
})
