import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const initFounderAnimation = (root: HTMLElement) => {
  const content = root.querySelector('.content')

  if (!content) return

  // === 1. Fade + text appearance ===
  gsap.fromTo(
    content,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: content,
        start: 'top 85%',
        once: true
      }
    }
  )

  // === 2. Section visible class ===
  ScrollTrigger.create({
    trigger: root,
    start: 'top 90%',
    once: true,
    onEnter: () => root.classList.add('visible')
  })
}
