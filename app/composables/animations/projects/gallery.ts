import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

interface GalleryElements {
  root: HTMLElement
  track: HTMLElement
  dots: HTMLElement
}

export function initProjectGallery({ root, track, dots }: GalleryElements) {
  if (!import.meta.client) return

  const items = Array.from(track.children) as HTMLElement[]
  if (!items.length) return

  let current = 0
  let itemWidth = 0
  let maxX = 0

  function layout() {
    itemWidth = items[0].offsetWidth
    maxX = -(itemWidth * (items.length - 1))
    gsap.set(track, { x: -current * itemWidth })
    renderDots()
  }

  function renderDots() {
    dots.innerHTML = ''
    items.forEach((_, i) => {
      const dot = document.createElement('button')
      dot.className = i === current ? 'active' : ''
      dot.addEventListener('click', () => goTo(i))
      dots.appendChild(dot)
    })
  }

  function goTo(index: number) {
    current = Math.max(0, Math.min(index, items.length - 1))
    gsap.to(track, {
      x: -current * itemWidth,
      duration: 0.8,
      ease: 'power3.out'
    })
    renderDots()
  }

  Draggable.create(track, {
    type: 'x',
    bounds: { minX: maxX, maxX: 0 },
    inertia: true,
    onDragEnd() {
      const x = gsap.getProperty(track, 'x') as number
      current = Math.round(-x / itemWidth)
      goTo(current)
    }
  })

  window.addEventListener('resize', layout)

  layout()
}
