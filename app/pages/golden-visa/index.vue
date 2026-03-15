<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { goldenVisaGuide } from '~/data/goldenVisaGuide'
import GoldenVisaToolbar from '~/components/golden/GoldenVisaToolbar.vue'
import GoldenVisaAccordion from '~/components/golden/GoldenVisaAccordion.vue'
import GoldenVisaSectionCard from '~/components/golden/GoldenVisaSectionCard.vue'

type AccessState = 'idle' | 'loading' | 'granted' | 'denied' | 'error'

const STORAGE_KEY = 'golden-visa-access-email'
const route = useRoute()

const form = reactive({
  email: typeof route.query.email === 'string' ? route.query.email : ''
})

const accessState = ref<AccessState>('idle')
const accessMessage = ref(
  'Enter the email address used during registration to unlock your private Golden Visa guide.'
)
const verifiedLeadName = ref('')

const isVerified = computed(() => accessState.value === 'granted')

useHead({
  title: 'Golden Visa Guide | Puerta Dubai',
  meta: [
    {
      name: 'description',
      content: goldenVisaGuide.meta.description
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

onMounted(() => {
  const rememberedEmail = window.sessionStorage.getItem(STORAGE_KEY)
  if (!form.email && rememberedEmail) {
    form.email = rememberedEmail
  }

  if (form.email) {
    void submitAccess()
  }
})

async function submitAccess() {
  accessState.value = 'loading'
  accessMessage.value = ''

  try {
    const response = await $fetch<{
      status: 'success' | 'denied' | 'error'
      message: string
      lead?: { email: string; name: string | null }
    }>('/api/golden-visa/access', {
      method: 'POST',
      body: {
        email: form.email.trim()
      }
    })

    if (response.status !== 'success' || !response.lead) {
      accessState.value = 'denied'
      accessMessage.value = response.message
      verifiedLeadName.value = ''
      return
    }

    form.email = response.lead.email
    verifiedLeadName.value = response.lead.name ?? ''
    accessState.value = 'granted'
    accessMessage.value = response.message
    window.sessionStorage.setItem(STORAGE_KEY, response.lead.email)
  } catch (error: any) {
    const statusCode = error?.statusCode || error?.response?.status
    accessState.value = statusCode === 403 ? 'denied' : 'error'
    accessMessage.value =
      error?.data?.message ||
      (statusCode === 403
        ? 'This email address was not found in our Golden Visa access records. Please register first.'
        : 'Access verification is temporarily unavailable. Please try again.')
    verifiedLeadName.value = ''
  }
}
</script>

<template>
  <section class="gv-page">
    <div class="gv-shell">
      <GoldenVisaToolbar :can-print="isVerified" />

      <template v-if="!isVerified">
        <section class="gv-access">
          <div class="gv-access-panel">
            <p class="gv-access-eyebrow">Private Access</p>
            <h1>The UAE Golden Visa Guide</h1>
            <p class="gv-access-copy">
              This route is reserved for registered Puerta Dubai leads. Confirm the same email used
              in your access email to open the full guide.
            </p>

            <form class="gv-access-form" @submit.prevent="submitAccess">
              <label for="golden-visa-access-email">Email address</label>
              <input
                id="golden-visa-access-email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
              />
              <button type="submit" :disabled="accessState === 'loading'">
                {{ accessState === 'loading' ? 'Checking access...' : 'Unlock the guide' }}
              </button>
            </form>

            <p
              class="gv-access-message"
              :class="{
                'is-denied': accessState === 'denied' || accessState === 'error',
                'is-granted': accessState === 'granted'
              }"
            >
              {{ accessMessage }}
            </p>
          </div>

          <aside class="gv-access-aside">
            <p class="gv-access-kicker">What you will unlock</p>
            <ul>
              <li>Eligibility routes and qualifying profiles</li>
              <li>Real-estate and investor thresholds to know</li>
              <li>Renewal, travel, legal and tax considerations</li>
              <li>Puerta Dubai framing for a premium relocation path</li>
            </ul>
          </aside>
        </section>
      </template>

      <template v-else>
        <header class="gv-hero">
          <div class="gv-hero-card">
            <div class="gv-hero-copy">
              <p class="gv-eyebrow">{{ goldenVisaGuide.meta.eyebrow }}</p>
              <h1>
                {{ goldenVisaGuide.meta.title }}
                <span>{{ goldenVisaGuide.meta.subtitle }}</span>
              </h1>
              <p class="gv-description">{{ goldenVisaGuide.meta.description }}</p>

              <div class="gv-badges">
                <span v-for="badge in goldenVisaGuide.meta.badges" :key="badge">{{ badge }}</span>
              </div>
            </div>

            <div class="gv-hero-aside">
              <p class="gv-verified-tag">
                Private access granted
                <span v-if="verifiedLeadName">{{ verifiedLeadName }}</span>
              </p>
              <h2>Quick actions</h2>
              <GoldenVisaAccordion :items="goldenVisaGuide.quickActions" />
            </div>
          </div>
        </header>

        <div class="gv-grid">
          <GoldenVisaSectionCard
            v-for="(section, index) in goldenVisaGuide.sections"
            :key="section.id"
            :section="section"
            :index="index"
          />
        </div>

        <div class="gv-footer">
          <p>{{ goldenVisaGuide.meta.disclaimer }}</p>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.gv-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(220, 198, 184, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(187, 153, 126, 0.08), transparent 24%),
    linear-gradient(180deg, #2a2626 0%, #161414 100%);
  color: #f7f3ee;
}

.gv-shell {
  width: min(100%, 1360px);
  margin: 0 auto;
  padding: calc(var(--site-header-offset, 124px) + 28px) 32px 100px;
}

.gv-access {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.7fr);
  gap: 24px;
}

.gv-access-panel,
.gv-access-aside,
.gv-hero-copy,
.gv-hero-aside {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(45, 41, 41, 0.96) 0%, rgba(22, 20, 20, 0.98) 100%);
}

.gv-access-panel {
  padding: 42px 42px 38px;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image:
    linear-gradient(180deg, rgba(22, 20, 20, 0.58), rgba(22, 20, 20, 0.95)),
    url('https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1600');
  background-size: cover;
  background-position: center;
}

.gv-access-eyebrow,
.gv-eyebrow,
.gv-access-kicker,
.gv-verified-tag {
  margin: 0 0 14px;
  color: #dcc6b8;
  font-size: 0.76rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.gv-access-panel h1,
.gv-hero-copy h1 {
  margin: 0;
  color: #fff;
  text-align: left;
  line-height: 0.88;
}

.gv-access-panel h1 {
  max-width: 8em;
  font-size: clamp(3.2rem, 6vw, 5.5rem);
}

.gv-access-copy,
.gv-description {
  width: min(100%, 42rem);
  margin: 20px 0 0;
  color: rgba(247, 243, 238, 0.8);
  line-height: 1.72;
  font-size: 1.02rem;
}

.gv-access-form {
  width: min(100%, 430px);
  display: grid;
  gap: 12px;
  margin-top: 28px;
}

.gv-access-form label {
  color: #dcc6b8;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.gv-access-form input {
  width: 100%;
  min-height: 56px;
  border: 1px solid rgba(220, 198, 184, 0.26);
  background: rgba(255, 255, 255, 0.06);
  color: #f7f3ee;
  padding: 0 18px;
  font-size: 1rem;
}

.gv-access-form input::placeholder {
  color: rgba(247, 243, 238, 0.45);
}

.gv-access-form button {
  min-height: 54px;
  border: 1px solid #dcc6b8;
  background: #dcc6b8;
  color: #302d2d;
  padding: 0 18px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}

.gv-access-form button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.gv-access-form button:hover:not(:disabled) {
  background: transparent;
  color: #f7f3ee;
}

.gv-access-message {
  width: min(100%, 430px);
  margin: 18px 0 0;
  color: rgba(247, 243, 238, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
}

.gv-access-message.is-denied {
  color: #f0b7a4;
}

.gv-access-message.is-granted {
  color: #cce7c1;
}

.gv-access-aside {
  padding: 34px 30px;
  align-self: stretch;
}

.gv-access-aside ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}

.gv-access-aside li {
  position: relative;
  padding-left: 18px;
  color: rgba(247, 243, 238, 0.82);
  line-height: 1.65;
}

.gv-access-aside li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75em;
  width: 7px;
  height: 7px;
  background: #dcc6b8;
}

.gv-hero {
  padding-bottom: 40px;
}

.gv-hero-card {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.7fr);
  gap: 24px;
}

