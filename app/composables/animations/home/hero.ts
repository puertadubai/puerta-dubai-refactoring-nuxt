import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initHeroAnimation = (el: HTMLElement) => {
  if (!import.meta.client) return

  const video = el.querySelector('.hero-video')
  const overlay = el.querySelector('.hero-overlay')
  const title = el.querySelector('.hero-title')
  const button = el.querySelector('.btn')
  const letters = el.querySelectorAll('.hero-letter')

  if (!video || !overlay || !title || !button || !letters.length) return

  gsap.set(video, { scale: 1.1 })
  gsap.set(overlay, { opacity: 1 })
  gsap.set(title, { opacity: 1, y: 20 })
  gsap.set(letters, { opacity: 0, y: 18, filter: 'blur(3px)' })
  gsap.set(button, { opacity: 0, y: 24 })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(video, {
    scale: 1,
    duration: 1.8
  })

  tl.to(overlay, {
    opacity: 0.35,
    duration: 1.2
  }, 0)

  tl.to(letters, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.95,
    stagger: 0.04
  }, '-=1')

  tl.to(title, {
    y: 0,
    duration: 0.9
  }, '<')

  tl.to(button, {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.35')

  // Keep hero animation deterministic to avoid direction-change jank.
}
