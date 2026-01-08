import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initProjectHeroAnimation(root: HTMLElement) {
  if (!import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const img = root.querySelector('.hero-bg-img')
  const content = root.querySelector('.hero-content')

  if (!img || !content) return

  // ÉTAT INITIAL (identique à l’ancienne page sans animation violente)
  gsap.set(img, { scale: 1 })
  gsap.set(content, { opacity: 1, y: 0 })

  // ⚠️ Effets scroll (zoom / blur) seront ajoutés PLUS TARD
}
