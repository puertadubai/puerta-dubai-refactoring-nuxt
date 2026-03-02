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
    id: 'logo',
    title: 'Logo / Variants / Usage',
    subtitle: 'Primary mark, alternates, and usage rules'
  },
  {
    id: 'colors',
    title: 'Color Codes',
    subtitle: 'Brand palette with HEX + RGB'
  },
  {
    id: 'type',
    title: 'Typography',
    subtitle: 'Editorial hierarchy and samples'
  },
  {
    id: 'business-card',
    title: 'Business Card',
    subtitle: 'Front and back layout'
  },
  {
    id: 'social',
    title: 'Social Media Templates',
    subtitle: 'Instagram + Facebook formats'
  },
  {
    id: 'email',
    title: 'Email Signature',
    subtitle: 'Professional client signature block'
  }
]

const openSections = ref(new Set<string>(['logo']))

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
  <section class="admin-identity">
    <header class="page-hero">
      <p class="eyebrow">Back Office</p>
      <h1>Visual Identity</h1>
      <p class="subtitle">
        A premium identity system for Puerta Dubai: unified branding across digital and print.
      </p>
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
            <div v-if="chapter.id === 'logo'" class="content-grid">
              <div class="content-card">
                <h3>Primary Logo</h3>
                <div class="logo-sample">
                  <img src="/img/logo-black.png" alt="Puerta Dubai logo" />
                </div>
                <p>Use the #302d2d logo on light backgrounds for maximum clarity.</p>
              </div>
              <div class="content-card">
                <h3>Variants</h3>
                <div class="logo-row">
                  <img src="/img/logo-black.png" alt="Logo black" />
                  <img src="/img/logo.svg" alt="Logo symbol" />
                  <img src="/img/logo-txt-blanc.svg" alt="Logo white text" />
                </div>
                <p>Keep clear space equal to the height of the "P" around the mark.</p>
              </div>
              <div class="content-card highlight">
                <h3>Do & Don't</h3>
                <ul>
                  <li>Do keep contrast high and preserve aspect ratio.</li>
                  <li>Do not stretch, rotate, or add drop shadows.</li>
                </ul>
              </div>
            </div>

            <div v-else-if="chapter.id === 'colors'" class="content-grid">
              <div class="content-card">
                <h3>Core Palette</h3>
                <div class="color-grid">
                  <div class="color-swatch">
                    <span style="background:#111111;"></span>
                    <div>
                      <strong>#302d2d</strong>
                      <small>#111111</small>
                      <small>RGB 17 17 17</small>
                    </div>
                  </div>
                  <div class="color-swatch">
                    <span style="background:#ffffff;"></span>
                    <div>
                      <strong>Ivory</strong>
                      <small>#FFFFFF</small>
                      <small>RGB 255 255 255</small>
                    </div>
                  </div>
                  <div class="color-swatch">
                    <span style="background:#b58a52;"></span>
                    <div>
                      <strong>Gold Sand</strong>
                      <small>#B58A52</small>
                      <small>RGB 181 138 82</small>
                    </div>
                  </div>
                  <div class="color-swatch">
                    <span style="background:#f6efe6;"></span>
                    <div>
                      <strong>Soft Linen</strong>
                      <small>#F6EFE6</small>
                      <small>RGB 246 239 230</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-card highlight">
                <h3>Usage</h3>
                <p>Primary backgrounds should remain light and elegant, with gold accents for premium cues.</p>
              </div>
            </div>

            <div v-else-if="chapter.id === 'type'" class="content-grid">
              <div class="content-card">
                <h3>Headlines</h3>
                <div class="type-sample headline">
                  Puerta Dubai - Investment in Dubai
                </div>
                <p>Elegant serif for hero moments and premium storytelling.</p>
              </div>
              <div class="content-card">
                <h3>Body Copy</h3>
                <div class="type-sample body">
                  Puerta Dubai guides Latin American investors with clarity, trust, and full-service support.
                </div>
                <p>Readable, balanced, and neutral for multilingual clarity.</p>
              </div>
              <div class="content-card">
                <h3>Accent</h3>
                <div class="type-sample accent">LATIN GATEWAY TO DUBAI</div>
                <p>Uppercase accent used for section labels or metrics.</p>
              </div>
            </div>

            <div v-else-if="chapter.id === 'business-card'" class="content-grid">
              <div class="content-card">
                <h3>Front</h3>
                <div class="card-mock card-front">
                  <img src="/img/logo-black.png" alt="Puerta Dubai" />
                  <span>Investment Advisory</span>
                </div>
              </div>
              <div class="content-card">
                <h3>Back</h3>
                <div class="card-mock card-back">
                  <strong>Dayan Candamil</strong>
                  <span>Managing Partner</span>
                  <span>+971 50 000 0000</span>
                  <span>contact@puertadubai.com</span>
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>

            <div v-else-if="chapter.id === 'social'" class="content-grid">
              <div class="content-card">
                <h3>Instagram Template</h3>
                <div class="social-mock">
                  <div class="social-header">
                    <img src="/img/logo-black.png" alt="Puerta Dubai" />
                    <span>Latin Gateway Series</span>
                  </div>
                  <div class="social-body">
                    <strong>Dubai Investment Update</strong>
                    <p>Key insights for Latin American investors.</p>
                  </div>
                </div>
              </div>
              <div class="content-card">
                <h3>Facebook Template</h3>
                <div class="social-mock wide">
                  <div class="social-body">
                    <strong>From Latin America to Dubai</strong>
                    <p>Weekly market briefings and opportunities.</p>
                  </div>
                  <div class="social-footer">
                    <span>puertadubai.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="chapter.id === 'email'" class="content-grid">
              <div class="content-card">
                <h3>Email Signature</h3>
                <div class="email-signature">
                  <img src="/img/logo-black.png" alt="Puerta Dubai" />
                  <div>
                    <strong>Dayan Candamil</strong>
                    <span>Managing Partner</span>
                    <span>+971 50 000 0000</span>
                    <span>dayancandamil@gmail.com</span>
                    <span>puertadubai.com</span>
                  </div>
                </div>
              </div>
              <div class="content-card highlight">
                <h3>Guidelines</h3>
                <ul>
                  <li>Keep signatures concise: name, title, phone, email, website.</li>
                  <li>Logo aligned left with 24px padding.</li>
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
.admin-identity {
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

.logo-sample {
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(48, 45, 45, 0.08);
  padding: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
}

.logo-sample img {
  width: 200px;
  max-width: 100%;
}

.logo-row {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  align-items: center;
}

.logo-row img {
  width: 100%;
  max-width: 160px;
}

.color-grid {
  display: grid;
  gap: 12px;
}

.color-swatch {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(48, 45, 45, 0.08);
}

.color-swatch span {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  display: block;
}

.color-swatch small {
  display: block;
  color: #6e6357;
}

.type-sample {
  padding: 14px 16px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(48, 45, 45, 0.08);
  margin-bottom: 10px;
}

.type-sample.headline {
  font-size: 22px;
  font-weight: 600;
}

.type-sample.body {
  font-size: 15px;
  line-height: 1.5;
}

.type-sample.accent {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.card-mock {
  padding: 18px;
  border-radius: 14px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  min-height: 160px;
  display: grid;
  gap: 8px;
}

.card-front {
  background: #fff;
  place-items: center;
  text-align: center;
}

.card-front img {
  width: 140px;
}

.card-back {
  background: #fdfbf9;
  font-size: 14px;
}

.card-back span {
  color: #5d5247;
}

.social-mock {
  border-radius: 16px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  background: #fff;
  padding: 16px;
  display: grid;
  gap: 12px;
}

.social-mock.wide {
  min-height: 160px;
}

.social-header {
  display: flex;
  gap: 12px;
  align-items: center;
}

.social-header img {
  width: 60px;
}

.social-body strong {
  display: block;
  font-size: 16px;
  margin-bottom: 6px;
}

.social-body p {
  margin: 0;
  color: #5d5247;
}

.social-footer {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a7b6a;
}

.email-signature {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(48, 45, 45, 0.08);
  background: #fff;
}

.email-signature img {
  width: 100px;
}

.email-signature span {
  display: block;
  color: #5d5247;
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
  .email-signature {
    grid-template-columns: 1fr;
  }
}
</style>
