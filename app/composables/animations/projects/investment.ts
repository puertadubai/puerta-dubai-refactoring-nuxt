import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initProjectInvestmentAnimation(root: HTMLElement) {
  if (!import.meta.client) return

  const title = root.querySelector('.investment-title')
  const text = root.querySelector('.investment-text')
  const cta = root.querySelector('.investment-cta')

  if (!title || !text || !cta) return

  gsap.set([title, text, cta], { opacity: 0, y: 50 })

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
        delay: 0.15,
        ease: 'power3.out'
      })

      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.3,
        ease: 'power3.out'
      })
    }
  })
}
