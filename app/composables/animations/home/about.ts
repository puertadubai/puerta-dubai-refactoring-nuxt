import { gsap } from 'gsap'

export const initAboutAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  let observer: IntersectionObserver | null = null

  const ctx = gsap.context(() => {
    const targets = el.querySelectorAll(
      '.about-title, .about-text, .about-divider, .about-cta'
    )

    gsap.set(targets, {
      opacity: 0,
      y: 40
    })

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15
        })

        observer?.disconnect()
      }
      ,
      { threshold: 0.2 }
    )

    observer.observe(el)
  }, el)

  return () => {
    observer?.disconnect()
    ctx.revert()
  }
}
