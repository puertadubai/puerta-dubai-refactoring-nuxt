<template>
  <div class="project-page">
    <ProjectHero />
    <ProjectIntro />
    <ProjectDetails />
    <ProjectGallery />
    <ProjectLocation />
    <ProjectInvestment />
    <ProjectNavigation />
  </div>
</template>

<script setup lang="ts">
import ProjectHero from '~/components/projects/ProjectHero.vue'
import ProjectIntro from '~/components/projects/ProjectIntro.vue'
import ProjectDetails from '~/components/projects/ProjectDetails.vue'
import ProjectGallery from '~/components/projects/ProjectGallery.vue'
import ProjectLocation from '~/components/projects/ProjectLocation.vue'
import ProjectInvestment from '~/components/projects/ProjectInvestment.vue'
import ProjectNavigation from '~/components/projects/ProjectNav.vue'
</script>
