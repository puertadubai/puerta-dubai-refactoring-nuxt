<template>
  <section
    class="partners-section"
    id="partners-section"
    ref="root"
  >
    <h2>Partners / Developers</h2>

    <div class="logo-carousel">
      <div ref="track" class="logo-track">
        <img
          v-for="(logo, i) in logos"
          :key="i"
          :src="logo.src"
          :alt="logo.alt"
          loading="eager"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { initPartnersAnimation } from '~/composables/animations/home/partners'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

const baseLogos = [
  { src: '/img/partners/meraas.png', alt: 'Meraas' },
  { src: '/img/partners/ALDAR.png', alt: 'Aldar' },
  { src: '/img/partners/binghatti-logo-white-new1.png', alt: 'Binghatti' },
  { src: '/img/partners/Dubai-Properties.png', alt: 'Dubai Properties' },
  { src: '/img/partners/ellington.png', alt: 'Ellington' },
  { src: '/img/partners/emaar.png', alt: 'Emaar' },
  { src: '/img/partners/sohba.png', alt: 'Sohba' }
]

const logos = computed(() => [...baseLogos, ...baseLogos])

onMounted(() => {
  if (!track.value) return
  cleanupAnimation = initPartnersAnimation(track.value)
})

onBeforeUnmount(() => {
  cleanupAnimation?.()
})
</script>
