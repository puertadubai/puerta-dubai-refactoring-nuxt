<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth',
})

type PreviewAsset = {
  title: string
  caption: string
  src: string
  alt: string
}

type DownloadAsset = {
  label: string
  href: string
  meta: string
}

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
    subtitle: 'Brand palette with supporting references'
  },
  {
    id: 'type',
    title: 'Typography',
    subtitle: 'Editorial hierarchy and charter board'
  },
  {
    id: 'business-card',
    title: 'Business Card',
    subtitle: 'Mockups and downloadable source files'
  },
  {
    id: 'email',
    title: 'Email Signature',
    subtitle: 'Professional Gmail-ready signature block'
  }
]

const assetBase = '/visual-identity/charte'

const coverImage = `${assetBase}/cover-charte.jpg`
const typographyImage = `${assetBase}/typo.jpg`
const colorsImage = `${assetBase}/colors.jpg`
const emailSignatureHtml = `${assetBase}/email-signature-gmail/dayan-signature-gmail.html`

const logoPreviews: PreviewAsset[] = [
  {
    title: 'Full Logo Preview',
    caption: 'Primary composition for premium brand applications.',
    src: `${assetBase}/logo-full-black.png`,
    alt: 'Puerta Dubai full logo preview'
  },
  {
    title: 'Text Logo Preview',
    caption: 'Secondary wordmark preview for restrained placements.',
    src: `${assetBase}/logo-text-black.png`,
    alt: 'Puerta Dubai text logo preview'
  }
]

const logoDownloads: DownloadAsset[] = [
  {
    label: 'Full logo black',
    href: `${assetBase}/full-logo-black.svg`,
    meta: 'SVG download'
  },
  {
    label: 'Full logo white',
    href: `${assetBase}/full-logo-white.svg`,
    meta: 'SVG download'
  },
  {
    label: 'Text logo black',
    href: `${assetBase}/text-logo-black.svg`,
    meta: 'SVG download'
  },
  {
    label: 'Text logo white',
    href: `${assetBase}/text-logo-white.svg`,
    meta: 'SVG download'
  }
]

const brandColors = [
  { name: 'Carbon', hex: '#302d2d', rgb: '48, 45, 45' },
  { name: 'Champagne Rose', hex: '#dcc6b8', rgb: '220, 198, 184' },
  { name: 'Warm Ivory', hex: '#e7e6e1', rgb: '231, 230, 225' },
  { name: 'Accent Gold', hex: '#a38b68', rgb: '163, 139, 104' }
]

const businessCardPreviews: PreviewAsset[] = [
  {
    title: 'Horizontal Mockup',
    caption: 'Presentation mockup for the horizontal card system.',
    src: `${assetBase}/mockup-carte-horizontale.jpg`,
    alt: 'Puerta Dubai horizontal business card mockup'
  },
  {
    title: 'Vertical Mockup',
    caption: 'Presentation mockup for the vertical card system.',
    src: `${assetBase}/mockup-carte-verticale.jpg`,
    alt: 'Puerta Dubai vertical business card mockup'
  }
]

const businessCardDownloads: DownloadAsset[] = [
  {
    label: 'Business card source v1',
    href: `${assetBase}/business-card-v1.ai`,
    meta: 'Adobe Illustrator source'
  },
  {
    label: 'Business card source alternate',
    href: `${assetBase}/business-cardai.ai`,
    meta: 'Adobe Illustrator source'
  }
]

