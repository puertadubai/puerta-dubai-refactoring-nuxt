import { gsap } from 'gsap'

export const initFounderAnimation = (root: HTMLElement) => {
  let observer: IntersectionObserver | null = null

  const ctx = gsap.context(() => {
    const content = root.querySelector('.content')

    if (!content) return

    gsap.set(content, {
      opacity: 0,
      y: 50
    })

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

        root.classList.add('visible')

        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        })

        observer?.disconnect()
      }
      ,
      { threshold: 0.15 }
    )

    observer.observe(root)
  }, root)

  return () => {
    observer?.disconnect()
    ctx.revert()
  }
}
