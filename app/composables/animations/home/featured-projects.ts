import { gsap } from 'gsap'

export const initFeaturedProjectsAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  let observer: IntersectionObserver | null = null

  const ctx = gsap.context(() => {
    const header = el.querySelector('.projects-header')
    const cards = el.querySelectorAll('.project-card')
    const cta = el.querySelector('.projects-cta')

    if (!header || !cards.length || !cta) return

    gsap.set(header, { opacity: 0, y: 40 })
    gsap.set(cards, { opacity: 0, y: 60 })
    gsap.set(cta, { opacity: 0, y: 40 })

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

        const tl = gsap.timeline({
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

        observer?.disconnect()
      }
      ,
      { threshold: 0.18 }
    )

    observer.observe(el)
  }, el)

  return () => {
    observer?.disconnect()
    ctx.revert()
  }
}