const emailAssets: DownloadAsset[] = [
  {
    label: 'Gmail signature HTML',
    href: emailSignatureHtml,
    meta: 'HTML file'
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
      <div class="hero-cover">
        <img :src="coverImage" alt="Puerta Dubai visual identity cover" />
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
            <div v-if="chapter.id === 'logo'" class="section-stack">
              <div class="content-grid preview-grid">
                <article
                  v-for="item in logoPreviews"
                  :key="item.title"
                  class="content-card preview-card"
                >
                  <div class="asset-preview">
                    <img :src="item.src" :alt="item.alt" />
                  </div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.caption }}</p>
                </article>
              </div>

              <div class="content-card highlight">
                <div class="section-header">
                  <div>
                    <p class="section-label">Downloads</p>
                    <h3>Logo Source Files</h3>
                  </div>
                  <p class="section-note">The PNGs above are previews only. Use the SVG files below for downloads.</p>
                </div>
                <div class="download-list">
                  <a
                    v-for="file in logoDownloads"
                    :key="file.href"
                    class="download-card"
                    :href="file.href"
                    download
                    target="_blank"
                    rel="noopener"
                  >
                    <strong>{{ file.label }}</strong>
                    <span>{{ file.meta }}</span>
                  </a>
                </div>
              </div>
            </div>

            <div v-else-if="chapter.id === 'colors'" class="section-stack">
              <div class="content-grid two-col">
                <article class="content-card highlight">
                  <div class="section-header">
                    <div>
                      <p class="section-label">Palette</p>
                      <h3>Brand Color Codes</h3>
                    </div>
                    <p class="section-note">Core tones used across digital and print assets.</p>
                  </div>
                  <div class="color-grid">
                    <div
                      v-for="color in brandColors"
                      :key="color.hex"
                      class="color-swatch"
                    >
                      <span :style="{ background: color.hex }"></span>
                      <div>
                        <strong>{{ color.name }}</strong>
                        <small>{{ color.hex }}</small>
                        <small>RGB {{ color.rgb }}</small>
                      </div>
                    </div>
                  </div>
                </article>

                <article class="content-card preview-card">
                  <div class="section-header">
                    <div>
                      <p class="section-label">Reference</p>
                      <h3>Color Board</h3>
                    </div>
                  </div>
                  <div class="asset-preview tall">
                    <img :src="colorsImage" alt="Puerta Dubai color board" />
                  </div>
                </article>
              </div>
            </div>

            <div v-else-if="chapter.id === 'type'" class="section-stack">
              <div class="content-grid">
                <article class="content-card preview-card">
                  <div class="section-header">
                    <div>
                      <p class="section-label">Reference</p>
                      <h3>Typography Board</h3>
                    </div>
                  </div>
                  <div class="asset-preview tall">
                    <img :src="typographyImage" alt="Puerta Dubai typography board" />
                  </div>
                </article>
              </div>
            </div>

            <div v-else-if="chapter.id === 'business-card'" class="section-stack">
              <div class="content-grid preview-grid">
                <article
                  v-for="item in businessCardPreviews"
                  :key="item.title"
                  class="content-card preview-card"
                >
                  <div class="asset-preview tall">
                    <img :src="item.src" :alt="item.alt" />
                  </div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.caption }}</p>
                </article>
              </div>

              <div class="content-card highlight">
                <div class="section-header">
                  <div>
                    <p class="section-label">Downloads</p>
                    <h3>Business Card Source Files</h3>
                  </div>
                  <p class="section-note">The mockups above are previews. The AI files below are the downloadable sources.</p>
                </div>
                <div class="download-list">
                  <a
                    v-for="file in businessCardDownloads"
                    :key="file.href"
                    class="download-card"
                    :href="file.href"
                    download
                    target="_blank"
                    rel="noopener"
                  >
                    <strong>{{ file.label }}</strong>
                    <span>{{ file.meta }}</span>
                  </a>
                </div>
              </div>
            </div>

            <div v-else-if="chapter.id === 'email'" class="section-stack">
              <div class="content-grid two-col">
                <article class="content-card highlight">
                  <div class="section-header">
                    <div>
                      <p class="section-label">Gmail Signature</p>
                      <h3>Dayan Candamil</h3>
                    </div>
                    <p class="section-note">Simple, premium and aligned with the printed business card.</p>
                  </div>

                  <div class="email-signature-preview">
                    <div class="email-signature-mark">
                      <img :src="`${assetBase}/logo-full-black.png`" alt="Puerta Dubai logo" />
                    </div>
                    <div class="email-signature-copy">
                      <strong>Dayan Candamil</strong>
                      <em>CEO &amp; Founder</em>
                      <span>+971 54 440 2792</span>
                      <span>dayancandamil@gmail.com</span>
                      <span>www.puertadubai.com</span>
                    </div>
                  </div>

                  <p class="signature-note">
                    For real Gmail usage, the logo should later be served from a public URL before final insertion.
                  </p>
                </article>

                <article class="content-card">
                  <div class="section-header">
                    <div>
                      <p class="section-label">Download</p>
                      <h3>Signature Assets</h3>
                    </div>
                  </div>
                  <div class="download-list">
                    <a
                      v-for="file in emailAssets"
                      :key="file.href"
                      class="download-card"
                      :href="file.href"
                      download
                      target="_blank"
                      rel="noopener"
                    >
                      <strong>{{ file.label }}</strong>
                      <span>{{ file.meta }}</span>
                    </a>
                  </div>
                </article>
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

