import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const initGoldenVisaAnimation = (root: HTMLElement) => {
  const ctx = gsap.context(() => {
    const text = root.querySelector('.gv-text')
    const image = root.querySelector('.gv-image')

    if (!text || !image) return

    gsap.set(text, { opacity: 0, x: -60 })
    gsap.set(image, { opacity: 0, x: 60 })

    ScrollTrigger.create({
      trigger: root,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(text, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out'
        })

        gsap.to(image, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out'
        })
      }
    })
  }, root)

  return () => ctx.revert()
}
