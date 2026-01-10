import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type InitArgs = {
  root: HTMLElement
  track: HTMLElement
  dots: HTMLElement
}

export function initProjectGallery({ root, track, dots }: InitArgs) {
  if (!import.meta.client) return () => {}

  gsap.registerPlugin(ScrollTrigger)

  let st: ScrollTrigger | null = null
  let tween: gsap.core.Tween | null = null
  let killed = false

  /* ======================
     Utils
  ====================== */
  const waitForImages = async () => {
    const imgs = Array.from(track.querySelectorAll('img')) as HTMLImageElement[]
    if (!imgs.length) return

    await Promise.all(
      imgs.map(img => {
        if (img.complete && img.naturalWidth > 0) return
        return new Promise<void>(resolve => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
      })
    )
  }

  const buildDots = (count: number) => {
    dots.innerHTML = ''
    if (count <= 1) return

    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.classList.add('dot')
      if (i === 0) btn.classList.add('active')

      btn.addEventListener('click', () => {
        if (!st) return
        const p = i / (count - 1)
        const y = st.start + (st.end - st.start) * p
        window.scrollTo({ top: y, behavior: 'smooth' })
      })

      dots.appendChild(btn)
    }
  }

  const setActiveDot = (index: number) => {
    dots.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('active', i === index)
    })
  }

  /* ======================
     INIT
  ====================== */
  const init = async () => {
    await waitForImages()
    if (killed) return

    const totalWidth = track.scrollWidth
    const viewport = root.clientWidth
    const maxX = totalWidth - viewport

    // ❗️ S’il n’y a rien à scroller → exit propre
    if (maxX <= 0) {
      gsap.set(track, { x: 0 })
      return
    }

    const imagesCount = track.querySelectorAll('img').length
    buildDots(imagesCount)

    gsap.set(track, { x: 0 })

    tween = gsap.to(track, {
      x: -maxX,
      ease: 'none',
      paused: true
    })

    // ⚠️ END CALCULÉ UNE FOIS, PUIS FIGÉ
    const scrollDistance = maxX

    st = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate(self) {
        tween?.progress(self.progress)

        if (imagesCount > 1) {
          const idx = Math.round(self.progress * (imagesCount - 1))
          setActiveDot(idx)
        }
      }
    })

    ScrollTrigger.refresh()
  }

  init()

  /* ======================
     CLEANUP
  ====================== */
  return () => {
    killed = true
    st?.kill()
    tween?.kill()
    st = null
    tween = null
  }
}
