<template>
  <section
    ref="root"
    class="project-details"
  >
    <div class="container details-grid">
      <!-- LEFT : Amenities -->
      <div class="details-left">
        <div class="amenities-block">
          <div class="amenities-column">
            <div class="amenity"><span>🏋️</span><span>Gym</span></div>
            <div class="amenity"><span>🏊</span><span>Swimming Pool & Kids Pool</span></div>
            <div class="amenity"><span>🧸</span><span>Kids Play Area</span></div>
            <div class="amenity"><span>🚗</span><span>Indoor Parking</span></div>
          </div>

          <div class="amenities-column">
            <div class="amenity"><span>🌿</span><span>Landscaped Gardens</span></div>
            <div class="amenity"><span>🔥</span><span>BBQ & Outdoor Lounge</span></div>
            <div class="amenity"><span>🛡️</span><span>24/7 Security</span></div>
            <div class="amenity"><span>📶</span><span>Smart Home Features</span></div>
          </div>
        </div>
      </div>

      <!-- RIGHT : Highlights -->
      <div class="details-right">
        <h2>Highlights</h2>

        <ul class="project-specs">
          <li><strong>Developer:</strong> Object 1 Real Estate Development</li>
          <li><strong>Type:</strong> Low-rise Apartments</li>
          <li><strong>Units:</strong> Studios – 2BR</li>
          <li><strong>Starting Price:</strong> AED 772,000</li>
          <li><strong>Delivery:</strong> Q2 2027</li>
          <li><strong>Location:</strong> Jumeirah Village Circle, Dubai</li>
          <li><strong>Unique:</strong> Urban design • Family-friendly amenities • Strong connectivity</li>
        </ul>

        <a href="#" class="btn">Book a call</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initProjectDetailsAnimation } from '~/composables/animations/projects/details'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value) return
  initProjectDetailsAnimation(root.value)
})
</script>
