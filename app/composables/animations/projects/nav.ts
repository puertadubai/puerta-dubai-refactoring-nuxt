import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initProjectNavigationAnimation(root: HTMLElement) {
  if (!import.meta.client) return

  const title = root.querySelector('.project-nav-title')
  const cards = root.querySelectorAll('.project-nav-card')

  if (!title || !cards.length) return

  gsap.set([title, cards], { opacity: 0, y: 60 })

  ScrollTrigger.create({
    trigger: root,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.1
      })
    }
  })
}
