<template>
  <section
    ref="root"
    class="project-nav"
    v-if="previous || next"
  >
    <h2 class="project-nav-title">
      Discover other projects…
    </h2>

    <div class="project-nav-grid">
      <!-- PREVIOUS PROJECT -->
      <NuxtLink
        v-if="previous"
        :to="`/projects/${previous.slug}`"
        class="project-nav-card"
        :style="`--bg: url('${previous.image}')`"
      >
        <div class="project-nav-overlay">
          <div class="project-nav-info">
            <div class="project-base">
              <h3 class="project-title">
                {{ previous.title }}
              </h3>
              <h4 class="project-location">
                {{ previous.location }}
              </h4>
            </div>

            <div class="project-hover">
              <p class="project-price">
                Starting from <span>{{ previous.price }}</span>
              </p>
              <p class="project-desc">
                {{ previous.description }}
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- NEXT PROJECT -->
      <NuxtLink
        v-if="next"
        :to="`/projects/${next.slug}`"
        class="project-nav-card"
        :style="`--bg: url('${next.image}')`"
      >
        <div class="project-nav-overlay">
          <div class="project-nav-info">
            <div class="project-base">
              <h3 class="project-title">
                {{ next.title }}
              </h3>
              <h4 class="project-location">
                {{ next.location }}
              </h4>
            </div>

            <div class="project-hover">
              <p class="project-price">
                Starting from <span>{{ next.price }}</span>
              </p>
              <p class="project-desc">
                {{ next.description }}
              </p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectNavigationAnimation } from '~/composables/animations/projects/nav'

/* ======================
   Props
====================== */
defineProps<{
  previous?: {
    slug: string
    title: string
    location: string
    price: string
    description: string
    image: string
  }
  next?: {
    slug: string
    title: string
    location: string
    price: string
    description: string
    image: string
  }
}>()

/* ======================
   GSAP
====================== */
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectNavigationAnimation(root.value)
})
</script>
