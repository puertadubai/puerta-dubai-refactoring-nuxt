<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const progress = ref(0)
const visible = ref(true)

const nuxtApp = useNuxtApp()

/* ======================
   Helpers
====================== */
const setProgress = (value: number) => {
  progress.value = Math.min(100, Math.max(0, value))
}

const finish = () => {
  setProgress(100)
  setTimeout(() => {
    visible.value = false
    document.body.classList.add('loaded')
  }, 600)
}

/* ======================
   Lifecycle
====================== */
onMounted(() => {
  // 👉 1. Fake progress for initial load
  let fake = 0
  const fakeInterval = setInterval(() => {
    fake += Math.random() * 10
    setProgress(fake)
    if (fake >= 90) clearInterval(fakeInterval)
  }, 120)

  // 👉 2. FORCE finish on first load
  window.requestAnimationFrame(() => {
    setTimeout(() => {
      finish()
    }, 800)
  })

  // 👉 3. Nuxt navigation hooks (SPA)
  nuxtApp.hook('page:start', () => {
    visible.value = true
    setProgress(0)
  })

  nuxtApp.hook('page:finish', () => {
    finish()
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
  z-index: 10000;
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
