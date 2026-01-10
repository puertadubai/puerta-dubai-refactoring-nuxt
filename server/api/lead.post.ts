// server/api/lead.post.ts
import { z } from "zod";
import nodemailer from "nodemailer";

const LeadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  country: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  interest: z.string().optional().nullable(),
  consent: z.boolean().optional().nullable(),

  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  fbclid: z.string().optional().nullable(),

  referrer: z.string().optional().nullable(),
  page_url: z.string().optional().nullable(),
  lang: z.string().optional().nullable(),

  // honeypot anti-bot (champ caché côté front)
  website: z.string().optional().nullable(),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // 1) Lire + valider body
  const body = await readBody(event);
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success) {
    setResponseStatus(event, 400);
    return { status: "error", message: "Invalid form data." };
  }

  const lead = parsed.data;

  // Anti-bot: si honeypot rempli -> on fait semblant que c’est OK
  if (lead.website && lead.website.trim().length > 0) {
    return { status: "success", message: "Thank you! We’ll contact you shortly." };
  }

  // 2) Insérer dans Supabase via REST (comme ton PHP)
  //    Table supposée: leads (à adapter si ton nom diffère)
  const supabaseInsertUrl = `${config.supabaseUrl}/rest/v1/leads`;

  const payload = {
    name: lead.name,
    email: lead.email,
    country: lead.country ?? null,
    whatsapp: lead.whatsapp ?? null,
    notes: lead.notes ?? null,
    interest: lead.interest ?? null,
    consent: lead.consent ?? null,

    utm_source: lead.utm_source ?? null,
    utm_medium: lead.utm_medium ?? null,
    utm_campaign: lead.utm_campaign ?? null,
    utm_term: lead.utm_term ?? null,
    utm_content: lead.utm_content ?? null,
    gclid: lead.gclid ?? null,
    fbclid: lead.fbclid ?? null,

    referrer: lead.referrer ?? null,
    page_url: lead.page_url ?? null,
    lang: lead.lang ?? null,

    created_at: new Date().toISOString(),
  };

  // Insert Supabase
  // (on ignore les erreurs d’insert seulement si tu veux “ne jamais bloquer” l’email,
  //  mais en général c’est mieux d’échouer si insert échoue)
  const insertRes = await $fetch.raw(supabaseInsertUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.supabaseServiceKey,
      Authorization: `Bearer ${config.supabaseServiceKey}`,
      Prefer: "return=representation",
    },
    body: payload,
  });

  if (insertRes.status < 200 || insertRes.status >= 300) {
    setResponseStatus(event, 500);
    return { status: "error", message: "Database insert failed." };
  }

  // 3) Envoyer email (équivalent au mail() PHP)
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort || 587),
    secure: Number(config.smtpPort) === 465, // true si 465
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const html = `
    <h2>New Lead - Puerta Dubai</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;">
      <tr><th align="left">Name</th><td>${escapeHtml(lead.name)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml(lead.email)}</td></tr>
      <tr><th align="left">Country</th><td>${escapeHtml(lead.country ?? "")}</td></tr>
      <tr><th align="left">WhatsApp</th><td>${escapeHtml(lead.whatsapp ?? "")}</td></tr>
      <tr><th align="left">Interest</th><td>${escapeHtml(lead.interest ?? "")}</td></tr>
      <tr><th align="left">Notes</th><td>${escapeHtml(lead.notes ?? "")}</td></tr>
      <tr><th align="left">Consent</th><td>${String(lead.consent ?? "")}</td></tr>
      <tr><th align="left">UTM Source</th><td>${escapeHtml(lead.utm_source ?? "")}</td></tr>
      <tr><th align="left">UTM Medium</th><td>${escapeHtml(lead.utm_medium ?? "")}</td></tr>
      <tr><th align="left">UTM Campaign</th><td>${escapeHtml(lead.utm_campaign ?? "")}</td></tr>
      <tr><th align="left">gclid</th><td>${escapeHtml(lead.gclid ?? "")}</td></tr>
      <tr><th align="left">fbclid</th><td>${escapeHtml(lead.fbclid ?? "")}</td></tr>
      <tr><th align="left">Referrer</th><td>${escapeHtml(lead.referrer ?? "")}</td></tr>
      <tr><th align="left">Page URL</th><td>${escapeHtml(lead.page_url ?? "")}</td></tr>
      <tr><th align="left">Language</th><td>${escapeHtml(lead.lang ?? "")}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    to: config.mailTo,
    from: config.mailFrom,
    replyTo: lead.email,
    subject: "New Lead from Puerta Dubai",
    html,
  });

  return { status: "success", message: "✅ Thank you! We’ll contact you shortly." };
});

// mini helper pour éviter l’injection HTML dans l’email
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
