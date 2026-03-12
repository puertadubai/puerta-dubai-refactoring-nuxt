<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { usePressImage } from '~/composables/usePressImage'

type PressReleaseFormData = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  published: boolean
}

const props = defineProps<{
  initialArticle: PressReleaseFormData
  submitLabel?: string
  saving?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: PressReleaseFormData): void
}>()

const cloneArticle = (input: PressReleaseFormData): PressReleaseFormData =>
  JSON.parse(JSON.stringify(input)) as PressReleaseFormData

const form = reactive<PressReleaseFormData>(cloneArticle(props.initialArticle))
const uploading = ref(false)
const uploadError = ref('')
const contentField = ref<HTMLTextAreaElement | null>(null)

const { getPressImageUrl } = usePressImage()

const previewUrl = computed(() => getPressImageUrl(form.coverImage, 'thumbnail'))

watch(
  () => props.initialArticle,
  (value) => {
    Object.assign(form, cloneArticle(value))
  }
)

watch(
  () => form.title,
  (value) => {
    if (form.slug.trim()) return
    form.slug = value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
)

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const normalizeContentHtml = (value: string) => {
  if (!import.meta.client) return value

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${value}</div>`, 'text/html')
  const root = doc.body.firstElementChild

  if (!root) return ''

  const allowedTags = new Set(['P', 'H2', 'H3', 'UL', 'OL', 'LI'])

  const serializeNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return escapeHtml(node.textContent || '')
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return ''
    }

    const element = node as HTMLElement
    const content = Array.from(element.childNodes).map(serializeNode).join('')

    if (!allowedTags.has(element.tagName)) {
      return content
    }

    const tag = element.tagName.toLowerCase()
    return `<${tag}>${content}</${tag}>`
  }

  return Array.from(root.childNodes).map(serializeNode).join('')
}

const insertAtSelection = async (html: string) => {
  const textarea = contentField.value
  const start = textarea?.selectionStart ?? form.content.length
  const end = textarea?.selectionEnd ?? form.content.length

  form.content = `${form.content.slice(0, start)}${html}${form.content.slice(end)}`

  await nextTick()
  if (!textarea) return
  const cursor = start + html.length
  textarea.focus()
  textarea.setSelectionRange(cursor, cursor)
}

const insertBlock = async (type: 'p' | 'h2' | 'h3' | 'ul') => {
  const textarea = contentField.value
  const selected =
    textarea && textarea.selectionEnd > textarea.selectionStart
      ? form.content.slice(textarea.selectionStart, textarea.selectionEnd)
      : ''

  if (type === 'ul') {
    const items = (selected || 'List item 1\nList item 2')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `  <li>${escapeHtml(item)}</li>`)
      .join('\n')

    await insertAtSelection(`<ul>\n${items}\n</ul>\n`)
    return
  }

  const tag = type
  const fallback =
    type === 'h2'
      ? 'Section title'
      : type === 'h3'
        ? 'Subsection title'
        : 'Paragraph text'

  await insertAtSelection(`<${tag}>${escapeHtml(selected || fallback)}</${tag}>\n`)
}

const validateImageFile = async (file: File) => {
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('The cover image must not exceed 2MB.')
  }

  const isWebp = file.type === 'image/webp' || file.name.toLowerCase().endsWith('.webp')
  if (!isWebp) {
    throw new Error('The cover image must be a .webp file.')
  }
}

const onCoverUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return

  uploadError.value = ''
  uploading.value = true

  try {
    await validateImageFile(file)

    const body = new FormData()
    body.append('file', file)

    const result = await $fetch<{ filename: string }>('/api/admin/press-releases/upload', {
      method: 'POST',
      body
    })

    form.coverImage = result.filename
  } catch (error: any) {
    uploadError.value = error?.data?.statusMessage || error?.message || 'Upload failed.'
  } finally {
    uploading.value = false
  }
}

const submitForm = () => {
  const payload = cloneArticle(form)
  payload.content = normalizeContentHtml(payload.content)
  emit('submit', payload)
}
</script>

<template>
  <form class="press-form" @submit.prevent="submitForm">
    <div class="section">
      <h2>Basics</h2>
      <label>
        Title
        <input v-model.trim="form.title" required />
      </label>
      <label>
        Slug
        <input v-model.trim="form.slug" required />
      </label>
      <label>
        Excerpt
        <textarea v-model.trim="form.excerpt" rows="4" required />
      </label>
      <div class="inline-fields">
        <label>
          Category
          <input v-model.trim="form.category" placeholder="Market News" />
        </label>
        <label>
          Author
          <input v-model.trim="form.author" placeholder="Puerta Dubai" />
        </label>
      </div>
      <label class="toggle-row">
        <input v-model="form.published" type="checkbox" />
        <span>Published</span>
      </label>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Cover Image</h2>
        <span class="helper">.webp, recommended 2000x1125, max 2MB</span>
      </div>
      <div class="upload-row">
        <input type="file" accept=".webp,image/webp" @change="onCoverUpload" />
        <span v-if="uploading">Uploading...</span>
      </div>
      <p v-if="uploadError" class="error-text">{{ uploadError }}</p>
      <label>
        File Name
        <input v-model.trim="form.coverImage" placeholder="article1.webp" />
      </label>
      <img v-if="previewUrl" :src="previewUrl" alt="" class="preview" />
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Content</h2>
        <span class="helper">Use only paragraphs, H2, H3, and lists.</span>
      </div>

      <div class="toolbar">
        <button type="button" class="ghost" @click="insertBlock('p')">Paragraph</button>
        <button type="button" class="ghost" @click="insertBlock('h2')">H2</button>
        <button type="button" class="ghost" @click="insertBlock('h3')">H3</button>
        <button type="button" class="ghost" @click="insertBlock('ul')">List</button>
      </div>

      <div class="editor-layout">
        <label>
          HTML Content
          <textarea
            ref="contentField"
            v-model="form.content"
            rows="16"
            spellcheck="false"
            required
          />
        </label>

        <div class="content-preview">
          <span class="preview-label">Preview</span>
          <div class="preview-body" v-html="form.content || '<p>Preview your article content here.</p>'"></div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button type="submit" :disabled="saving">
        {{ submitLabel || 'Save article' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.press-form {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

.section {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  display: grid;
  gap: 16px;
}

.section h2 {
  margin: 0;
  text-align: left;
  font-size: clamp(24px, 2.2vw, 34px);
}

.section label {
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: #3f3328;
}

.section textarea,
.section input {
  border: 1px solid #d7cec2;
  background: #fffdf9;
  border-radius: 14px;
}

.section textarea {
  resize: vertical;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: baseline;
  flex-wrap: wrap;
}

.helper {
  color: #7c6e61;
  font-size: 12px;
}

.inline-fields {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.toggle-row {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.toggle-row input {
  width: auto;
}

.upload-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.error-text {
  margin: -4px 0 0;
  color: #a23434;
  font-size: 13px;
}

.preview {
  width: min(380px, 100%);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 16px;
}

.toolbar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.ghost {
  border: 1px solid rgba(48, 45, 45, 0.18);
  background: transparent;
  color: #111111;
  padding: 9px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.editor-layout {
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
}

.content-preview {
  border: 1px solid rgba(48, 45, 45, 0.08);
  background: #f9f6f1;
  padding: 18px;
  border-radius: 18px;
  min-height: 100%;
}

.preview-label {
  display: inline-block;
  margin-bottom: 12px;
  color: #8f7758;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.preview-body {
  color: #332c25;
}

.preview-body :deep(h2) {
  text-align: left;
  font-size: 28px;
  margin-bottom: 14px;
}

.preview-body :deep(h3) {
  font-size: 20px;
  margin: 22px 0 10px;
}

.preview-body :deep(p),
.preview-body :deep(li) {
  margin-top: 0;
  font-size: 15px;
  line-height: 1.7;
}

.preview-body :deep(ul),
.preview-body :deep(ol) {
  padding-left: 18px;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions button {
  border: none;
  padding: 12px 20px;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 900px) {
  .editor-layout,
  .inline-fields {
    grid-template-columns: 1fr;
  }
}
</style>