.gv-hero-copy {
  padding: 54px;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image:
    linear-gradient(180deg, rgba(17, 15, 15, 0.08), rgba(17, 15, 15, 0.78) 58%, rgba(17, 15, 15, 0.94) 100%),
    url('/img/services/bank.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 0 1px rgba(220, 198, 184, 0.08);
}

.gv-hero-copy h1 {
  max-width: 7.6em;
  font-size: clamp(3.6rem, 7vw, 6.9rem);
  text-wrap: balance;
}

.gv-hero-copy h1 span {
  display: block;
  color: #dcc6b8;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-top: 0.7rem;
}

.gv-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.gv-badges span {
  display: inline-flex;
  align-items: center;
  padding: 9px 12px;
  border: 1px solid rgba(220, 198, 184, 0.24);
  background: rgba(255, 255, 255, 0.04);
  color: #f7f3ee;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.gv-hero-aside {
  padding: 30px 28px 28px;
  align-self: stretch;
  position: relative;
  overflow: hidden;
}

.gv-hero-aside::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, rgba(220, 198, 184, 0.4), transparent);
}

.gv-verified-tag {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.gv-verified-tag span {
  color: #f7f3ee;
  letter-spacing: 0.08em;
}

.gv-hero-aside h2 {
  margin: 0 0 18px;
  text-align: left;
  color: #fff;
  font-size: clamp(2rem, 2.2vw, 2.8rem);
  line-height: 0.94;
}

.gv-grid {
  display: grid;
  gap: 28px;
}

.gv-footer {
  margin-top: 40px;
  padding: 30px 34px 0;
  border-top: 1px solid rgba(220, 198, 184, 0.14);
}

.gv-footer p {
  margin: 0;
  color: rgba(247, 243, 238, 0.62);
  line-height: 1.68;
  font-size: 0.94rem;
}

@media (max-width: 980px) {
  .gv-shell {
    padding-left: 20px;
    padding-right: 20px;
  }

  .gv-access,
  .gv-hero-card {
    grid-template-columns: 1fr;
  }

  .gv-access-panel,
  .gv-hero-copy {
    min-height: 0;
  }

  .gv-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .gv-shell {
    padding-top: calc(var(--site-header-offset, 124px) + 18px);
    padding-bottom: 72px;
  }

  .gv-access-panel,
  .gv-hero-copy {
    padding: 24px 18px;
  }

  .gv-access-panel h1,
  .gv-hero-copy h1 {
    max-width: 100%;
    font-size: clamp(2.5rem, 12vw, 4.1rem);
  }

  .gv-access-copy,
  .gv-description {
    font-size: 0.97rem;
  }

  .gv-access-aside,
  .gv-hero-aside {
    padding: 22px 18px;
  }

  .gv-hero-aside h2 {
    font-size: 2.15rem;
  }

  .gv-hero {
    padding-bottom: 28px;
  }

  .gv-footer {
    margin-top: 28px;
    padding: 24px 0 0;
  }
}
</style>
