<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useSideMenu } from '~/composables/useSideMenu'

const { toggle, close } = useSideMenu()

const headerRef = ref<HTMLElement | null>(null)

/* ======================
   Scroll effect navbar
====================== */
const onScroll = () => {
  if (!headerRef.value) return
  headerRef.value.classList.toggle('scrolled', window.scrollY > 20)
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
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- translate="no" est CRUCIAL -->
  <header
    ref="headerRef"
    class="main-header"
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
