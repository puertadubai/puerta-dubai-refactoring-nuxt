<template>
  <section class="services-page">
    <h1 class="services-heading">SERVICES</h1>

    <div class="accordion">
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="accordion-item"
        :id="service.id"
        :class="{ open: isOpen(index) }"
      >
        <button class="accordion-header" type="button" @click="toggle(index)">
          <span>{{ service.title }}</span>
          <span class="accordion-icon">{{ isOpen(index) ? '–' : '+' }}</span>
        </button>

        <div
          class="accordion-body"
          :style="{ maxHeight: bodyHeights[index] }"
          :ref="(el) => setBodyRef(el, index)"
        >
          <p v-for="(paragraph, pIndex) in service.body" :key="pIndex">
            {{ paragraph }}
          </p>
          <a href="#" class="btn leadForm">Book a call</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useHead } from '#imports'

useHead({
  title: 'Services | Puerta Dubai',
  bodyAttrs: {
    class: 'services-body'
  }
})

type Service = {
  id: string
  title: string
  body: string[]
}

const services: Service[] = [
  {
    id: 'offplan',
    title: 'How To Buy Off Plan',
    body: [
      'Buying off-plan in Dubai isn’t just a real estate decision, it’s an act of vision. It’s about entering the city’s cycle of creation early, when opportunity is still measured in foresight, not square meters.',
      'We specialize in identifying off-plan projects that balance innovation, credibility, and long-term value. Before we recommend a single development, we scrutinize the developer’s delivery history, the master plan’s viability, and the financial structure behind it. Our clients gain access to pre-launch projects often reserved for institutional investors, along with priority pricing and tailored payment plans. Beyond access, we provide strategy: matching your investment horizon with the right construction phase to optimize both yield and liquidity. We monitor progress, assist with registration and escrow procedures, and ensure contractual protection throughout the journey. This is not speculative buying; it’s intelligent positioning in one of the world’s most dynamic property markets.'
    ]
  },
  {
    id: 'secondary',
    title: 'How To Buy Secondary Market',
    body: [
      'The secondary market is where Dubai’s real estate matures: tangible assets, proven locations, and immediate rental returns. But the best opportunities are rarely visible to the public eye.',
      'We approach secondary market acquisitions like investment analysts, not agents. Our team studies market data, price evolution, rental yields, and ownership history to pinpoint assets with genuine growth potential and minimal exposure to inflated valuations. We manage the entire acquisition chain, including valuation, negotiation, legal verification, and Land Department transfer, ensuring every stage is clean and traceable. What distinguishes our method is the balance we maintain between emotional and financial value: a property must make sense both as a home and as a financial instrument. We benchmark every property against its district’s development trajectory, ensuring that what you buy today remains relevant tomorrow. Through this approach, our clients consistently outperform the market while minimizing exposure to risk.'
    ]
  },
  {
    id: 'company',
    title: 'Open Your Company In The Emirates',
    body: [
      'Opening a company in Dubai is more than setting up a business, it’s establishing a foothold in a strategic crossroads between Europe, Asia, and Africa. But choosing how and where to start makes all the difference.',
      'We provide complete corporate setup solutions that merge legal compliance with business intelligence. Whether you choose a mainland license for unrestricted trade or a free zone for tax efficiency, we guide you with precision and context. Our specialists handle documentation, licensing, shareholder agreements, visa processing, and banking coordination, streamlining what is often a fragmented experience. We also advise on corporate structure, from single-entity setups to holding companies and SPVs, to ensure flexibility in future capital movements. What truly sets us apart is our understanding of the nuances: how to align your business activity with the right jurisdiction, how to avoid licensing conflicts, and how to establish immediate operational credibility. In a market that rewards readiness, we make sure you start strong, compliant, and strategically placed.'
    ]
  },
  {
    id: 'tax',
    title: 'Tax In The Emirates',
    body: [
      'The UAE’s tax regime isn’t just favorable, it’s strategic. It rewards structure, compliance, and foresight. Those who understand it don’t just save; they optimize their entire financial ecosystem.',
      'Our tax advisory begins where standard consulting ends, at the intersection of law, finance, and international mobility. We interpret corporate tax regulations in the context of your industry, your ownership structure, and your cross-border exposure. From corporate tax registration to VAT planning and treaty analysis, we turn complexity into clarity. Our goal is to position you so that your operations remain compliant yet maximally efficient. For expatriates and global investors, we design fiscal strategies that align with residency requirements and banking transparency standards, ensuring no surprises in future audits. Every recommendation we make is documented, justified, and defensible, a standard built for investors who think long-term.'
    ]
  },
  {
    id: 'bank',
    title: 'Bank Accounts',
    body: [
      'In Dubai, your bank account isn’t a formality, it’s your bridge to the system. The right banking setup defines how you operate, transact, and scale your ventures in the Emirates.',
      'We assist clients in opening both personal and corporate bank accounts with institutions that match their profile, business activity, and capital flow. Our relationships with major banks give you access to multi-currency facilities, online banking, and priority services often reserved for established clients. But our real value lies in preparation: we curate the documentation, pre-verify compliance standards, and guide you through interviews and approvals. For entrepreneurs, we align your company license, shareholder structure, and bank requirements to avoid costly delays. For private clients, we ensure privacy, liquidity, and seamless global transfers. We don’t just open accounts; we help you build financial credibility in one of the world’s most sophisticated banking hubs.'
    ]
  },
  {
    id: 'legal',
    title: 'Accounting / Legal Services',
    body: [
      'In a jurisdiction built on speed and opportunity, your true advantage is control: over numbers, contracts, and compliance. Accounting and legal consistency are what keep ambition sustainable.',
      'Our legal and accounting department combines deep regulatory knowledge with operational practicality. We deliver complete bookkeeping, auditing, and reporting solutions that satisfy both UAE requirements and international standards. But beyond compliance, we focus on interpretation, turning financial data into decision-making tools. On the legal side, we draft and review contracts, shareholder agreements, and corporate resolutions with meticulous attention to risk exposure. Our goal is to make sure you’re never surprised: every signature, every transaction, every partnership is legally sound and strategically aligned. We also provide representation and dispute resolution support when necessary, protecting your interests quietly but firmly. Precision, discretion, and integrity define our approach.'
    ]
  },
  {
    id: 'goldenvisa',
    title: 'Golden Visa',
    body: [
      'The UAE Golden Visa is more than a document, it’s a long-term anchor in a region built for growth and global mobility. It’s how investors, professionals, and visionaries secure their place in the Emirates’ future.',
      'Our team manages the entire visa process from eligibility verification to final issuance, coordinating directly with approved channels and immigration authorities. We start by assessing your profile, investment, property ownership, or business activity, and identify the most efficient path to approval. We then handle all documentation, translations, attestations, and appointments, ensuring accuracy and discretion throughout. What distinguishes our approach is our strategic perspective: we don’t just obtain the visa, we help you use it effectively, for family reunification, tax residency, or regional business expansion. Our process is transparent, accelerated, and personalized, making your transition into UAE residency seamless and secure.'
    ]
  },
  {
    id: 'investments',
    title: 'Investments Gulf / International',
    body: [
      'Serious investors don’t chase markets, they anticipate them. The Gulf today stands as one of the most resilient and rewarding investment landscapes on the planet, bridging opportunity and stability.',
      'We curate exclusive access to Gulf and international investment opportunities across sectors such as real estate, hospitality, private equity, and innovative ventures shaping tomorrow’s economy. Each project undergoes a multi-layered evaluation combining financial modeling, geopolitical assessment, and long-term viability. We act as your strategic filter, connecting you only to deals that align with your capital goals, liquidity preferences, and ethical criteria. Beyond deal sourcing, we assist with legal structuring, cross-border due diligence, and local representation. For our international clients, we bridge the gap between ambition and execution, ensuring every investment is documented, compliant, and performance-driven. We are not brokers; we are strategic partners invested in your results.'
    ]
  }
]

