import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initHeroAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  const ctx = gsap.context(() => {
    const video = el.querySelector('.hero-video')
    const overlay = el.querySelector('.hero-overlay')
    const titleFrame = el.querySelector('.hero-title-frame')
    const title = el.querySelector('.hero-title')
    const button = el.querySelector('.btn')

    if (!video || !overlay || !titleFrame || !title || !button) return

    gsap.set(video, { scale: 1.14 })
    gsap.set(overlay, { opacity: 0.78 })
    gsap.set(titleFrame, { autoAlpha: 1 })
    gsap.set(title, {
      opacity: 0.38,
      y: 18,
      filter: 'blur(8px)',
      '--title-reveal': '-18%'
    })
    gsap.set(button, { opacity: 0, y: 24 })

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.to(video, {
      scale: 1.03,
      duration: 3.2,
      ease: 'none'
    })

    tl.to(overlay, {
      opacity: 0.5,
      duration: 2.8,
      ease: 'sine.out'
    }, 0)

    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      '--title-reveal': '100%',
      duration: 2.6
    }, 0.2)

    tl.to(button, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out'
    }, 1.7)
  }, el)

  return () => {
    ctx.revert()
  }
}
