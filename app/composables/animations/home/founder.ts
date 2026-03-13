import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const initFounderAnimation = (root: HTMLElement) => {
  const ctx = gsap.context(() => {
    const content = root.querySelector('.content')

    if (!content) return

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
          once: true
        }
      }
    )

    ScrollTrigger.create({
      trigger: root,
      start: 'top 90%',
      once: true,
      onEnter: () => root.classList.add('visible')
    })
  }, root)

  return () => ctx.revert()
}
