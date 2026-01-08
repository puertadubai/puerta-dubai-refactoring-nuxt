import { gsap } from 'gsap'

export const initPreloaderAnimation = (preloader: HTMLElement) => {
  const topOverlay = preloader.querySelector('.loader-overlay.top')
  const bottomOverlay = preloader.querySelector('.loader-overlay.bottom')
  const content = preloader.querySelector('.loader-content')

  if (!topOverlay || !bottomOverlay || !content) return

  const tl = gsap.timeline({
    defaults: { ease: 'power4.inOut' }
  })

  tl.to(content, {
    opacity: 0,
    duration: 1.4,
    delay: 0.4
  })

  tl.to(topOverlay, {
    yPercent: -200,
    duration: 1.8
  }, '-=0.4')

  tl.to(bottomOverlay, {
    yPercent: 200,
    duration: 1.8
  }, '<')

  tl.to(preloader, {
    opacity: 0,
    duration: 1.5,
    ease: 'expo.inOut',
    onComplete: () => {
      preloader.style.display = 'none'
      document.body.classList.add('loaded')
    }
  })
}
