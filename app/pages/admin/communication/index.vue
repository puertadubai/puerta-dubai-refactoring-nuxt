<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth',
})

type Chapter = {
  id: string
  title: string
  subtitle: string
}

const chapters: Chapter[] = [
  {
    id: 'context',
    title: 'Context & Market Insights',
    subtitle: 'Latin America -> Dubai'
  },
  {
    id: 'targets',
    title: 'Priority Targets & Personas',
    subtitle: 'Countries, waves, and investor profiles'
  },
  {
    id: 'positioning',
    title: 'Positioning & Messaging',
    subtitle: 'Promise, pillars, and value propositions'
  },
  {
    id: 'architecture',
    title: 'Communication Architecture 2026',
    subtitle: 'Four pillars to scale acquisition and trust'
  },
  {
    id: 'plan',
    title: '2026 Action Plan',
    subtitle: 'Month-by-month roadmap'
  },
  {
    id: 'kpis',
    title: 'KPIs & Management Dashboard',
    subtitle: 'Acquisition, engagement, and business'
  }
]

const openSections = ref(new Set<string>(['context']))

const toggleSection = (id: string) => {
  if (openSections.value.has(id)) {
    openSections.value.delete(id)
  } else {
    openSections.value.add(id)
  }
}

const isOpen = (id: string) => openSections.value.has(id)
</script>

