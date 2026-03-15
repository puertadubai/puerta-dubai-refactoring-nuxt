<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    context?: 'default' | 'golden-visa'
  }>(),
  {
    context: 'default'
  }
)

const route = useRoute()

const form = reactive({
  name: '',
  email: '',
  country: '',
  whatsapp: '',
  notes: '',
  interest: '',
  consent: false,
  utm_source: (route.query.utm_source as string) || '',
  utm_medium: (route.query.utm_medium as string) || '',
  utm_campaign: (route.query.utm_campaign as string) || '',
  utm_term: (route.query.utm_term as string) || '',
  utm_content: (route.query.utm_content as string) || '',
  gclid: (route.query.gclid as string) || '',
  fbclid: (route.query.fbclid as string) || '',
  referrer: '',
  page_url: '',
  lang: '',
  website: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref('')

const content = computed(() => {
  if (props.context === 'golden-visa') {
    return {
      title: 'Golden Visa Access',
      eyebrow: 'Private Guide',
      intro:
        'Register to receive your private Golden Visa guide email, including your secure access link and the next verification step.',
      submit: 'Request Access',
      success:
        'Registration confirmed. Your private Golden Visa access email is on its way.',
      error: 'Unable to process your Golden Visa access request right now. Please try again.'
    }
  }

  return {
    title: 'Pre-Registration',
    eyebrow: 'Priority Access',
    intro:
      'Join a select group of early investors and receive exclusive insights, priority off-plan launches, and personalized support tailored to your goals.',
    submit: 'Pre-Register',
    success: 'Registration confirmed. Check your inbox for the next steps.',
    error: 'An error occurred. Please try again.'
  }
})

watch(
  () => props.context,
  (context) => {
    if (context === 'golden-visa' && !form.interest) {
      form.interest = 'Golden Visa'
    }
    if (context !== 'golden-visa' && form.interest === 'Golden Visa') {
      form.interest = ''
    }
    status.value = 'idle'
    message.value = ''
  },
  { immediate: true }
)

onMounted(() => {
  form.referrer = document.referrer || ''
  form.page_url = window.location.href
  form.lang = document.documentElement.lang || ''
})

async function submit() {
  status.value = 'loading'
  message.value = ''

  try {
    const res = await $fetch<{ status: string; message: string }>('/api/lead', {
      method: 'POST',
      body: form
    })

    status.value = res.status === 'success' ? 'success' : 'error'
    message.value = res.status === 'success' ? content.value.success : res.message || content.value.error
  } catch {
    status.value = 'error'
    message.value = content.value.error
  }
}
</script>

<template>
  <form id="leadForm" class="lead-form" @submit.prevent="submit">
    <input
      v-model="form.website"
      type="text"
      name="website"
      autocomplete="off"
      tabindex="-1"
      style="display:none"
    />

    <img src="/img/logo-black.png" alt="Puerta Dubai" />

    <h3>
      {{ content.title }}
      <span>{{ content.eyebrow }}</span>
    </h3>

    <p class="lead-intro">
      {{ content.intro }}
    </p>

    <input v-model="form.name" required placeholder="Full name" />
    <input v-model="form.email" required type="email" placeholder="Email address" />

    <select v-model="form.country" required>
      <option value="" disabled>Select your country</option>
      <option>United Arab Emirates</option>
      <option>France</option>
      <option>United Kingdom</option>
      <option>United States</option>
      <option>Canada</option>
      <option>Germany</option>
      <option>Spain</option>
      <option>Portugal</option>
      <option>Brazil</option>
      <option>India</option>
      <option>Pakistan</option>
      <option>Other</option>
    </select>

    <input v-model="form.whatsapp" placeholder="WhatsApp number" />

    <label class="helper">Interest (optional)</label>
    <div class="inline-radios">
      <label>
        <input v-model="form.interest" type="radio" value="Real Estate" />
        <span>Real Estate</span>
      </label>
      <label>
        <input v-model="form.interest" type="radio" value="Business" />
        <span>Business</span>
      </label>
      <label>
        <input v-model="form.interest" type="radio" value="Both" />
        <span>Both</span>
      </label>
      <label>
        <input v-model="form.interest" type="radio" value="Golden Visa" />
        <span>Golden Visa</span>
      </label>
    </div>

    <textarea v-model="form.notes" placeholder="Optional details (budget, goals, timeline...)" />

    <label class="full helper">
      <input v-model="form.consent" type="checkbox" />
      I agree to receive investment opportunities in Dubai.
    </label>

    <button class="btn" :disabled="status === 'loading'">
      {{ status === 'loading' ? 'Sending...' : content.submit }}
    </button>

    <p v-if="message" :class="['lead-feedback', status]">{{ message }}</p>
    <p class="helper">You can unsubscribe at any time. We respect your privacy.</p>
  </form>
</template>
