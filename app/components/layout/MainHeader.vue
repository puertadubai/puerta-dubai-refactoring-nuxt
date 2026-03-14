<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from '#imports'
import { useSideMenu } from '~/composables/useSideMenu'

const { toggle, close } = useSideMenu()
const route = useRoute()

const headerRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
let scrollRafId = 0
let headerResizeObserver: ResizeObserver | null = null

const isHome = computed(() => route.path === '/' || route.path === '')
const isInternal = computed(() => !isHome.value)

/* ======================
   Scroll effect navbar
====================== */
const syncHeaderState = () => {
  isScrolled.value = window.scrollY > 20
}

const syncHeaderMetrics = () => {
  if (!import.meta.client) return

  const root = document.documentElement
  const headerHeight = Math.round(headerRef.value?.offsetHeight || 0)
  const headerOffset = headerHeight ? headerHeight + 20 : 120

  root.style.setProperty('--site-header-height', `${headerHeight}px`)
  root.style.setProperty('--site-header-offset', `${headerOffset}px`)
}

const onScroll = () => {
  if (scrollRafId) return
  scrollRafId = window.requestAnimationFrame(() => {
    scrollRafId = 0
    syncHeaderState()
    syncHeaderMetrics()
  })
}

/* ======================
   Logo click behaviour
====================== */
const onLogoClick = (e: MouseEvent) => {
  e.preventDefault()
  close()

  const onIndex =
    window.location.pathname === '/' ||
    window.location.pathname === ''

  if (onIndex) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.location.href = '/#hero'
  }
}

onMounted(() => {
  if (!import.meta.client) return
  syncHeaderState()
  nextTick(() => {
    syncHeaderMetrics()
  })
  if (window.ResizeObserver) {
    headerResizeObserver = new window.ResizeObserver(() => {
      syncHeaderMetrics()
    })
    if (headerRef.value) headerResizeObserver.observe(headerRef.value)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', syncHeaderMetrics, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', syncHeaderMetrics)
  if (scrollRafId) window.cancelAnimationFrame(scrollRafId)
  headerResizeObserver?.disconnect()
})

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    syncHeaderState()
    syncHeaderMetrics()
  }
)
</script>

<template>
  <!-- translate="no" est CRUCIAL -->
  <header
    ref="headerRef"
    class="main-header"
    :class="{
      scrolled: isScrolled,
      'is-internal': isInternal
    }"
    translate="no"
  >
    <div class="nav-container">
      <!-- LEFT -->
      <div class="nav-left">
        <button
          id="menu-toggle"
          class="menu-btn"
          @click="toggle"
          aria-label="Open menu"
          translate="no"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span class="menu-label" translate="no">MENU</span>
      </div>

      <!-- CENTER -->
      <div class="nav-center">
        <a href="/" @click="onLogoClick" translate="no">
          <img src="/img/logo.png" class="nav-logo" />
          <img src="/img/logo-txt-blanc.svg" class="nav-logo-scrolled" />
        </a>
      </div>

      <!-- RIGHT -->
      <div class="nav-right" translate="no">
        <!-- Language selector -->
        <div class="lang-select">
          <select
            id="language"
            aria-label="Language"
            translate="no"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            <option value="pt">PT</option>
          </select>
          <span class="lang-loader" aria-hidden="true"></span>
        </div>

        <a
          href="https://wa.me/971544402792"
          target="_blank"
          class="whatsapp-icon"
          aria-label="WhatsApp"
          translate="no"
        >
          <img src="/img/whatsapp.svg" alt="WhatsApp" />
        </a>
      </div>
    </div>
  </header>
</template>