<template>
  <section class="admin-communication">
    <header class="page-hero">
      <p class="eyebrow">Back Office</p>
      <h1>Communication Strategy</h1>
      <p class="subtitle">
        Premium strategy blueprint for Puerta Dubai, designed for Latin American investor acquisition.
      </p>
      <div class="hero-metrics">
        <div>
          <span class="metric-label">Timing</span>
          <span class="metric-value">2026 Priority Window</span>
        </div>
        <div>
          <span class="metric-label">Focus</span>
          <span class="metric-value">Latin America -> Dubai</span>
        </div>
        <div>
          <span class="metric-label">Objective</span>
          <span class="metric-value">Trusted Latin gateway</span>
        </div>
      </div>
    </header>

    <div class="drawer-list">
      <article v-for="chapter in chapters" :key="chapter.id" class="drawer">
        <button class="drawer-toggle" type="button" @click="toggleSection(chapter.id)">
          <div>
            <p class="drawer-kicker">Chapter</p>
            <h2>{{ chapter.title }}</h2>
            <p class="drawer-subtitle">{{ chapter.subtitle }}</p>
          </div>
          <span class="drawer-indicator" :class="{ open: isOpen(chapter.id) }">+</span>
        </button>
        <transition name="drawer">
          <div v-show="isOpen(chapter.id)" class="drawer-content">
            <div v-if="chapter.id === 'context'" class="content-grid">
              <div class="content-card">
                <h3>Opportunity Snapshot</h3>
                <ul>
                  <li>Dubai real estate reached ~181,000 transactions in 2024 (+36% YoY).</li>
                  <li>Early 2025: 118,000 transactions worth AED 326B.</li>
                  <li>Mexican investors represent ~11% of off-plan deals in 2025.</li>
                  <li>LatAm flows: Colombians (45%), Argentinians (25%), Mexicans (20%), Chileans (10%).</li>
                  <li>Dubai is positioning itself as a LatAm investment hub.</li>
                </ul>
              </div>
              <div class="content-card highlight">
                <h3>Strategic Conclusion</h3>
                <p>
                  2026 is the moment to position Puerta Dubai as the official Latin gateway to Dubai
                  investment, with a clear trust-first narrative and a full-service platform.
                </p>
              </div>
            </div>

            <div v-else-if="chapter.id === 'targets'" class="content-grid">
              <div class="content-card">
                <h3>Priority Countries</h3>
                <div class="pill-row">
                  <span>Colombia</span>
                  <span>Mexico</span>
                  <span>Argentina</span>
                  <span>Chile</span>
                </div>
                <p class="muted">Wave 2 (late 2026-2027): Peru, Uruguay, Brazil (PT-BR).</p>
              </div>
              <div class="content-card">
                <h3>Personas</h3>
                <div class="persona-grid">
                  <div>
                    <h4>Capital Protection Investor</h4>
                    <p>Protect savings, USD assets, stable returns.</p>
                    <span class="tag">Fear of scams</span>
                  </div>
                  <div>
                    <h4>Entrepreneur / Plan B Builder</h4>
                    <p>Business setup + visa.</p>
                    <span class="tag">Perceived complexity</span>
                  </div>
                  <div>
                    <h4>Relocating Family</h4>
                    <p>Schools, safety, long-term residency.</p>
                    <span class="tag">Logistics + costs</span>
                  </div>
                  <div>
                    <h4>HNWI Latino</h4>
                    <p>Diversification + efficient structures.</p>
                    <span class="tag">Needs credibility</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="chapter.id === 'positioning'" class="content-grid">
              <div class="content-card">
                <h3>Core Promise</h3>
                <p class="statement">Puerta Dubai = The trusted Latin platform to invest and settle in Dubai.</p>
              </div>
              <div class="content-card">
                <h3>Communication Pillars</h3>
                <ul>
                  <li>Clarity: neutral Spanish content (PT-BR later).</li>
                  <li>Trust: verified developers, legal and fiscal support.</li>
                  <li>360 Support: property, visa, company setup, relocation.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Key Messaging</h3>
                <ul>
                  <li>Protect your capital in USD by investing safely in Dubai with full Spanish support.</li>
                  <li>From Latin America to Dubai, without complications.</li>
                  <li>Property, visa, company: one team, one gateway.</li>
                </ul>
              </div>
            </div>

            <div v-else-if="chapter.id === 'architecture'" class="content-grid">
              <div class="content-card">
                <h3>Pillar 1: Authority & Education</h3>
                <ul>
                  <li>Multilingual blog (EN/ES, later PT-BR).</li>
                  <li>Lead magnets: investment checklist, Miami vs Dubai comparison.</li>
                  <li>Formats: articles, carousels, infographics, video explainers.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Pillar 2: Digital Acquisition</h3>
                <ul>
                  <li>Meta Ads (CO, MX, AR, CL) with high-impact visuals.</li>
                  <li>Google Ads ES: invertir en Dubai, visa Dubai.</li>
                  <li>Localized landing pages: /es-co, /es-mx, /es-ar, /es-cl.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Pillar 3: Trust & Proximity</h3>
                <ul>
                  <li>Monthly webinars in Spanish.</li>
                  <li>WhatsApp/Telegram community for Q&A.</li>
                  <li>Ambassador program with real LatAm stories.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Pillar 4: Community & Retention</h3>
                <ul>
                  <li>Monthly newsletter in Spanish.</li>
                  <li>Exclusive perks for existing clients.</li>
                  <li>Offline events in Bogota, CDMX, Buenos Aires.</li>
                  <li>Annual LatAm Trends Report (PDF).</li>
                </ul>
              </div>
            </div>

            <div v-else-if="chapter.id === 'plan'" class="content-grid">
              <div class="content-card">
                <h3>Q1 - Foundation & Initial Lead Flow</h3>
                <ul>
                  <li>Finalize LatAm positioning + Spanish messaging guidelines.</li>
                  <li>Launch Spanish blog section + country pages.</li>
                  <li>Meta/Google ads setup + CRM + email automation.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Q2 - Expansion & Authority</h3>
                <ul>
                  <li>Expand campaigns to AR + CL.</li>
                  <li>Launch fiscal comparison guides + PR outreach.</li>
                  <li>Start monthly newsletter and nurturing sequences.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Q3 - Nurturing & Evergreen Impact</h3>
                <ul>
                  <li>Automated sequences per persona.</li>
                  <li>New lead magnets for visa and company setup.</li>
                  <li>SEO ES content + relocation stories.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Q4 - Events, PR, Activation</h3>
                <ul>
                  <li>Dubai Investment Night - Bogota.</li>
                  <li>Expand to CDMX or Buenos Aires.</li>
                  <li>Publish LatAm Annual Report + 2027 roadmap.</li>
                </ul>
              </div>
            </div>

            <div v-else-if="chapter.id === 'kpis'" class="content-grid">
              <div class="content-card">
                <h3>Acquisition</h3>
                <ul>
                  <li>Website traffic (ES/LatAm).</li>
                  <li>Leads per country.</li>
                  <li>CPL on Meta/Google.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Engagement</h3>
                <ul>
                  <li>Webinar registrations + attendance.</li>
                  <li>WhatsApp group activity.</li>
                  <li>Newsletter opens/clicks.</li>
                </ul>
              </div>
              <div class="content-card">
                <h3>Business</h3>
                <ul>
                  <li>Qualified leads (budget + timeline).</li>
                  <li>Virtual/physical property tours.</li>
                  <li>Sales closed per country + repeat investors.</li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </article>
    </div>
  </section>
