import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Args = {
  root: HTMLElement
  viewport: HTMLElement
  track: HTMLElement
  onIndexChange?: (i: number) => void
}

export const initServicesCarousel = ({
  root,
  viewport,
  track,
  onIndexChange
}: Args) => {
  if (!import.meta.client) return

  const cards = Array.from(track.querySelectorAll<HTMLElement>('.service-card'))
  const gap = 26
  const AUTOPLAY_MS = 5000

  let current = 0
  let autoplay: number | null = null

  const cardStep = () => {
    const first = cards[0]
    if (!first) return 0
    return first.getBoundingClientRect().width + gap
  }

  const maxIndex = () => {
    const visible = Math.max(
      1,
      Math.floor(viewport.clientWidth / cardStep())
    )
    return Math.max(0, cards.length - visible)
  }

  const goTo = (i: number, animate = true) => {
    current = Math.max(0, Math.min(i, maxIndex()))
    const x = -current * cardStep()

    animate
      ? gsap.to(track, { x, duration: 0.9, ease: 'power3.out' })
      : gsap.set(track, { x })

    onIndexChange?.(current)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  // 🔄 Autoplay
  const startAutoplay = () => {
    stopAutoplay()
    autoplay = window.setInterval(() => {
      current >= maxIndex() ? goTo(0) : next()
    }, AUTOPLAY_MS)
  }

  const stopAutoplay = () => {
    if (autoplay) {
      clearInterval(autoplay)
      autoplay = null
    }
  }

  // 🎬 Reveal
  gsap.utils.toArray(cards).forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.04,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    })
  })

  // 🖱️ Drag
  let startX = 0
  let baseX = 0
  let dragging = false

  track.addEventListener('pointerdown', (e) => {
    dragging = true
    startX = e.clientX
    baseX = gsap.getProperty(track, 'x') as number
    stopAutoplay()
  })

  track.addEventListener('pointermove', (e) => {
    if (!dragging) return
    gsap.set(track, { x: baseX + (e.clientX - startX) })
  })

  track.addEventListener('pointerup', () => {
    if (!dragging) return
    dragging = false
    const x = gsap.getProperty(track, 'x') as number
    goTo(Math.round(-x / cardStep()))
    startAutoplay()
  })

  window.addEventListener('resize', () => goTo(current, false))

  // Init
  goTo(0, false)
  startAutoplay()

  return { next, prev }
}
