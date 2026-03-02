<template>
  <section id="services" class="services-accordion-section dark-bg">
    <div class="services-shell">
      <div class="services-backdrop" aria-hidden="true"></div>
      <div class="services-gradient" aria-hidden="true"></div>

      <div class="services-content">
        <header class="services-heading-block">
          <h2 class="services-title">Our Services</h2>
        </header>

        <div class="services-accordion" role="list">
          <article
            v-for="(service, index) in services"
            :key="service.link"
            class="service-row"
            :class="{ 'is-open': openIndex === index }"
            role="listitem"
          >
            <button
              class="service-trigger"
              type="button"
              :aria-expanded="openIndex === index"
              :aria-controls="`service-panel-${index}`"
              @click="toggle(index)"
            >
              <span class="service-icon" aria-hidden="true">
                <span class="service-icon-line service-icon-line--horizontal"></span>
                <span class="service-icon-line service-icon-line--vertical"></span>
              </span>
              <span class="service-label">{{ service.title }}</span>
            </button>

            <div
              :id="`service-panel-${index}`"
              class="service-panel"
              :class="{ 'is-open': openIndex === index }"
            >
              <div class="service-panel-inner">
                <p class="service-description">{{ service.desc }}</p>
                <a :href="service.link" class="btn service-link">More details</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const services = [
  {
    title: 'How to Buy Off Plan',
    desc: 'Pre-construction opportunities with attractive payment plans and strong capital appreciation.',
    link: '/services#offplan'
  },
  {
    title: 'How to Buy Secondary Market',
    desc: 'Navigate resales with confidence: valuation, negotiation, and secure transfer.',
    link: '/services#secondary'
  },
  {
    title: 'Open Your Company in the Emirates',
    desc: 'Set up an entity smoothly, free zone or mainland, with banking and compliance.',
    link: '/services#company'
  },
  {
    title: 'Tax in the Emirates',
    desc: 'Clear, investor-friendly guidance for structuring, residency, and long-term tax positioning.',
    link: '/services#tax'
  },
  {
    title: 'Bank Accounts',
    desc: 'Corporate or personal, with multi-currency options and support through onboarding steps.',
    link: '/services#bank'
  },
  {
    title: 'Accounting / Legal Services',
    desc: 'Contracts, due diligence, and ongoing compliance handled by trusted specialists.',
    link: '/services#legal'
  },
  {
    title: 'Golden Visa',
    desc: 'Long-term residency pathways for investors, entrepreneurs, professionals, and families.',
    link: '/services#goldenvisa'
  },
  {
    title: 'Investments - Gulf / International',
    desc: 'Curated opportunities across Dubai and the wider GCC for diversified wealth strategies.',
    link: '/services#investments'
  }
]

const openIndex = ref(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<style scoped>
#services.services-accordion-section {
  position: relative;
  padding: 0;
  background: #302d2d;
}

#services .services-shell {
  position: relative;
  width: 100%;
  min-height: clamp(720px, 54vw, 920px);
  margin: 0 auto;
  overflow: hidden;
  background: #302d2d;
}

#services .services-backdrop,
#services .services-gradient {
  position: absolute;
  inset: 0;
}

#services .services-backdrop {
  background-image: url('/img/bureau-services.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#services .services-gradient {
  background:
    linear-gradient(270deg, rgba(48, 45, 45, 1) 0%, rgba(48, 45, 45, 0.9) 18%, rgba(48, 45, 45, 0.62) 38%, rgba(48, 45, 45, 0.18) 62%, rgba(48, 45, 45, 0) 82%),
    linear-gradient(180deg, rgba(48, 45, 45, 0.04) 0%, rgba(48, 45, 45, 0.22) 100%);
}

#services .services-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 40%) minmax(520px, 60%);
  gap: clamp(20px, 3vw, 48px);
  min-height: inherit;
  padding: clamp(68px, 5.5vw, 96px) clamp(36px, 4.2vw, 78px);
}

#services .services-heading-block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: clamp(6px, 1vw, 18px);
}

#services .services-title {
  margin: 0;
  color: #fff;
  font-family: "Serrif Condensed Regular", serif;
  font-size: clamp(32px, 4vw, 48px);
  line-height: 0.92;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.018em;
  max-width: none;
  white-space: nowrap;
}

#services .services-accordion {
  align-self: center;
  margin-top: clamp(90px, 7.5vw, 140px);
  width: min(100%, 960px);
  margin-left: auto;
}

#services .service-row {
  border-top: 1px solid rgba(255, 255, 255, 0.34);
  background: transparent;
  transition: background-color 0.28s ease;
}

#services .service-row:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.34);
}

#services .service-row.is-open {
  background: rgba(48, 45, 45, 0.16);
}

#services .service-trigger {
  width: 100%;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  padding: 20px 0 18px;
  margin: 0;
  border: 0;
  background: transparent;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

