import { gsap } from 'gsap'

export const initPartnersAnimation = (track: HTMLElement) => {
  if (!import.meta.client) return

  let tween: gsap.core.Tween | null = null

  const startAnimation = () => {
    tween?.kill()

    const loopDistance = track.scrollWidth / 2
    if (!loopDistance) return

    gsap.set(track, { x: 0 })

    tween = gsap.to(track, {
      x: -loopDistance,
      duration: 30,
      ease: 'none',
      repeat: -1
    })
  }

  const images = Array.from(track.querySelectorAll('img'))
  let remainingImages = images.filter((img) => !img.complete).length

  const handleImageReady = () => {
    remainingImages -= 1
    if (remainingImages <= 0) {
      startAnimation()
    }
  }

  if (remainingImages === 0) {
    startAnimation()
  } else {
    images.forEach((img) => {
      if (img.complete) return
      img.addEventListener('load', handleImageReady, { once: true })
      img.addEventListener('error', handleImageReady, { once: true })
    })
  }

  window.addEventListener('resize', startAnimation)

  return () => {
    tween?.kill()
    window.removeEventListener('resize', startAnimation)
    images.forEach((img) => {
      img.removeEventListener('load', handleImageReady)
      img.removeEventListener('error', handleImageReady)
    })
  }
}
