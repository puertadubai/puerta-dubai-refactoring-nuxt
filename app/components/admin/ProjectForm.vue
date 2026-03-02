<script setup lang="ts">
import { reactive, watch, nextTick, onMounted } from 'vue'

type ProjectFormData = {
  id?: string
  slug: string
  hero: { title: string; location: string; imagePath: string; imageUrl: string }
  intro: string
  amenities: { icon: string; label: string; groupIndex: number }[]
  highlights: { label: string; value: string }[]
  gallery: { imagePath: string; imageUrl: string }[]
  location: {
    title: string
    text: string
    mapImagePath: string
    mapImageUrl: string
    mapAlt: string
    mapQuery: string
    lat: number | null
    lng: number | null
    zoom: number | null
  }
  investment: { title: string; text: string; ctaLabel: string; ctaLink: string }
  previous: string
  next: string
}

const props = defineProps<{
  initialProject: ProjectFormData
  submitLabel?: string
  saving?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: ProjectFormData): void
}>()

const cloneProject = (input: ProjectFormData): ProjectFormData =>
  JSON.parse(JSON.stringify(input)) as ProjectFormData

const form = reactive<ProjectFormData>(cloneProject(props.initialProject))
const uploading = reactive({
  hero: false,
  map: false
})

watch(
  () => props.initialProject,
  (value) => {
    Object.assign(form, cloneProject(value))
  }
)

const addHighlight = () => {
  form.highlights.push({ label: '', value: '' })
}

const removeHighlight = (index: number) => {
  form.highlights.splice(index, 1)
}

const addAmenity = () => {
  form.amenities.push({ icon: '', label: '', groupIndex: 0 })
}

const removeAmenity = (index: number) => {
  form.amenities.splice(index, 1)
}

const addGalleryItem = () => {
  form.gallery.push({ imagePath: '', imageUrl: '' })
}

const removeGalleryItem = (index: number) => {
  form.gallery.splice(index, 1)
}

const uploadFile = async (file: File, folder: string) => {
  const body = new FormData()
  body.append('file', file)
  body.append('folder', folder)
  return await $fetch<{ path: string; url: string }>('/api/admin/projects/upload', {
    method: 'POST',
    body
  })
}

const getFolder = () => `projects/${form.slug || 'project'}`

const onHeroUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  uploading.hero = true
  try {
    const result = await uploadFile(file, `${getFolder()}/hero`)
    form.hero.imagePath = result.path
    form.hero.imageUrl = result.url
  } finally {
    uploading.hero = false
  }
}

const onMapUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  uploading.map = true
  try {
    const result = await uploadFile(file, `${getFolder()}/map`)
    form.location.mapImagePath = result.path
    form.location.mapImageUrl = result.url
  } finally {
    uploading.map = false
  }
}

const onGalleryUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  const result = await uploadFile(file, `${getFolder()}/gallery`)
  form.gallery[index].imagePath = result.path
  form.gallery[index].imageUrl = result.url
}

const submitForm = () => {
  emit('submit', cloneProject(form))
}

const refreshLucide = async () => {
  if (!import.meta.client) return
  await nextTick()
  // @ts-ignore
  if (window.lucide) {
    // @ts-ignore
    window.lucide.createIcons()
  }
}

onMounted(() => {
  refreshLucide()
})

watch(
  () => form.amenities.map((item) => item.icon).join('|'),
  () => {
    refreshLucide()
  }
)
</script>

