<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progressRef = ref<HTMLElement | null>(null)

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

  progressRef.value.style.width = `${progress}%`
}

onMounted(() => {
  if (!import.meta.client) return
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div id="scroll-progress">
    <span ref="progressRef"></span>
  </div>
</template>
