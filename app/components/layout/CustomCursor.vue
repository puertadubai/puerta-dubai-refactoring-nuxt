<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from '#imports'

const cursor = ref<HTMLElement | null>(null)
const cross = ref<HTMLElement | null>(null)
const circle = ref<HTMLElement | null>(null)
const route = useRoute()

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
let isAnimating = false
let clickTimeout = 0

/* ======================
   Helpers
====================== */
const isIgnored = (el: Element | null) =>
  el?.closest('[data-language-select="true"], [data-cursor="ignore"]')

const isInteractive = (el: Element | null) =>
  !isIgnored(el) &&
  Boolean(el?.closest('a, button, summary, .btn, .project-card, [data-cursor="hover"]'))

const isMagnetic = (el: Element | null) =>
  el?.closest('.btn, [data-cursor="magnetic"]')

/* ======================
   Mouse move
====================== */
const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY

  if (cursor.value) {
    const target = e.target as Element | null
    const interactive = isInteractive(target)

    cursor.value.classList.toggle('is-hover', Boolean(interactive))
    magneticTarget = interactive
      ? ((isMagnetic(target) as HTMLElement | null) ?? null)
      : null
  }

  if (!isAnimating) {
    isAnimating = true
    animate()
  }
}

/* ======================
   Click pulse
====================== */
const onClick = () => {
  if (!cursor.value) return
  cursor.value.classList.remove('is-click')
  void cursor.value.offsetWidth // force reflow
  cursor.value.classList.add('is-click')

  window.clearTimeout(clickTimeout)
  clickTimeout = window.setTimeout(() => {
    cursor.value?.classList.remove('is-click')
  }, 220)
}

const resetHoverState = () => {
  cursor.value?.classList.remove('is-hover')
  magneticTarget = null
}

const syncHoverStateFromPoint = () => {
  if (!import.meta.client || !cursor.value) return

  const target = document.elementFromPoint(mouseX, mouseY)
  const interactive = isInteractive(target)

  cursor.value.classList.toggle('is-hover', Boolean(interactive))
  magneticTarget = interactive
    ? ((isMagnetic(target) as HTMLElement | null) ?? null)
    : null
}

const onFocusIn = (e: FocusEvent) => {
  const target = e.target as Element | null
  if (isIgnored(target)) {
    resetHoverState()
  }
}

const onFocusOut = () => {
  resetHoverState()
}

const resetCursorState = () => {
  resetHoverState()
  cursor.value?.classList.remove('is-click')
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

  const deltaX = Math.abs(targetX - currentX)
  const deltaY = Math.abs(targetY - currentY)

  if (cross.value) {
    cross.value.style.setProperty('--cursor-x', `${currentX}px`)
    cross.value.style.setProperty('--cursor-y', `${currentY}px`)
    cross.value.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 1))`
  }

  if (circle.value) {
    circle.value.style.setProperty('--cursor-x', `${currentX}px`)
    circle.value.style.setProperty('--cursor-y', `${currentY}px`)
    circle.value.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(var(--circle-scale, 0.2))`
  }

  if (deltaX < 0.1 && deltaY < 0.1 && !magneticTarget) {
    isAnimating = false
    rafId = 0
    return
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
  document.addEventListener('mousedown', onClick)
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('focusout', onFocusOut)
  window.addEventListener('blur', resetCursorState)

  isAnimating = true
  animate()
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousedown', onClick)
  document.removeEventListener('focusin', onFocusIn)
  document.removeEventListener('focusout', onFocusOut)
  window.removeEventListener('blur', resetCursorState)
  window.clearTimeout(clickTimeout)
  cancelAnimationFrame(rafId)
})

watch(
  () => route.fullPath,
  async () => {
    resetCursorState()
    await nextTick()
    syncHoverStateFromPoint()
  }
)
</script>

<template>
  <div
    v-if="!isTouchDevice"
    ref="cursor"
    class="custom-cursor"
  >
    <div ref="circle" class="cursor-circle"></div>
    <div ref="cross" class="cursor-cross">
      <span class="cursor-cross__line cursor-cross__line--vertical"></span>
      <span class="cursor-cross__line cursor-cross__line--horizontal"></span>
    </div>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999999999;
}

.cursor-circle {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  opacity: 0;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.48);
  will-change: transform, opacity;
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(.19,1,.22,1);
}

.cursor-cross {
  position: absolute;
  width: 28px;
  height: 28px;
  opacity: 0.72;
  will-change: transform, opacity;

  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(.19,1,.22,1);
}

.cursor-cross__line {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: invert(1) saturate(1.2);
  -webkit-backdrop-filter: invert(1) saturate(1.2);
  transform: translate(-50%, -50%);
}

.cursor-cross__line--vertical {
  width: 0.5px;
  height: 28px;
}

.cursor-cross__line--horizontal {
  width: 28px;
  height: 0.5px;
}

.custom-cursor.is-hover .cursor-circle {
  --circle-scale: 1.08;
  opacity: 1;
}

.custom-cursor.is-hover .cursor-cross {
  --cursor-scale: 0.8;
  opacity: 0;
}

.custom-cursor.is-click .cursor-circle {
  --circle-scale: 0.92;
  opacity: 0.9;
}

.custom-cursor.is-click .cursor-cross {
  --cursor-scale: 0.9;
  opacity: 0.95;
}

@media (max-width: 768px), (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}
</style>
