<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursor = ref<HTMLElement | null>(null)
const circle = ref<HTMLElement | null>(null)

/* ======================
   Config
====================== */
const MAGNETIC_STRENGTH = 0.35
const LERP = 0.12

/* ======================
   State
====================== */
let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let rafId = 0
let magneticTarget: HTMLElement | null = null
let isTouchDevice = false

/* ======================
   Helpers
====================== */
const isInteractive = (el: Element | null) =>
  el?.closest('a, button, .btn, .project-card, [data-cursor="hover"]')

const isMagnetic = (el: Element | null) =>
  el?.closest('.btn, [data-cursor="magnetic"]')

/* ======================
   Mouse move
====================== */
const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

/* ======================
   Hover detection
====================== */
const onPointerOver = (e: PointerEvent) => {
  if (!cursor.value) return

  const target = e.target as Element

  if (isInteractive(target)) {
    cursor.value.classList.add('is-hover')
  }

  const magnetic = isMagnetic(target)
  if (magnetic) magneticTarget = magnetic as HTMLElement
}

const onPointerOut = () => {
  cursor.value?.classList.remove('is-hover')
  magneticTarget = null
}

/* ======================
   Click pulse
====================== */
const onClick = () => {
  if (!cursor.value) return
  cursor.value.classList.remove('is-click')
  void cursor.value.offsetWidth // force reflow
  cursor.value.classList.add('is-click')
}

/* ======================
   Animation loop
====================== */
const animate = () => {
  let targetX = mouseX
  let targetY = mouseY

  if (magneticTarget) {
    const rect = magneticTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    targetX += (centerX - mouseX) * MAGNETIC_STRENGTH
    targetY += (centerY - mouseY) * MAGNETIC_STRENGTH
  }

  currentX += (targetX - currentX) * LERP
  currentY += (targetY - currentY) * LERP

  if (circle.value) {
    circle.value.style.left = `${currentX}px`
    circle.value.style.top = `${currentY}px`
  }

  rafId = requestAnimationFrame(animate)
}

/* ======================
   Mount / Unmount
====================== */
onMounted(() => {
  if (!import.meta.client) return

  isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window

  if (isTouchDevice) return

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('pointerover', onPointerOver)
  document.addEventListener('pointerout', onPointerOut)
  document.addEventListener('mousedown', onClick)

  animate()
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('pointerover', onPointerOver)
  document.removeEventListener('pointerout', onPointerOut)
  document.removeEventListener('mousedown', onClick)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    v-if="!isTouchDevice"
    ref="cursor"
    class="custom-cursor"
  >
    <!-- CIRCLE -->
    <div ref="circle" class="cursor-circle"></div>
  </div>
</template>

<style scoped>
/* ======================
   Base
====================== */
.custom-cursor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

/* ======================
   Circle
====================== */
.cursor-circle {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.2);
  opacity: 0;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: invert(1) blur(2px);
  -webkit-backdrop-filter: invert(1) blur(2px);

  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(.19,1,.22,1);
}

/* ======================
   Hover state
====================== */
.custom-cursor.is-hover .cursor-circle {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* ======================
   Click pulse
====================== */
.custom-cursor.is-click .cursor-circle {
  animation: pulse 0.45s ease-out;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6);
    opacity: 0;
  }
}
</style>
