<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'

const progress = ref(0)
const visible = ref(true)

const nuxtApp = useNuxtApp()
let cycleId = 0

const setProgress = (value: number) => {
  progress.value = Math.min(100, Math.max(0, value))
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const isNearViewport = (el: Element) => {
  const rect = el.getBoundingClientRect()
  const threshold = window.innerHeight * 1.25
  return rect.top <= threshold && rect.bottom >= -160
}

const shouldTrackImage = (img: HTMLImageElement) => {
  if (img.closest('#preloader')) return false
  const src = img.currentSrc || img.getAttribute('src') || img.getAttribute('srcset')
  if (!src) return false
  return img.loading !== 'lazy' || isNearViewport(img)
}

const shouldTrackVideo = (video: HTMLVideoElement) => {
  if (video.closest('#preloader')) return false
  const source = video.currentSrc || video.getAttribute('src') || video.querySelector('source')?.getAttribute('src')
  if (!source) return false
  return video.autoplay || video.preload === 'auto' || isNearViewport(video)
}

const trackPageAssets = (activeCycleId: number) => new Promise<void>((resolve) => {
  let tracked = 0
  let loaded = 0
  let didResolve = false
  let settled = false
  let settleTimer: number | null = null
  let timeoutId: number | null = null

  const trackedNodes = new WeakSet<Element>()
  const pendingNodes = new Set<Element>()
  let observer: MutationObserver | null = null

  const cleanup = () => {
    observer?.disconnect()
    if (settleTimer) window.clearTimeout(settleTimer)
    if (timeoutId) window.clearTimeout(timeoutId)
  }

  const finishTracking = () => {
    if (didResolve) return
    didResolve = true
    cleanup()
    resolve()
  }

  const updateProgress = () => {
    if (activeCycleId !== cycleId) return
    if (!tracked) {
      setProgress(92)
      return
    }

    const ratio = loaded / tracked
    setProgress(18 + ratio * 78)
  }

  const maybeFinish = () => {
    if (didResolve) return
    if (settled && pendingNodes.size === 0) finishTracking()
  }

  const scheduleSettle = () => {
    settled = false
    if (settleTimer) window.clearTimeout(settleTimer)
    settleTimer = window.setTimeout(() => {
      settled = true
      maybeFinish()
    }, 900)
  }

  const markLoaded = (node: Element) => {
    if (didResolve || !pendingNodes.has(node)) return
    pendingNodes.delete(node)
    loaded += 1
    updateProgress()
    maybeFinish()
  }

  const registerImage = (img: HTMLImageElement) => {
    if (trackedNodes.has(img) || !shouldTrackImage(img)) return

    trackedNodes.add(img)
    tracked += 1
    pendingNodes.add(img)
    updateProgress()

    if (img.complete) {
      markLoaded(img)
      return
    }

    const handleDone = () => markLoaded(img)
    img.addEventListener('load', handleDone, { once: true })
    img.addEventListener('error', handleDone, { once: true })
  }

  const registerVideo = (video: HTMLVideoElement) => {
    if (trackedNodes.has(video) || !shouldTrackVideo(video)) return

    trackedNodes.add(video)
    tracked += 1
    pendingNodes.add(video)
    updateProgress()

    if (video.readyState >= 2) {
      markLoaded(video)
      return
    }

    const handleDone = () => markLoaded(video)
    video.addEventListener('loadeddata', handleDone, { once: true })
    video.addEventListener('error', handleDone, { once: true })
  }

  const scanCriticalMedia = (root: ParentNode = document) => {
    root.querySelectorAll?.('img').forEach((node) => registerImage(node as HTMLImageElement))
    root.querySelectorAll?.('video').forEach((node) => registerVideo(node as HTMLVideoElement))
  }

  if ('fonts' in document && document.fonts.status !== 'loaded') {
    const fontToken = document.documentElement
    tracked += 1
    pendingNodes.add(fontToken)
    updateProgress()
    document.fonts.ready.finally(() => markLoaded(fontToken))
  }

  scanCriticalMedia()
  scheduleSettle()

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.target instanceof Element) {
        if (mutation.target.matches('img')) registerImage(mutation.target as HTMLImageElement)
        if (mutation.target.matches('video')) registerVideo(mutation.target as HTMLVideoElement)
        return
      }

      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return
        if (node.matches('img')) registerImage(node as HTMLImageElement)
        if (node.matches('video')) registerVideo(node as HTMLVideoElement)
        scanCriticalMedia(node)
      })
    })

    scheduleSettle()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'srcset', 'poster']
  })

  timeoutId = window.setTimeout(() => {
    setProgress(96)
    finishTracking()
  }, 8000)

  updateProgress()
  maybeFinish()
})

const finish = async (activeCycleId: number) => {
  if (activeCycleId !== cycleId) return
  setProgress(100)
  await wait(350)
  if (activeCycleId !== cycleId) return
  visible.value = false
  document.body.classList.add('loaded')
}

const startTrackingCycle = async () => {
  const activeCycleId = ++cycleId

  visible.value = true
  document.body.classList.remove('loaded')
  setProgress(6)

  await nextTick()
  await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))

  if (activeCycleId !== cycleId) return

  setProgress(14)
  await trackPageAssets(activeCycleId)
  await finish(activeCycleId)
}

onMounted(() => {
  startTrackingCycle()

  nuxtApp.hook('page:start', () => {
    visible.value = true
    document.body.classList.remove('loaded')
    setProgress(6)
  })

  nuxtApp.hook('page:finish', () => {
    startTrackingCycle()
  })
})
</script>

<template>
  <div v-if="visible" id="preloader">
    <div class="loader-content">
      <img
        src="/img/logo-loader.png"
        class="loader-logo"
        alt="Puerta Dubai"
      />

      <div class="loader-line">
        <span :style="{ width: progress + '%' }" />
      </div>
    </div>
  </div>
</template>


<style scoped>
#preloader {
  position: fixed;
  inset: 0;
  background: #302d2d;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ======================
   Content
====================== */
.loader-content {
  text-align: center;
  z-index: 2;
  width: min(620px, 86vw);
  transform: translateY(-2vh);
}

.loader-logo {
  width: min(112px, 22vw);
  margin-bottom: 42px;
  opacity: 0;
  filter: drop-shadow(0 14px 36px rgba(0, 0, 0, 0.36));
  animation: loaderLogoFade 0.9s ease-out 0.12s forwards;
}

@keyframes loaderLogoFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 0.92;
    transform: translateY(0);
  }
}

/* ======================
   Progress line
====================== */
.loader-line {
  width: min(150px, 23vw);
  height: 3px;
  background: transparent;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.72);
}

.loader-line span {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #000000 0%, #000000 72%, #1a1717 88%, #302d2d 100%);
  transition: width 0.25s ease-out;
  box-shadow: none;
}
</style>
