<template>
  <section
    id="services"
    ref="root"
    class="services-carousel-full dark-bg"
  >
    <div class="services-container">
      <h2 class="services-title">Our Services</h2>

      <div
        ref="viewport"
        class="services-viewport"
        aria-roledescription="carousel"
        tabindex="0"
      >
        <div ref="track" class="services-track">
          <article
            v-for="(service, i) in services"
            :key="i"
            class="service-card reveal"
          >
            <img :src="service.img" :alt="service.title" />

            <div class="svc-overlay">
              <div class="svc-content">
                <h3>{{ service.title }}</h3>
                <p>{{ service.desc }}</p>
              </div>
              <a :href="service.link" class="btn">More details</a>
            </div>
          </article>
        </div>

        <button class="srv-nav prev" @click="prev" aria-label="Previous">
          <span>←</span>
        </button>
        <button class="srv-nav next" @click="next" aria-label="Next">
          <span>→</span>
        </button>
      </div>

      <div class="srv-counter">{{ current + 1 }} / {{ services.length }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initServicesCarousel } from '~/composables/animations/home/services-carousel'

const root = ref<HTMLElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

const current = ref(0)

const services = [
  {
    title: 'How to Buy Off Plan',
    desc: 'Pre-construction opportunities with attractive payment plans and strong capital appreciation.',
    img: '/img/services/offplan.jpg',
    link: '/services#offplan'
  },
  {
    title: 'How to Buy Secondary Market',
    desc: 'Navigate resales with confidence: valuation, negotiation, and secure transfer.',
    img: '/img/services/secondary.jpg',
    link: '/services#secondary'
  },
  {
    title: 'Open Your Company in the Emirates',
    desc: 'Set up an entity smoothly—Free Zone or Mainland—with banking and compliance.',
    img: '/img/services/company.jpg',
    link: '/services#company'
  },
  {
    title: 'Tax in the Emirates',
    desc: 'Clear, investor-friendly framework with expert guidance for your structure.',
    img: '/img/services/tax.jpg',
    link: '/services#tax'
  },
  {
    title: 'Bank Accounts',
    desc: 'Corporate or personal—multi-currency accounts and remote onboarding options.',
    img: '/img/services/bank.jpg',
    link: '/services#bank'
  },
  {
    title: 'Accounting / Legal Services',
    desc: 'Contracts, due diligence, and ongoing compliance handled by specialists.',
    img: '/img/services/legal.jpg',
    link: '/services#legal'
  },
  {
    title: 'Golden Visa',
    desc: 'Long-term residency for investors, talents, entrepreneurs, and professionals.',
    img: '/img/services/golden-visa.jpg',
    link: '/services#goldenvisa'
  },
  {
    title: 'Investments — Gulf / International',
    desc: 'Curated opportunities across Dubai and the wider GCC for diversified portfolios.',
    img: '/img/services/investments.jpg',
    link: '/services#investments'
  }
]

let api: ReturnType<typeof initServicesCarousel> | null = null

onMounted(() => {
  if (!root.value || !viewport.value || !track.value) return

  api = initServicesCarousel({
    root: root.value,
    viewport: viewport.value,
    track: track.value,
    onIndexChange: (i) => (current.value = i)
  })
})

const next = () => api?.next()
const prev = () => api?.prev()
</script>
