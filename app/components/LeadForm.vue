<script setup lang="ts">
const route = useRoute();

const form = reactive({
  name: "",
  email: "",
  country: "",
  whatsapp: "",
  notes: "",
  interest: "",

  consent: false,

  // tracking
  utm_source: (route.query.utm_source as string) || "",
  utm_medium: (route.query.utm_medium as string) || "",
  utm_campaign: (route.query.utm_campaign as string) || "",
  utm_term: (route.query.utm_term as string) || "",
  utm_content: (route.query.utm_content as string) || "",
  gclid: (route.query.gclid as string) || "",
  fbclid: (route.query.fbclid as string) || "",

  referrer: "",
  page_url: "",
  lang: "",

  website: "", // honeypot (champ caché)
});

const status = ref<"idle" | "loading" | "success" | "error">("idle");
const message = ref("");

onMounted(() => {
  form.referrer = document.referrer || "";
  form.page_url = window.location.href;
  // si tu utilises Google Translate: tu peux lire la langue actuelle depuis ton script/DOM
  form.lang = document.documentElement.lang || "";
});

async function submit() {
  status.value = "loading";
  message.value = "";

  try {
    const res = await $fetch<{ status: string; message: string }>("/api/lead", {
      method: "POST",
      body: form,
    });

    status.value = res.status === "success" ? "success" : "error";
    message.value = res.message || "";
  } catch (e) {
    status.value = "error";
    message.value = "❌ An error occurred. Please try again.";
  }
}
</script>

<template>
  <form id="leadForm" @submit.prevent="submit" class="lead-form">
    <!-- honeypot caché -->
    <input v-model="form.website" type="text" name="website" autocomplete="off" tabindex="-1" style="display:none" />

    <img src="/img/logo-black.png" alt="Puerta Dubai" />

    <h3>
      Pre-Registration
      <span>Priority Access</span>
    </h3>

    <p class="lead-intro">
      Join a select group of early investors and receive exclusive insights,
      priority off-plan launches, and personalized support tailored to your goals.
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
    </div>

    <textarea v-model="form.notes" placeholder="Optional details (budget, goals, timeline...)" />

    <label class="full helper">
      <input v-model="form.consent" type="checkbox" />
      I agree to receive investment opportunities in Dubai.
    </label>

    <button class="btn" :disabled="status === 'loading'">
      {{ status === 'loading' ? 'Sending...' : 'Pre-Register' }}
    </button>

    <p v-if="message">{{ message }}</p>
    <p class="helper">You can unsubscribe at any time. We respect your privacy.</p>
  </form>
</template>
