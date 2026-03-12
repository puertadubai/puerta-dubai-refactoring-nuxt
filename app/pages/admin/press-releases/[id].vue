<script setup lang="ts">
import { computed } from 'vue'
import PressReleaseForm from '~/components/admin/PressReleaseForm.vue'

definePageMeta({
  middleware: 'admin-auth',
})

type PressReleaseDetail = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  published: boolean
}

const route = useRoute()
const articleId = computed(() => route.params.id as string)
const saving = ref(false)

const { data: articleData, refresh } = await useFetch<PressReleaseDetail>(
  () => `/api/admin/press-releases/${articleId.value}`
)

const article = computed(() => articleData.value ?? null)

const updateArticle = async (form: PressReleaseDetail) => {
  saving.value = true
  try {
    await $fetch(`/api/admin/press-releases/${articleId.value}`, {
      method: 'PUT',
      body: {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        cover_image: form.coverImage,
        category: form.category,
        author: form.author,
        published: form.published
      }
    })

    await refresh()
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="admin-article">
    <header class="page-header">
      <div>
        <p class="eyebrow">Back Office</p>
        <h1>Edit Article</h1>
        <p class="subtitle">Update content, image and publication status.</p>
      </div>
    </header>

    <PressReleaseForm
      v-if="article"
      :initial-article="article"
      :saving="saving"
      submit-label="Save changes"
      @submit="updateArticle"
    />
    <div v-else class="status">Loading article...</div>
  </section>
</template>

<style scoped>
.admin-article {
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
