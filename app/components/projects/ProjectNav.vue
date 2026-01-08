<template>
  <section
    ref="root"
    class="project-nav"
  >
    <h2 class="project-nav-title">
      Discover other projects…
    </h2>

    <div class="project-nav-grid">
      <!-- PREVIOUS PROJECT -->
      <a
        href="/projects/costa-mare"
        class="project-nav-card"
        style="--bg: url('/img/projects/ellington/1.jpg')"
      >
        <div class="project-nav-overlay">
          <div class="project-nav-info">
            <div class="project-base">
              <h3 class="project-title">Costa Mare</h3>
              <h4 class="project-location">
                Al Marjan Island • Ras Al Khaimah
              </h4>
            </div>

            <div class="project-hover">
              <p class="project-price">
                Starting from <span>USD 270,000</span>
              </p>
              <p class="project-desc">
                Seaside sanctuary blending timeless architecture and serene coastal energy.
              </p>
            </div>
          </div>
        </div>
      </a>

      <!-- NEXT PROJECT -->
      <a
        href="/projects/saadiyat-grove"
        class="project-nav-card"
        style="--bg: url('/img/projects/saadiyat/1.jpg')"
      >
        <div class="project-nav-overlay">
          <div class="project-nav-info">
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
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectNavigationAnimation } from '~/composables/animations/projects/nav'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectNavigationAnimation(root.value)
})
</script>
