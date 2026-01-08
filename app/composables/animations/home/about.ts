import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initAboutAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  const targets = el.querySelectorAll(
    '.about-title, .about-text, .about-divider, .about-cta'
  )

  gsap.set(targets, {
    opacity: 0,
    y: 40
  })

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true
    }
  })
}
