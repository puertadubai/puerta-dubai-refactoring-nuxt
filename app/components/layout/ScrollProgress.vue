<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progressRef = ref<HTMLElement | null>(null)
let rafId = 0

const updateProgress = () => {
  if (!progressRef.value) return

  const scrollTop =
    window.scrollY || document.documentElement.scrollTop

  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight

  const progress = docHeight > 0
    ? (scrollTop / docHeight) * 100
    : 0

  progressRef.value.style.transform = `scaleX(${progress / 100})`
}

const scheduleUpdate = () => {
  if (rafId) return
  rafId = window.requestAnimationFrame(() => {
    rafId = 0
    updateProgress()
  })
}

onMounted(() => {
  if (!import.meta.client) return
  updateProgress()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (rafId) window.cancelAnimationFrame(rafId)
})
</script>

<template>
  <div id="scroll-progress">
    <span ref="progressRef"></span>
  </div>
</template>