</template>

<style scoped>
.admin-communication {
  padding: 40px 8vw 90px;
  background: radial-gradient(circle at top, #f8f2ea 0%, #f4f1ed 45%, #f9f9f9 100%);
  min-height: 70vh;
}

.page-hero {
  padding: 40px 0 24px;
  border-bottom: 1px solid rgba(48, 45, 45, 0.08);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  color: #a38b68;
  margin: 0 0 14px;
}

h1 {
  margin: 0 0 10px;
  font-size: clamp(36px, 4vw, 52px);
}

.subtitle {
  margin: 0;
  max-width: 760px;
  color: #5a5046;
  font-size: 16px;
}

.hero-metrics {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.hero-metrics div {
  padding: 16px 18px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(48, 45, 45, 0.06);
  display: grid;
  gap: 4px;
}

.metric-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a7b6a;
}

.metric-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e1a16;
}

.drawer-list {
  margin-top: 32px;
  display: grid;
  gap: 16px;
}

.drawer {
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(48, 45, 45, 0.08);
  overflow: hidden;
  box-shadow: 0 16px 30px rgba(21, 17, 12, 0.08);
}

.drawer-toggle {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 24px 28px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  cursor: pointer;
}

.drawer-kicker {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 11px;
  color: #9a8b7a;
  margin: 0 0 6px;
}

.drawer-toggle h2 {
  margin: 0 0 4px;
  font-size: 22px;
}

.drawer-subtitle {
  margin: 0;
  color: #6d6257;
}

.drawer-indicator {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(48, 45, 45, 0.15);
  display: grid;
  place-items: center;
  font-size: 20px;
  transition: transform 0.2s ease;
}

.drawer-indicator.open {
  transform: rotate(45deg);
}

.drawer-content {
  padding: 0 28px 28px;
}

.content-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.content-card {
  padding: 18px 20px;
  border-radius: 16px;
  background: #f9f7f4;
  border: 1px solid rgba(48, 45, 45, 0.06);
}

.content-card.highlight {
  background: linear-gradient(135deg, #ffffff 0%, #f6efe6 100%);
}

.content-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.content-card h4 {
  margin: 0 0 6px;
  font-size: 15px;
}

.content-card ul {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  color: #50463c;
  font-size: 14px;
}

.content-card p {
  margin: 0;
  color: #50463c;
  font-size: 14px;
}

.statement {
  font-size: 16px;
  font-weight: 600;
}

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.pill-row span {
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(48, 45, 45, 0.1);
  font-size: 13px;
}

.muted {
  color: #7a6f64;
}

.persona-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.tag {
  display: inline-block;
  margin-top: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(163, 139, 104, 0.15);
  color: #5c4a33;
  font-size: 12px;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: max-height 0.35s ease, opacity 0.35s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  max-height: 0;
  opacity: 0;
}

.drawer-enter-to,
.drawer-leave-from {
  max-height: 1200px;
  opacity: 1;
}

@media (max-width: 640px) {
  .drawer-toggle {
    padding: 20px;
  }
  .drawer-content {
    padding: 0 20px 20px;
  }
}
</style>
