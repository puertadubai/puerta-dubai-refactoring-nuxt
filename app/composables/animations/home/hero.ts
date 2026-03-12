import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initHeroAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  const video = el.querySelector('.hero-video')
  const overlay = el.querySelector('.hero-overlay')
  const title = el.querySelector('.hero-title')
  const button = el.querySelector('.btn')

  if (!video || !overlay || !title || !button) return

  // 🔒 ÉTAT INITIAL
  gsap.set(video, { scale: 1.1 })
  gsap.set(overlay, { opacity: 1 })
  gsap.set([title, button], { opacity: 0, y: 40 })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 🎬 INTRO HERO
  tl.to(video, {
    scale: 1,
    duration: 1.8
  })

  tl.to(overlay, {
    opacity: 0.35,
    duration: 1.2
  }, 0)

  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 1
  }, '-=0.8')

  tl.to(button, {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.6')

  // Keep hero animation deterministic to avoid direction-change jank.
}
