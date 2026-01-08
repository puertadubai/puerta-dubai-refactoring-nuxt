import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initBenefitsAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  const title = el.querySelector('.benefits-title')
  const cards = el.querySelectorAll('.card')

  if (!title || !cards.length) return

  // 🔒 ÉTAT INITIAL
  gsap.set(title, { opacity: 0, y: 40 })
  gsap.set(cards, { opacity: 0, y: 60 })

  // 🎬 TITRE
  gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true
    }
  })

  // 🎴 CARTES (STAGGER)
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: el,
      start: 'top 70%',
      once: true
    }
  })
}