const openItems = ref(new Set<number>())
const bodyRefs = ref<(HTMLElement | null)[]>([])
const bodyHeights = ref<string[]>([])

const isOpen = (index: number) => openItems.value.has(index)

const setBodyRef = (el: Element | null, index: number) => {
  bodyRefs.value[index] = el as HTMLElement | null
  if (!bodyHeights.value[index]) bodyHeights.value[index] = '0px'
}

const updateBodyHeight = (index: number) => {
  const body = bodyRefs.value[index]
  if (!body) return
  bodyHeights.value[index] = isOpen(index) ? `${body.scrollHeight}px` : '0px'
}

const toggle = async (index: number) => {
  if (isOpen(index)) {
    openItems.value.delete(index)
  } else {
    openItems.value.add(index)
  }
  await nextTick()
  updateBodyHeight(index)
}

const openFromHash = async () => {
  const hash = window.location.hash
  if (!hash) return
  const index = services.findIndex((service) => `#${service.id}` === hash)
  if (index < 0) return
  openItems.value.add(index)
  await nextTick()
  updateBodyHeight(index)

  const target = document.getElementById(services[index].id)
  if (!target) return
  const header = document.querySelector('.main-header') as HTMLElement | null
  const headerOffset = (header?.offsetHeight || 0) + 20
  const rectTop = target.getBoundingClientRect().top + window.scrollY
  const finalPos = rectTop - headerOffset
  window.scrollTo({ top: finalPos, behavior: 'smooth' })
}

onMounted(() => {
  setTimeout(() => {
    openFromHash()
  }, 300)
})
</script>

<style scoped>
.services-page {
  position: relative;
  overflow: hidden;
  background:
    repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.018) 0,
      rgba(255, 255, 255, 0.018) 1px,
      transparent 1px,
      transparent 11px
    ),
    #302d2d;
}
</style>
