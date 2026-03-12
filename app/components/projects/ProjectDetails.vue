<template>
  <section
    ref="root"
    class="project-details"
  >
    <div class="container details-grid">

      <!-- LEFT : Amenities -->
      <div class="details-left">
        <div class="amenities-block">
          <div
            v-for="(column, colIndex) in project.amenities"
            :key="colIndex"
            class="amenities-column"
          >
            <div
              v-for="(amenity, index) in column"
              :key="index"
              class="amenity"
            >
              <i
                class="amenity-icon"
                :data-lucide="amenity.icon"
                aria-hidden="true"
              ></i>
              <span class="amenity-label">
                {{ amenity.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT : Highlights -->
      <div class="details-right">
        <h2>Highlights</h2>

        <ul class="project-specs">
          <li
            v-for="(item, index) in project.highlights"
            :key="index"
          >
            <strong>{{ item.label }}:</strong>
            {{ item.value }}
          </li>
        </ul>

        <a href="#" class="btn leadForm">
          Book a call
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { initProjectDetailsAnimation } from '~/composables/animations/projects/details'
import type { Project } from '~/composables/useProject'

/* ======================
   Props
====================== */
const props = defineProps<{
  project: Project
}>()

/* ======================
   Animations
====================== */
const root = ref<HTMLElement | null>(null)

const refreshLucide = async () => {
  if (!import.meta.client) return
  await nextTick()
  requestAnimationFrame(() => {
    const lucide = (window as Window & {
      lucide?: { createIcons: () => void }
    }).lucide
    lucide?.createIcons()
  })
}

onMounted(() => {
  if (!root.value) return
  initProjectDetailsAnimation(root.value)
  refreshLucide()
})

watch(() => props.project.slug, () => {
  refreshLucide()
})
</script>
