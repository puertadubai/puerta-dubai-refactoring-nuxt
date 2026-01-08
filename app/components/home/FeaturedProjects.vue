<template>
  <section
    id="featured-projects"
    class="projects-section"
    ref="root"
  >
    <div class="projects-header">
      <h2>Featured Real Estate Projects</h2>
      <p>Explore a curated selection of the UAE’s most exclusive developments.</p>
    </div>

    <div class="projects-grid">
      <!-- Costa Mare -->
      <div class="project-card luxury-project">
        <img
          src="/img/projects/project1.jpg"
          alt="Costa Mare by Ellington Properties"
          loading="lazy"
        />
        <div class="project-info">
          <div class="project-base">
            <h3 class="project-title">Costa Mare</h3>
            <h4 class="project-location">Al Marjan Island, Ras Al Khaimah</h4>
          </div>
          <div class="project-hover">
            <p class="project-price">
              Starting from <span>USD 270,000</span>
            </p>
            <p class="project-desc">
              Seaside residences by Ellington Properties, offering serene beachfront living and timeless design.
            </p>
          </div>
        </div>
      </div>

      <!-- Ir1dian Park -->
      <div class="project-card luxury-project">
        <img
          src="/img/projects/project2-Ir1dian-Park.webp"
          alt="Ir1dian Park at JVC"
          loading="lazy"
        />
        <div class="project-info">
          <div class="project-base">
            <h3 class="project-title">Ir1dian Park</h3>
            <h4 class="project-location">JVC, Dubai</h4>
          </div>
          <div class="project-hover">
            <p class="project-price">
              Starting from <span>AED 772,000</span>
            </p>
            <p class="project-desc">
              Modern living in Jumeirah Village Circle with urban design and family-friendly amenities.
            </p>
          </div>
        </div>
      </div>

      <!-- Binghatti House -->
      <div class="project-card luxury-project">
        <img
          src="/img/projects/project3-binghatti-house.jpg"
          alt="Binghatti House at JVC"
          loading="lazy"
        />
        <div class="project-info">
          <div class="project-base">
            <h3 class="project-title">Binghatti House</h3>
            <h4 class="project-location">JVC, Dubai</h4>
          </div>
          <div class="project-hover">
            <p class="project-price">
              Starting from <span>AED 570,000</span>
            </p>
            <p class="project-desc">
              Contemporary apartments blending signature architecture with exceptional value.
            </p>
          </div>
        </div>
      </div>

      <!-- Saadiyat Grove -->
      <div class="project-card luxury-project">
        <img
          src="/img/projects/projects4.webp"
          alt="Saadiyat Grove by Aldar"
          loading="lazy"
        />
        <div class="project-info">
          <div class="project-base">
            <h3 class="project-title">Saadiyat Grove</h3>
            <h4 class="project-location">Abu Dhabi</h4>
          </div>
          <div class="project-hover">
            <p class="project-price">
              Starting from <span>AED 1.29M</span>
            </p>
            <p class="project-desc">
              Aldar’s cultural hub on Saadiyat Island — where art, lifestyle and luxury intersect.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="projects-cta">
      <button class="btn">View More Projects</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initFeaturedProjectsAnimation } from '~/composables/animations/home/featured-projects'

const root = ref<HTMLElement | null>(null)
 
onMounted(() => {
  if (!root.value) return
  initFeaturedProjectsAnimation(root.value)
})
</script>
