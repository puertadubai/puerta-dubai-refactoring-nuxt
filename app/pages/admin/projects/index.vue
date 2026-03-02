<script setup lang="ts">
import { computed, ref } from 'vue'
definePageMeta({
  middleware: 'admin-auth',
})

type ProjectSummary = {
  id: string
  slug: string
  hero: { title: string; location: string; imageUrl: string }
}

const { data: projectsData, pending, refresh } = await useFetch<ProjectSummary[]>(
  '/api/admin/projects'
)

const projects = computed(() => projectsData.value ?? [])
const deletingId = ref<string | null>(null)

const deleteProject = async (id: string) => {
  if (!confirm('Delete this project?')) return
  deletingId.value = id
  try {
    await $fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <section class="admin-projects">
    <header class="page-header">
      <div>
        <p class="eyebrow">Back Office</p>
        <h1>Projects</h1>
        <p class="subtitle">Create, update, and manage real estate projects.</p>
      </div>
      <NuxtLink to="/admin/projects/new" class="primary-btn">New project</NuxtLink>
    </header>

    <div v-if="pending" class="status">Loading projects...</div>

    <div v-else class="projects-grid">
      <article v-for="project in projects" :key="project.id" class="project-card">
        <img v-if="project.hero.imageUrl" :src="project.hero.imageUrl" :alt="project.hero.title" />
        <div class="card-body">
          <h2>{{ project.hero.title }}</h2>
          <p>{{ project.hero.location }}</p>
          <small>{{ project.slug }}</small>
        </div>
        <div class="card-actions">
          <NuxtLink :to="`/admin/projects/${project.id}`" class="ghost-btn">
            <i data-lucide="pencil"></i>
            Edit
          </NuxtLink>
          <button
            class="ghost-btn danger"
            type="button"
            :disabled="deletingId === project.id"
            @click="deleteProject(project.id)"
          >
            <i data-lucide="trash-2"></i>
            Delete
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.admin-projects {
  padding: 70px 8vw 90px;
  min-height: 70vh;
  background: #f7f3ee;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
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

.primary-btn {
  background: #111;
  color: #fff;
  padding: 10px 18px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}

.status {
  padding: 24px;
}

.projects-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.project-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  overflow: hidden;
  display: grid;
}

.project-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-body {
  padding: 18px;
  display: grid;
  gap: 6px;
}

.card-body h2 {
  margin: 0;
  font-size: 18px;
}

.card-body p {
  margin: 0;
  color: #6c6156;
}

.card-body small {
  color: #8b8176;
}

.card-actions {
  display: flex;
  gap: 12px;
  padding: 0 18px 18px;
}

.ghost-btn {
  border: 1px solid transparent;
  background: #111;
  color: #fff;
  padding: 9px 16px;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.ghost-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(48, 45, 45, 0.15);
}

.ghost-btn.danger {
  background: transparent;
  color: #a23434;
  border-color: rgba(162, 52, 52, 0.5);
}

.ghost-btn.danger:hover {
  background: rgba(162, 52, 52, 0.1);
  box-shadow: none;
}

.ghost-btn :deep(svg) {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
  }
}
</style>
