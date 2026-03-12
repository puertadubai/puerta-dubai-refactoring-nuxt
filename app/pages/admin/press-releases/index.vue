<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  middleware: 'admin-auth',
})

type PressReleaseSummary = {
  id: string
  title: string
  category: string
  published: boolean
  createdAt: string | null
}

const { data: pressData, pending, refresh } = await useFetch<PressReleaseSummary[]>(
  '/api/admin/press-releases'
)

const articles = computed(() => pressData.value ?? [])
const deletingId = ref<string | null>(null)

const formatDate = (value?: string | null) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium'
  }).format(new Date(value))
}

const deleteArticle = async (id: string) => {
  if (!confirm('Delete this article?')) return

  deletingId.value = id
  try {
    await $fetch(`/api/admin/press-releases/${id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <section class="admin-press">
    <header class="page-header">
      <div>
        <p class="eyebrow">Back Office</p>
        <h1>Press Releases</h1>
        <p class="subtitle">Publish and maintain editorial content for the website.</p>
      </div>
      <NuxtLink to="/admin/press-releases/new" class="primary-btn">New Article</NuxtLink>
    </header>

    <div v-if="pending" class="status">Loading articles...</div>

    <div v-else class="table-shell">
      <div class="table-head">
        <span>Title</span>
        <span>Category</span>
        <span>Status</span>
        <span>Created</span>
        <span>Actions</span>
      </div>

      <article v-for="article in articles" :key="article.id" class="table-row">
        <span class="cell title-cell">{{ article.title }}</span>
        <span class="cell">{{ article.category || 'General' }}</span>
        <span class="cell">
          <span class="status-pill" :class="{ live: article.published }">
            {{ article.published ? 'Published' : 'Draft' }}
          </span>
        </span>
        <span class="cell">{{ formatDate(article.createdAt) }}</span>
        <div class="cell actions">
          <NuxtLink :to="`/admin/press-releases/${article.id}`" class="ghost-btn">Edit</NuxtLink>
          <button
            type="button"
            class="ghost-btn danger"
            :disabled="deletingId === article.id"
            @click="deleteArticle(article.id)"
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.admin-press {
  padding: 140px 8vw 90px;
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

.table-shell {
  display: grid;
  gap: 12px;
}

.table-head,
.table-row {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 2fr) minmax(140px, 0.8fr) minmax(120px, 0.7fr) minmax(140px, 0.8fr) auto;
  align-items: center;
}

.table-head {
  padding: 0 20px;
  color: #8a7b6a;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.table-row {
  background: #ffffff;
  border: 1px solid rgba(48, 45, 45, 0.08);
  border-radius: 18px;
  padding: 18px 20px;
}

.cell {
  color: #3f3328;
  font-size: 14px;
}

.title-cell {
  font-weight: 600;
}

.status-pill {
  display: inline-flex;
  padding: 5px 10px;
  border-radius: 999px;
  background: #efe7dc;
  color: #7a6549;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status-pill.live {
  background: rgba(45, 118, 74, 0.12);
  color: #2d764a;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.ghost-btn {
  border: 1px solid rgba(48, 45, 45, 0.16);
  background: transparent;
  color: #111;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ghost-btn.danger {
  color: #a23434;
  border-color: rgba(162, 52, 52, 0.35);
}

@media (max-width: 980px) {
  .table-head {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr;
  }

  .actions {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
  }
}
</style>
