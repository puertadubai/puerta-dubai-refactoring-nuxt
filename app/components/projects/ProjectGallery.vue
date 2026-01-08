<template>
  <section
    ref="root"
    class="horiz-gal"
  >
    <div class="hg-wrap">
      <div ref="track" class="hg-track">
        <img
          v-for="(img, i) in images"
          :key="i"
          :src="img"
          class="hg-item"
          alt=""
          draggable="false"
        />
      </div>
    </div>

    <div ref="dots" class="hg-dots"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectGallery } from '~/composables/animations/projects/gallery'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const dots = ref<HTMLElement | null>(null)

/**
 * TEMPORAIRE — viendra plus tard de Supabase
 */
const images = [
  '/img/projects/ir1dian/1.webp',
  '/img/projects/ir1dian/2.webp',
  '/img/projects/ir1dian/3.webp',
  '/img/projects/ir1dian/4.webp'
]

onMounted(() => {
  if (!root.value || !track.value || !dots.value) return
  initProjectGallery({
    root: root.value,
    track: track.value,
    dots: dots.value
  })
})
</script>