#services .service-icon {
  position: relative;
  width: 28px;
  height: 28px;
  display: block;
}

#services .service-icon-line {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 28px;
  height: 1px;
  background: rgba(255, 255, 255, 0.92);
  transform: translate(-50%, -50%);
  transform-origin: center;
  transition: transform 0.32s ease, opacity 0.32s ease;
}

#services .service-icon-line--vertical {
  transform: translate(-50%, -50%) rotate(90deg);
}

#services .service-row.is-open .service-icon-line--horizontal {
  transform: translate(-50%, -50%) rotate(45deg);
}

#services .service-row.is-open .service-icon-line--vertical {
  transform: translate(-50%, -50%) rotate(-45deg);
}

#services .service-label {
  display: block;
  font-size: clamp(18px, 1.35vw, 28px);
  line-height: 1.18;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.006em;
}

#services .service-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.36s ease;
}

#services .service-panel.is-open {
  grid-template-rows: 1fr;
}

#services .service-panel-inner {
  overflow: hidden;
  padding-left: 62px;
  padding-bottom: 0;
  max-width: 920px;
}

#services .service-row.is-open .service-panel-inner {
  padding-bottom: 28px;
}

#services .service-description {
  margin: 0 0 22px;
  font-size: clamp(14px, 0.95vw, 18px);
  line-height: 1.62;
  letter-spacing: -0.004em;
  color: rgba(255, 255, 255, 0.84);
  max-width: 760px;
}

#services .service-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 12px 24px;
  border-width: 1px;
  border-color: #e7e6e1;
  background: #e7e6e1;
  color: #302d2d;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

#services .service-link::before {
  background-color: #302d2d;
}

#services .service-link:hover {
  color: #e7e6e1;
}

@media (max-width: 1024px) {
  #services .services-shell {
    min-height: clamp(640px, 62vw, 780px);
  }

  #services .services-content {
    grid-template-columns: minmax(220px, 34%) minmax(0, 66%);
    gap: 24px;
    padding: 58px 28px;
  }

  #services .service-label {
    font-size: clamp(18px, 1.5vw, 24px);
  }

  #services .services-title {
    font-size: clamp(32px, 4vw, 44px);
  }

  #services .service-description {
    font-size: clamp(13px, 1vw, 16px);
  }
}

@media (max-width: 820px) {
  #services.services-accordion-section {
    padding: 56px 0;
  }

  #services .services-shell {
    width: calc(100vw - 24px);
    min-height: auto;
  }

  #services .services-backdrop {
    background-attachment: scroll;
    background-position: center left 24%;
  }

  #services .services-gradient {
    background:
      linear-gradient(180deg, rgba(48, 45, 45, 0.28) 0%, rgba(48, 45, 45, 0.72) 28%, rgba(48, 45, 45, 0.92) 64%, rgba(48, 45, 45, 0.97) 100%),
      linear-gradient(270deg, rgba(48, 45, 45, 0.7) 0%, rgba(48, 45, 45, 0.14) 56%, rgba(48, 45, 45, 0) 100%);
  }

  #services .services-content {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 18px 24px;
  }

  #services .services-heading-block {
    min-height: 168px;
    align-items: flex-start;
  }

  #services .services-title {
    font-size: clamp(32px, 8vw, 40px);
    max-width: 5ch;
    white-space: normal;
    line-height: 0.96;
  }

  #services .services-accordion {
    width: 100%;
    padding-top: 0;
    margin-top: auto;
    background: linear-gradient(180deg, rgba(48, 45, 45, 0) 0%, rgba(48, 45, 45, 0.12) 16%, rgba(48, 45, 45, 0.3) 100%);
  }

  #services .service-trigger {
    grid-template-columns: 24px minmax(0, 1fr);
    gap: 12px;
    padding: 16px 0;
  }

  #services .service-icon,
  #services .service-icon-line {
    width: 18px;
  }

  #services .service-label {
    font-size: clamp(0.96rem, 3.8vw, 1.08rem);
    line-height: 1.24;
    letter-spacing: 0.01em;
  }

  #services .service-panel-inner {
    padding-left: 36px;
  }

  #services .service-row.is-open .service-panel-inner {
    padding-bottom: 16px;
  }

  #services .service-description {
    font-size: 0.9rem;
    line-height: 1.58;
    margin-bottom: 14px;
    color: rgba(255, 255, 255, 0.82);
  }

  #services .service-link {
    width: 100%;
    max-width: 220px;
    min-height: 44px;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
  }
}

@media (max-width: 480px) {
  #services .services-heading-block {
    min-height: 132px;
  }

  #services .services-content {
    padding-left: 16px;
    padding-right: 16px;
  }

  #services .service-panel-inner {
    padding-left: 30px;
  }

  #services .service-link {
    max-width: none;
  }
}
</style>
