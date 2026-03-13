<template>
  <section
    id="featured-projects"
    class="projects-section"
    ref="root"
  >
    <div class="projects-header">
      <h2>Featured Real Estate Projects</h2>
      <p>
        Explore a curated selection of the UAE’s most exclusive developments.
      </p>
    </div>

    <div class="projects-grid">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="project-card luxury-project"
      >
        <img
          :src="project.image"
          :alt="project.title"
          loading="lazy"
        />

        <div class="project-info">
          <div class="project-base">
            <h3 class="project-title">{{ project.title }}</h3>
            <h4 class="project-location">{{ project.location }}</h4>
          </div>

          <div class="project-hover">
            <p class="project-price">
              Starting from <span>{{ project.price }}</span>
            </p>
            <p class="project-desc">
              {{ project.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="projects-cta">
      <NuxtLink to="/projects" class="btn">
        View More Projects
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { initFeaturedProjectsAnimation } from '~/composables/animations/home/featured-projects'

/* ======================
   TEMP DATA (aligned with JSON)
====================== */
const projects = [
  {
    slug: 'costa-mare',
    title: 'Costa Mare',
    location: 'Al Marjan Island, Ras Al Khaimah',
    price: 'USD 270,000',
    image: '/img/projects/project1.jpg',
    description:
      'Seaside residences by Ellington Properties, offering serene beachfront living and timeless design.'
  },
  {
    slug: 'ir1dian-park',
    title: 'IR1DIAN Park',
    location: 'JVC, Dubai',
    price: 'AED 772,000',
    image: '/img/projects/project2-Ir1dian-Park.webp',
    description:
      'Modern living in Jumeirah Village Circle with urban design and family-friendly amenities.'
  },
  {
    slug: 'binghatti-house',
    title: 'Binghatti House',
    location: 'JVC, Dubai',
    price: 'AED 570,000',
    image: '/img/projects/project3-binghatti-house.jpg',
    description:
      'Contemporary apartments blending signature architecture with exceptional value.'
  },
  {
    slug: 'saadiyat-grove',
    title: 'Saadiyat Grove',
    location: 'Abu Dhabi',
    price: 'AED 1.29M',
    image: '/img/projects/projects4.webp',
    description:
      'Aldar’s cultural hub on Saadiyat Island — where art, lifestyle and luxury intersect.'
  }
]

/* ======================
   Animations
====================== */
const root = ref<HTMLElement | null>(null)
let cleanupAnimation: (() => void) | undefined

onMounted(() => {
  if (!root.value) return
  cleanupAnimation = initFeaturedProjectsAnimation(root.value)
})

onBeforeUnmount(() => {
  cleanupAnimation?.()
})
</script>
