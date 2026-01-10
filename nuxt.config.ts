// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  components: [
    {
      path: "~/app/components",
      pathPrefix: false,
    },
  ],

  css: [
    "~/assets/css/styles.css",
    "~/assets/css/project.css",
    "~/assets/css/services.css",
    "~/assets/css/components/project-hero.css",
    "~/assets/css/components/project-nav.css", // (dé-doublonné)
    "~/assets/css/gallery-horizontal.css",
  ],

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  // ✅ Secrets côté serveur (NE PAS mettre ça dans public)
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,

    resendApiKey: process.env.RESEND_API_KEY,

    leadMailTo: process.env.LEAD_MAIL_TO,
    leadMailFrom: process.env.LEAD_MAIL_FROM,
  },
});