.hero-cover {
  margin-top: 28px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(48, 45, 45, 0.08);
  box-shadow: 0 24px 50px rgba(21, 17, 12, 0.08);
}

.hero-cover img {
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: contain;
  display: block;
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

.section-stack {
  display: grid;
  gap: 18px;
}

.content-grid {
  display: grid;
  gap: 18px;
}

.two-col {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.preview-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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

.content-card p {
  margin: 0;
  color: #50463c;
  font-size: 14px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 12px;
  margin-bottom: 16px;
}

.section-label {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  color: #a38b68;
}

.section-note {
  max-width: 320px;
  text-align: right;
  font-size: 13px;
  color: #6d6257;
}

.preview-card h3 {
  margin-bottom: 8px;
}

.asset-preview {
  border-radius: 16px;
  background: linear-gradient(180deg, #fff 0%, #f6efe6 100%);
  border: 1px solid rgba(48, 45, 45, 0.08);
  padding: 18px;
  display: grid;
  place-items: center;
  min-height: 220px;
  margin-bottom: 14px;
  overflow: hidden;
}

.asset-preview.tall {
  min-height: 320px;
}

.asset-preview img {
  width: 100%;
  max-width: 100%;
  display: block;
  object-fit: contain;
}

.preview-grid .asset-preview img {
  width: auto;
  max-width: 220px;
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

.download-list {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.download-card {
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(48, 45, 45, 0.08);
  text-decoration: none;
  color: #302d2d;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.download-card:hover {
  transform: translateY(-2px);
  border-color: rgba(163, 139, 104, 0.45);
  box-shadow: 0 12px 24px rgba(21, 17, 12, 0.08);
}

.download-card span {
  font-size: 13px;
  color: #6d6257;
}

.email-signature-preview {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #fff 0%, #f6efe6 100%);
  border: 1px solid rgba(48, 45, 45, 0.08);
}

.email-signature-mark {
  width: 96px;
  min-width: 96px;
  border-right: 3px solid #dcc6b8;
  padding-right: 16px;
}

.email-signature-mark img {
  width: 76px;
  display: block;
}

.email-signature-copy {
  display: grid;
  gap: 4px;
}

.email-signature-copy strong {
  font-size: 24px;
  font-weight: 600;
}

.email-signature-copy em {
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  color: #a38b68;
}

.email-signature-copy span {
  color: #5d5247;
  font-size: 14px;
}

.signature-note {
  margin-top: 14px !important;
  color: #6d6257 !important;
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
  max-height: 1600px;
  opacity: 1;
}

@media (max-width: 640px) {
  .admin-identity {
    padding: 28px 5vw 72px;
  }

  .drawer-toggle {
    padding: 20px;
  }

  .drawer-content {
    padding: 0 20px 20px;
  }

  .section-header {
    display: grid;
  }

  .section-note {
    text-align: left;
    max-width: none;
  }

  .email-signature-preview {
    grid-template-columns: 1fr;
  }

  .email-signature-mark {
    width: auto;
    min-width: 0;
    border-right: none;
    border-bottom: 3px solid #dcc6b8;
    padding-right: 0;
    padding-bottom: 14px;
  }
}
</style>
