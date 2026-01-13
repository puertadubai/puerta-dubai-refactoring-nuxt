<script setup lang="ts">
import ProjectForm from '~/components/admin/ProjectForm.vue'

definePageMeta({
  middleware: 'admin-auth',
})

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const saving = ref(false)

const { data: projectData, refresh } = await useFetch(`/api/admin/projects/${projectId.value}`)

const project = computed(() => {
  if (!projectData.value) return null
  return projectData.value as any
})

const updateProject = async (form: any) => {
  if (!projectId.value) return
  saving.value = true
  try {
    const payload = {
      slug: form.slug,
      hero_title: form.hero.title,
      hero_location: form.hero.location,
      hero_image: form.hero.imagePath,
      intro: form.intro,
      location_title: form.location.title,
      location_text: form.location.text,
      location_map_image: form.location.mapImagePath || null,
      location_map_alt: form.location.mapAlt || null,
      location_map_query: form.location.mapQuery || null,
      location_lat: form.location.lat ?? null,
      location_lng: form.location.lng ?? null,
      location_zoom: form.location.zoom ?? null,
      investment_title: form.investment.title || null,
      investment_text: form.investment.text || null,
      investment_cta_label: form.investment.ctaLabel || null,
      investment_cta_link: form.investment.ctaLink || null,
      previous_slug: form.previous || null,
      next_slug: form.next || null,
      highlights: form.highlights,
      amenities: form.amenities,
      gallery: form.gallery
    }

    await $fetch(`/api/admin/projects/${projectId.value}`, {
      method: 'PUT',
      body: payload
    })
    await refresh()
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="admin-project">
    <header class="page-header">
      <div>
        <p class="eyebrow">Back Office</p>
        <h1>Edit Project</h1>
        <p class="subtitle">Update content and visuals for this project.</p>
      </div>
    </header>

    <ProjectForm
      v-if="project"
      :initial-project="project"
      :saving="saving"
      submit-label="Save changes"
      @submit="updateProject"
    />
    <div v-else class="status">Loading project...</div>
  </section>
</template>

<style scoped>
.admin-project {
  padding: 140px 8vw 90px;
  min-height: 70vh;
  background: #f7f3ee;
}

.page-header {
  margin-bottom: 24px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #a38b68;
  margin: 0 0 12px;
}

h1 {
  margin: 0 0 6px;
  font-size: clamp(32px, 4vw, 44px);
}

.subtitle {
  margin: 0;
  color: #6c6156;
}

.status {
  padding: 20px;
}
</style>
