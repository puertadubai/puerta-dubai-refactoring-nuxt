import { gsap } from 'gsap'

export const initPartnersAnimation = (track: HTMLElement) => {
  if (!import.meta.client) return

  // Sécurité : reset position
  gsap.set(track, { xPercent: 0 })

  gsap.to(track, {
    xPercent: -50,
    duration: 30,
    ease: 'none',
    repeat: -1
  })
}
