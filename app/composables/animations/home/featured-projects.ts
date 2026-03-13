import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initFeaturedProjectsAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  const ctx = gsap.context(() => {
    const header = el.querySelector('.projects-header')
    const cards = el.querySelectorAll('.project-card')
    const cta = el.querySelector('.projects-cta')

    if (!header || !cards.length || !cta) return

    gsap.set(header, { opacity: 0, y: 40 })
    gsap.set(cards, { opacity: 0, y: 60 })
    gsap.set(cta, { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        once: true
      },
      defaults: {
        ease: 'power3.out'
      }
    })

    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.9
    })

    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15
    }, '-=0.3')

    tl.to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.4')
  }, el)

  return () => ctx.revert()
}
