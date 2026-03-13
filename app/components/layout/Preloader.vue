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

const getTrackableImages = () => {
  const images = Array.from(document.querySelectorAll('img'))

  return images.filter((img) => {
    if (img.closest('#preloader')) return false
    if (img.loading === 'lazy') return false
    return Boolean(img.currentSrc || img.getAttribute('src'))
  })
}

const trackPageAssets = (activeCycleId: number) => new Promise<void>((resolve) => {
  const images = getTrackableImages()
  const total = images.length

  if (!total) {
    setProgress(92)
    resolve()
    return
  }

  let loaded = 0
  let didResolve = false

  const finishTracking = () => {
    if (didResolve) return
    didResolve = true
    resolve()
  }

  const updateProgress = () => {
    if (activeCycleId !== cycleId) return
    const ratio = loaded / total
    setProgress(18 + ratio * 78)
  }

  const markLoaded = () => {
    if (didResolve) return
    loaded += 1
    updateProgress()
    if (loaded >= total) finishTracking()
  }

  updateProgress()

  // Failsafe: never block forever on a stalled image request.
  const timeoutId = window.setTimeout(() => {
    setProgress(96)
    finishTracking()
  }, 5000)

  images.forEach((img) => {
    if (img.complete) {
      markLoaded()
      return
    }

    const handleDone = () => {
      if (loaded + 1 >= total) {
        window.clearTimeout(timeoutId)
      }
      markLoaded()
    }

    img.addEventListener('load', handleDone, { once: true })
    img.addEventListener('error', handleDone, { once: true })
  })

  if (loaded >= total) {
    window.clearTimeout(timeoutId)
    finishTracking()
  }
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
        src="/img/logo-txt-blanc.svg"
        class="loader-logo"
        alt="Puerta Dubai"
      />

      <div class="loader-line">
        <span :style="{ width: progress + '%' }" />
      </div>
    </div>

    <div class="loader-overlay top" />
    <div class="loader-overlay bottom" />
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
}

.loader-logo {
  width: 180px;
  margin-bottom: 28px;
}

/* ======================
   Progress line
====================== */
.loader-line {
  width: 240px;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 auto;
  overflow: hidden;
}

.loader-line span {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(
    90deg,
    #d6c28f,
    #f5e6b5,
    #d6c28f
  );
  transition: width 0.25s ease-out;
  box-shadow: 0 0 8px rgba(214, 194, 143, 0.6);
}


/* ======================
   Overlays (cinematic)
====================== */
.loader-overlay {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  background: #302d2d;
  z-index: 1;
}

.loader-overlay.top {
  top: 0;
}

.loader-overlay.bottom {
  bottom: 0;
}
</style>
