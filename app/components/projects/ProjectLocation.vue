<template>
  <section
    ref="root"
    class="project-location-section"
  >
    <div class="container">
      <h2 class="location-title">Location & Lifestyle</h2>

      <p class="location-text">
        Ideally situated in the vibrant Jumeirah Village Circle (JVC) community,
        IR1DIAN Park benefits from excellent connectivity via Al Khalil Road and
        Sheikh Mohammed Bin Zayed Road. Residents enjoy proximity to parks,
        schools, retail hubs, and leisure destinations — making the development
        appealing for families, professionals and investors alike.
      </p>

      <div class="map-wrapper">
        <div class="map-frame">
          <img
            src="/img/projects/ir1dian/map.png"
            alt="Project location map"
            class="map-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectLocationAnimation } from '~/composables/animations/projects/location'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectLocationAnimation(root.value)
})
</script>
