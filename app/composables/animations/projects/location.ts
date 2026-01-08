import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initProjectLocationAnimation(root: HTMLElement) {
  if (!import.meta.client) return

  const title = root.querySelector('.location-title')
  const text = root.querySelector('.location-text')
  const map = root.querySelector('.map-frame')

  if (!title || !text || !map) return

  gsap.set([title, text, map], { opacity: 0, y: 40 })

  ScrollTrigger.create({
    trigger: root,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out'
      })

      gsap.to(map, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out'
      })
    }
  })
}
