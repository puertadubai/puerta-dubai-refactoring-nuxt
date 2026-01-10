import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick } from 'vue'

export async function initProjectHeroAnimation(root: HTMLElement) {
  if (!import.meta.client || !root) return

  gsap.registerPlugin(ScrollTrigger)

  await nextTick()
  requestAnimationFrame(() => {
    const img = root.querySelector<HTMLElement>('.hero-bg-img')
    const content = root.querySelector<HTMLElement>('.hero-content')

    if (!img || !content) return

    const ctx = gsap.context(() => {
      /* ======================
         ÉTAT INITIAL
      ====================== */
      gsap.set(img, {
        scale: 1,
        filter: 'blur(0px)',
        willChange: 'transform'
      })

      gsap.set(content, {
        opacity: 1,
        y: 0,
        willChange: 'transform, opacity'
      })

      /* ======================
         SCROLL EFFECT
      ====================== */
      gsap.to(img, {
        scale: 1.2,
        filter: 'blur(14px)',
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        onEnterBack: () => {
          gsap.to(img, { scale: 1, filter: 'blur(0px)', duration: 0.3 })
        }
      })
    }, root)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  })
}
