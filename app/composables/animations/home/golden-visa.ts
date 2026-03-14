import { gsap } from 'gsap'

export const initGoldenVisaAnimation = (root: HTMLElement) => {
  let observer: IntersectionObserver | null = null

  const ctx = gsap.context(() => {
    const text = root.querySelector('.gv-text')
    const image = root.querySelector('.gv-image')

    if (!text || !image) return

    gsap.set(text, { opacity: 0, x: -60 })
    gsap.set(image, { opacity: 0, x: 60 })

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

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

        observer?.disconnect()
      }
      ,
      { threshold: 0.18 }
    )

    observer.observe(root)
  }, root)

  return () => {
    observer?.disconnect()
    ctx.revert()
  }
}
