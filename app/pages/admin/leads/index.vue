<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth',
})

type Lead = {
  id: string
  name: string
  email: string
  whatsapp?: string | null
  country?: string | null
  interest?: string | null
  notes?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  created_at?: string | null
}

const { data: leadsData, pending, refresh } = await useFetch<Lead[]>('/api/admin/leads')
const leads = computed(() => leadsData.value ?? [])

const formatDate = (value?: string | null) => {
  if (!value) return ''
  const date = new Date(value)
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}
</script>

<template>
  <section class="admin-leads">
    <header class="page-header">
      <div>
        <p class="eyebrow">Back Office</p>
        <h1>Leads Inbox</h1>
        <p class="subtitle">Incoming leads from the public website form.</p>
      </div>
      <button class="ghost-btn" type="button" @click="refresh">Refresh</button>
    </header>

    <div v-if="pending" class="status">Loading leads...</div>

    <div v-else class="leads-grid">
      <article v-for="lead in leads" :key="lead.id" class="lead-card">
        <div class="lead-header">
          <div>
            <h2>{{ lead.name }}</h2>
            <p>{{ lead.email }}</p>
          </div>
          <span class="lead-date">{{ formatDate(lead.created_at) }}</span>
        </div>
        <div class="lead-meta">
          <span v-if="lead.country">Country: {{ lead.country }}</span>
          <span v-if="lead.whatsapp">WhatsApp: {{ lead.whatsapp }}</span>
          <span v-if="lead.interest">Interest: {{ lead.interest }}</span>
        </div>
        <p v-if="lead.notes" class="lead-notes">{{ lead.notes }}</p>
        <div class="lead-tags">
          <span v-if="lead.utm_source">UTM Source: {{ lead.utm_source }}</span>
          <span v-if="lead.utm_medium">UTM Medium: {{ lead.utm_medium }}</span>
          <span v-if="lead.utm_campaign">UTM Campaign: {{ lead.utm_campaign }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.admin-leads {
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

.status {
  padding: 24px;
}

.ghost-btn {
  border: 1px solid rgba(48, 45, 45, 0.2);
  background: transparent;
  color: #111;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.leads-grid {
  display: grid;
  gap: 18px;
}

.lead-card {
  padding: 20px 22px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(48, 45, 45, 0.08);
  display: grid;
  gap: 12px;
}

.lead-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.lead-header h2 {
  margin: 0;
  font-size: 18px;
}

.lead-header p {
  margin: 4px 0 0;
  color: #6c6156;
}

.lead-date {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #8a7b6a;
}

.lead-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  font-size: 13px;
  color: #4f453b;
}

.lead-notes {
  margin: 0;
  color: #4f453b;
  font-size: 14px;
}

.lead-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: #7d7166;
}

.lead-tags span {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  background: #f9f7f4;
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
  }
}
</style>
