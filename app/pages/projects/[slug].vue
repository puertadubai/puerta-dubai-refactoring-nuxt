<template>
  <div v-if="project" class="project-page" :key="project.slug">
    <ProjectHero :project="project" />
    <ProjectIntro :project="project" />
    <ProjectDetails :project="project" />
    <ProjectGallery :project="project" />
    <ProjectLocation :project="project" />
    <ProjectInvestment :project="project" />
    <ProjectNavigation :previous="previous" :next="next" />
  </div>

  <!-- Sécurité : slug invalide -->
  <div v-else class="project-not-found">
    <h1>Project not found</h1>
    <p>The requested project does not exist.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useHead } from '#imports'
import { useProject, type Project } from '~/composables/useProject'
import projectsData from '~/data/projects.json'

import ProjectHero from '~/components/projects/ProjectHero.vue'
import ProjectIntro from '~/components/projects/ProjectIntro.vue'
import ProjectDetails from '~/components/projects/ProjectDetails.vue'
import ProjectGallery from '~/components/projects/ProjectGallery.vue'
import ProjectLocation from '~/components/projects/ProjectLocation.vue'
import ProjectInvestment from '~/components/projects/ProjectInvestment.vue'
import ProjectNavigation from '~/components/projects/ProjectNav.vue'

/* ======================
   Route & data
====================== */
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { project } = useProject(slug.value)

const projects = projectsData as Project[]

const getProjectNavData = (p: Project | null) => {
  if (!p) return undefined

  const price =
    p.highlights.find((item) => item.label.toLowerCase() === 'starting price')
      ?.value ?? ''

  return {
    slug: p.slug,
    title: p.hero.title,
    location: p.hero.location,
    price,
    description: p.intro,
    image: p.hero.image
  }
}

const previous = computed(() => {
  if (!project.value?.previous) return undefined
  const prev = projects.find((p) => p.slug === project.value?.previous) ?? null
  return getProjectNavData(prev)
})

const next = computed(() => {
  if (!project.value?.next) return undefined
  const nxt = projects.find((p) => p.slug === project.value?.next) ?? null
  return getProjectNavData(nxt)
})

/* ======================
   ScrollTrigger refresh
====================== */
const refreshScrollTriggers = async () => {
  if (!import.meta.client) return
  await nextTick()
  requestAnimationFrame(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.refresh()
  })
}

onMounted(() => {
  refreshScrollTriggers()
})

watch(() => project.value?.slug, () => {
  refreshScrollTriggers()
})

/* ======================
   SEO dynamique
====================== */
useHead(() => {
  if (!project.value) {
    return {
      title: 'Project not found | Puerta Dubai'
    }
  }

  return {
    title: `${project.value.hero.title} | Puerta Dubai`,
    meta: [
      {
        name: 'description',
        content: project.value.intro
      }
    ]
  }
})
</script>