<template>
  <form class="project-form" @submit.prevent="submitForm">
    <div class="section">
      <h2>Basics</h2>
      <label>
        Slug
        <input v-model.trim="form.slug" required />
      </label>
      <label>
        Title
        <input v-model.trim="form.hero.title" required />
      </label>
      <label>
        Location
        <input v-model.trim="form.hero.location" required />
      </label>
      <label>
        Intro
        <textarea v-model.trim="form.intro" rows="4" required />
      </label>
    </div>

    <div class="section">
      <h2>Hero Image</h2>
      <div class="upload-row">
        <input type="file" accept="image/*" @change="onHeroUpload" />
        <span v-if="uploading.hero">Uploading...</span>
      </div>
      <label>
        Image Path
        <input v-model.trim="form.hero.imagePath" />
      </label>
      <img v-if="form.hero.imageUrl" :src="form.hero.imageUrl" alt="" class="preview" />
    </div>

    <div class="section">
      <h2>Highlights</h2>
      <div v-for="(highlight, index) in form.highlights" :key="index" class="list-row">
        <input v-model.trim="highlight.label" placeholder="Label" />
        <input v-model.trim="highlight.value" placeholder="Value" />
        <button type="button" class="ghost" @click="removeHighlight(index)">Remove</button>
      </div>
      <button type="button" class="ghost" @click="addHighlight">Add highlight</button>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Amenities</h2>
        <a
          class="external-link"
          href="https://lucide.dev/icons/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse icon library
        </a>
      </div>
      <div v-for="(amenity, index) in form.amenities" :key="index" class="list-row">
        <div class="icon-preview" aria-hidden="true">
          <i :data-lucide="amenity.icon || 'sparkles'"></i>
        </div>
        <input v-model.trim="amenity.icon" placeholder="Icon name" />
        <input v-model.trim="amenity.label" placeholder="Label" />
        <select v-model.number="amenity.groupIndex">
          <option :value="0">Group 1</option>
          <option :value="1">Group 2</option>
        </select>
        <button type="button" class="ghost" @click="removeAmenity(index)">Remove</button>
      </div>
      <button type="button" class="ghost" @click="addAmenity">Add amenity</button>
    </div>

    <div class="section">
      <h2>Gallery</h2>
      <div v-for="(item, index) in form.gallery" :key="index" class="list-row">
        <input type="file" accept="image/*" @change="(event) => onGalleryUpload(event, index)" />
        <input v-model.trim="item.imagePath" placeholder="Image path" />
        <button type="button" class="ghost" @click="removeGalleryItem(index)">Remove</button>
      </div>
      <div class="gallery-preview">
        <template v-for="(item, index) in form.gallery" :key="`preview-${index}`">
          <img v-if="item.imageUrl" :src="item.imageUrl" alt="" />
        </template>
      </div>
      <button type="button" class="ghost" @click="addGalleryItem">Add gallery image</button>
    </div>

    <div class="section">
      <h2>Location</h2>
      <label>
        Title
        <input v-model.trim="form.location.title" />
      </label>
      <label>
        Text
        <textarea v-model.trim="form.location.text" rows="3" />
      </label>
      <label>
        Map Query
        <input v-model.trim="form.location.mapQuery" />
      </label>
      <label>
        Map Alt Text
        <input v-model.trim="form.location.mapAlt" />
      </label>
      <div class="inline-fields">
        <label>
          Latitude
          <input v-model.number="form.location.lat" type="number" step="0.000001" />
        </label>
        <label>
          Longitude
          <input v-model.number="form.location.lng" type="number" step="0.000001" />
        </label>
        <label>
          Zoom
          <input v-model.number="form.location.zoom" type="number" step="1" />
        </label>
      </div>
      <div class="upload-row">
        <input type="file" accept="image/*" @change="onMapUpload" />
        <span v-if="uploading.map">Uploading...</span>
      </div>
      <label>
        Map Image Path
        <input v-model.trim="form.location.mapImagePath" />
      </label>
      <img v-if="form.location.mapImageUrl" :src="form.location.mapImageUrl" alt="" class="preview" />
    </div>

    <div class="section">
      <h2>Investment</h2>
      <label>
        Title
        <input v-model.trim="form.investment.title" />
      </label>
      <label>
        Text
        <textarea v-model.trim="form.investment.text" rows="3" />
      </label>
      <label>
        CTA Label
        <input v-model.trim="form.investment.ctaLabel" />
      </label>
      <label>
        CTA Link
        <input v-model.trim="form.investment.ctaLink" />
      </label>
    </div>

    <div class="section">
      <h2>Navigation</h2>
      <div class="inline-fields">
        <label>
          Previous slug
          <input v-model.trim="form.previous" />
        </label>
        <label>
          Next slug
          <input v-model.trim="form.next" />
        </label>
      </div>
    </div>

    <div class="actions">
      <button type="submit" :disabled="saving">
        {{ submitLabel || 'Save project' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.project-form {
  display: grid;
  gap: 32px;
}

.section {
  display: grid;
  gap: 12px;
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(48, 45, 45, 0.08);
}

.section h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.external-link {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #111;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.external-link:hover {
  opacity: 0.7;
}

label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: #2b2b2b;
}

input,
textarea,
select {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(48, 45, 45, 0.15);
  background: #fff;
  font-size: 14px;
}

.list-row {
  display: grid;
  grid-template-columns: auto repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  align-items: center;
}

.inline-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.upload-row {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 13px;
}

.preview {
  width: min(280px, 100%);
  border-radius: 12px;
  border: 1px solid rgba(48, 45, 45, 0.1);
}

.gallery-preview {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.gallery-preview img {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(48, 45, 45, 0.08);
}

.actions {
  display: flex;
  justify-content: flex-end;
}

button {
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  background: #111;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ghost {
  background: transparent;
  border: 1px solid rgba(48, 45, 45, 0.2);
  color: #111;
}

.icon-preview {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(48, 45, 45, 0.12);
  display: grid;
  place-items: center;
  background: #f7f5f2;
}

.icon-preview :deep(svg) {
  width: 22px;
  height: 22px;
  stroke: #111;
}

@media (max-width: 640px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
