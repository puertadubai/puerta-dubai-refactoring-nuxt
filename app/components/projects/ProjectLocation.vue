<template>
  <section
    ref="root"
    class="project-location-section"
  >
    <div class="container">
      <h2 class="location-title">
        {{ project.location.title }}
      </h2>

      <p class="location-text">
        {{ project.location.text }}
      </p>

      <div class="map-wrapper">
        <div id="project-map" ref="mapEl">
          <img
            v-if="!mapReady && project.location.mapImage"
            :src="project.location.mapImage"
            :alt="project.location.mapAlt || project.hero.title + ' location map'"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import 'leaflet/dist/leaflet.css'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { initProjectLocationAnimation } from '~/composables/animations/projects/location'
import type { Project } from '~/composables/useProject'

/* ======================
   Props
====================== */
const props = defineProps<{
  project: Project
}>()

/* ======================
   GSAP
====================== */
const root = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)
const mapReady = ref(false)
let map: import('leaflet').Map | null = null

const resolveMapTarget = (project: Project) => {
  if (project.location.coords) {
    return { coords: project.location.coords }
  }

  const query =
    project.location.mapQuery ||
    project.hero.location ||
    project.location.title ||
    project.hero.title

  return { query }
}

const initMap = async (project: Project) => {
  if (!mapEl.value || map) return

  const L = await import('leaflet')
  const isMobile = window.matchMedia('(max-width: 900px)').matches
  const projectMarkerIcon = L.icon({
    iconUrl: '/img/marker-icon-2x.png',
    iconRetinaUrl: '/img/marker-icon-2x.png',
    shadowUrl: markerShadow,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })

  map = L.map(mapEl.value, {
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    dragging: !isMobile,
    keyboard: false,
    boxZoom: false,
    tap: !isMobile
  })
  map.scrollWheelZoom.disable()
  map.doubleClickZoom.disable()
  map.boxZoom.disable()

  if (isMobile) {
    map.dragging.disable()
    map.touchZoom.disable()
    map.tap?.disable()
  }

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  const fallback = { lat: 25.2048, lng: 55.2708, zoom: 12 }
  const target = resolveMapTarget(project)

  if (target.coords) {
    map.setView([target.coords.lat, target.coords.lng], target.coords.zoom ?? 13)
    L.marker([target.coords.lat, target.coords.lng], {
      icon: projectMarkerIcon
    }).addTo(map)
    mapReady.value = true
    return
  }

  try {
    const query = encodeURIComponent(target.query || '')
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${query}`
    )
    const data = await res.json()
    if (Array.isArray(data) && data[0]) {
      const lat = Number.parseFloat(data[0].lat)
      const lng = Number.parseFloat(data[0].lon)
      map.setView([lat, lng], 13)
      L.marker([lat, lng], { icon: projectMarkerIcon }).addTo(map)
      mapReady.value = true
      return
    }
  } catch {
    // fallback below
  }

  map.setView([fallback.lat, fallback.lng], fallback.zoom)
  L.marker([fallback.lat, fallback.lng], { icon: projectMarkerIcon }).addTo(map)
  mapReady.value = true
}

onMounted(() => {
  if (!root.value) return
  initProjectLocationAnimation(root.value)
  initMap(props.project)
})

onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>
