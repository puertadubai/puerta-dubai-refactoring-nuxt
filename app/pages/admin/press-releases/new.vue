<script setup lang="ts">
import PressReleaseForm from '~/components/admin/PressReleaseForm.vue'

definePageMeta({
  middleware: 'admin-auth',
})

const router = useRouter()
const saving = ref(false)

const emptyArticle = {
  title: '',
  slug: '',
  excerpt: '',
  content: '<p>Paragraph text</p>\n',
  coverImage: '',
  category: '',
  author: 'Puerta Dubai',
  published: false
}

const createArticle = async (form: typeof emptyArticle) => {
  saving.value = true
  try {
    const result = await $fetch<{ id: string }>('/api/admin/press-releases', {
      method: 'POST',
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

    router.push(`/admin/press-releases/${result.id}`)
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
        <h1>New Article</h1>
        <p class="subtitle">Create a new press release or blog post.</p>
      </div>
    </header>

    <PressReleaseForm
      :initial-article="emptyArticle"
      :saving="saving"
      submit-label="Create article"
      @submit="createArticle"
    />
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
</style>
