import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initProjectIntroAnimation(root: HTMLElement) {
  if (!import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const text = root.querySelector('.intro-text')
  if (!text) return

  gsap.from(text, {
    opacity: 0,
    y: 40,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: root,
      start: 'top 80%',
      once: true
    }
  })
}
