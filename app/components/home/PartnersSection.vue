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
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initPartnersAnimation } from '~/composables/animations/home/partners'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

const logos = [
  { src: '/img/partners/meraas.png', alt: 'Meraas' },
  { src: '/img/partners/ALDAR.png', alt: 'Aldar' },
  { src: '/img/partners/binghatti-logo-white-new1.png', alt: 'Binghatti' },
  { src: '/img/partners/Dubai-Properties.png', alt: 'Dubai Properties' },
  { src: '/img/partners/ellington.png', alt: 'Ellington' },
  { src: '/img/partners/emaar.png', alt: 'Emaar' },
  { src: '/img/partners/sohba.png', alt: 'Sohba' },

  // 🔁 DUPLICATES FOR INFINITE LOOP
  { src: '/img/partners/meraas.png', alt: 'Meraas duplicate' },
  { src: '/img/partners/ALDAR.png', alt: 'Aldar duplicate' },
  { src: '/img/partners/badr-logo2.png', alt: 'Badr duplicate' },
  { src: '/img/partners/binghatti-logo-white-new1.png', alt: 'Binghatti duplicate' }
]

onMounted(() => {
  if (!track.value) return
  initPartnersAnimation(track.value)
})
</script>
