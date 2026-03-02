<template>
  <section ref="root" class="horiz-gal">
    <div class="hg-wrap">
      <div ref="track" class="hg-track">
        <img
          v-for="(img, i) in project.gallery"
          :key="i"
          :src="img"
          class="hg-img"
          alt=""
          draggable="false"
          loading="eager"
        />
      </div>
    </div>

    <div ref="dots" class="hg-dots"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { initProjectGallery } from '~/composables/animations/projects/gallery'

const props = defineProps<{
  project: {
    slug: string
    gallery: string[]
  }
}>()

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const dots = ref<HTMLElement | null>(null)

let destroy: (() => void) | null = null

const mountGallery = async () => {
  destroy?.()
  destroy = null

  await nextTick()
  if (!root.value || !track.value || !dots.value) return

  destroy = initProjectGallery({
    root: root.value,
    track: track.value,
    dots: dots.value
  })
}

onMounted(() => {
  mountGallery()
})

// Si tu changes de projet via le slug, on réinit la galerie
watch(
  () => props.project.slug,
  () => {
    mountGallery()
  }
)

onBeforeUnmount(() => {
  destroy?.()
})
</script>
<style scoped>
  .horiz-gal {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #302d2d;
  z-index: 2;
}

/* Wrap ne DOIT PLUS être flex */
.hg-wrap {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%); /* centrage vertical sans flex */
  height: 80vh;                /* hauteur fixe contrôlée */
  width: max-content;
}

/* Track = simplement le défilement horizontal */
.hg-track {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: max-content;
  align-items: center;
}


/* =============================
   IMAGES
   ============================= */
.hg-img {
  height: 80vh;
  width: auto;
  flex-shrink: 0;
  object-fit: cover;
  margin-right: 2vw;


}

/* =============================
   DOTS
   ============================= */
.hg-dots {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.hg-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #666;
  cursor: pointer;
}

.hg-dots .dot.active {
  background: #fff;
}

/* =============================
   FIREFOX FIX (désactive APZ)
   ============================= */
@supports (-moz-appearance: none) {
  .horiz-gal,
  .hg-wrap,
  .hg-track {
    overscroll-behavior: contain;
  }
}

</style>
