import { gsap } from 'gsap'

export const initBenefitsAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  let observer: IntersectionObserver | null = null

  const ctx = gsap.context(() => {
    const title = el.querySelector('.benefits-title')
    const cards = el.querySelectorAll('.card')

    if (!title || !cards.length) return

    gsap.set(title, { opacity: 0, y: 40 })
    gsap.set(cards, { opacity: 0, y: 60 })

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        })

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.1
        })

        observer?.disconnect()
      }
      ,
      { threshold: 0.22 }
    )

    observer.observe(el)
  }, el)

  return () => {
    observer?.disconnect()
    ctx.revert()
  }
}
