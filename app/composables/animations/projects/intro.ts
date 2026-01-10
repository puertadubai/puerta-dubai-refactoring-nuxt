import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick } from 'vue'

export async function initProjectIntroAnimation(root: HTMLElement) {
  if (!import.meta.client || !root) return

  gsap.registerPlugin(ScrollTrigger)

  await nextTick()
  requestAnimationFrame(() => {
    const text = root.querySelector<HTMLElement>('.intro-text')
    if (!text) return

    const ctx = gsap.context(() => {
      /* ======================
         ÉTAT INITIAL
      ====================== */
      gsap.set(text, {
        opacity: 0,
        y: 40,
        willChange: 'transform, opacity'
      })

      /* ======================
         ANIMATION
      ====================== */
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }, root)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  })
}
