import { gsap } from 'gsap'

export const initFooterAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return
  if (!el) return

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    if (!entry?.isIntersecting) return

    gsap.from(el, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out'
    })

    observer.disconnect()
  }, {
    threshold: 0.15
  })

  observer.observe(el)

  return () => observer.disconnect()
}
