import { gsap } from 'gsap'

export const useMenuAnimation = (
  menuEl: HTMLElement,
  overlayEl: HTMLElement
) => {
  // 🔒 état initial
  gsap.set(menuEl, { xPercent: -100 })
  gsap.set(overlayEl, { opacity: 0, pointerEvents: 'none' })

  const tl = gsap.timeline({ paused: true })

  tl.to(overlayEl, {
    opacity: 1,
    pointerEvents: 'auto',
    duration: 0.4,
    ease: 'power2.out'
  })

  tl.to(menuEl, {
    xPercent: 0,
    duration: 0.8,
    ease: 'power4.out'
  }, '<')

  return {
    open: () => tl.play(),
    close: () => tl.reverse()
  }
}
