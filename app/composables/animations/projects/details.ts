import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initProjectDetailsAnimation(root: HTMLElement) {
  if (!import.meta.client) return

  gsap.registerPlugin(ScrollTrigger)

  const amenities = root.querySelectorAll('.amenity')
  const right = root.querySelector('.details-right')

  gsap.from(amenities, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: root,
      start: 'top 75%',
      once: true
    }
  })

  if (right) {
    gsap.from(right, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 75%',
        once: true
      }
    })
  }
}
