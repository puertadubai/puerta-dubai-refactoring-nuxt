<template>
  <div
    v-show="enabled"
    ref="cursor"
    class="custom-cursor"
  >
    <div class="cursor-line vertical"></div>
    <div class="cursor-line horizontal"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref<HTMLElement | null>(null)
const enabled = ref(false)

let mouseX = 0
let mouseY = 0
let rafId: number | null = null

const isDesktop = () =>
  window.matchMedia('(pointer: fine)').matches

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const render = () => {
  if (cursor.value) {
    cursor.value.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`
  }
  rafId = requestAnimationFrame(render)
}

onMounted(() => {
  if (!import.meta.client) return
  if (!isDesktop()) return

  enabled.value = true

  document.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(render)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}

.cursor-line {
  position: absolute;
  background: white;
}

.cursor-line.vertical {
  width: 1px;
  height: 40px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

.cursor-line.horizontal {
  height: 1px;
  width: 40px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
