import { z } from 'zod'
import nodemailer from 'nodemailer'
import {
  buildGuideAccessLink,
  buildLeadAdminEmail,
  buildLeadConfirmationEmail
} from '../utils/leadEmails'

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
  website: z.string().optional().nullable()
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const parsed = LeadSchema.safeParse(body)

  if (!parsed.success) {
    setResponseStatus(event, 400)
    return { status: 'error', message: 'Invalid form data.' }
  }

  const lead = parsed.data

  if (lead.website && lead.website.trim().length > 0) {
    return {
      status: 'success',
      message: 'Thank you. If your request is valid, we will email you the guide access details.'
    }
  }

  const supabaseInsertUrl = `${config.supabaseUrl}/rest/v1/leads`
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
    created_at: new Date().toISOString()
  }

  const insertRes = await $fetch.raw(supabaseInsertUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: config.supabaseServiceKey,
      Authorization: `Bearer ${config.supabaseServiceKey}`,
      Prefer: 'return=representation'
    },
    body: payload
  })

  if (insertRes.status < 200 || insertRes.status >= 300) {
    setResponseStatus(event, 500)
    return { status: 'error', message: 'Database insert failed.' }
  }

  assertMailConfig(config)

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort || 587),
    secure: Number(config.smtpPort) === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  })

  const baseUrl = getBaseUrl(event)
  const accessLink = buildGuideAccessLink(baseUrl, lead.email)
  const logoUrl = new URL('/img/logo-black.png', `${baseUrl}/`).toString()

  const adminMail = buildLeadAdminEmail(lead, accessLink)
  const confirmationMail = buildLeadConfirmationEmail(lead, logoUrl, accessLink)

  await transporter.sendMail({
    to: config.leadMailTo,
    from: config.leadMailFrom,
    replyTo: lead.email,
    subject: adminMail.subject,
    html: adminMail.html,
    text: adminMail.text
  })

  await transporter.sendMail({
    to: lead.email,
    from: config.leadMailFrom,
    subject: confirmationMail.subject,
    html: confirmationMail.html,
    text: confirmationMail.text
  })

  return {
    status: 'success',
    message:
      'Registration confirmed. Check your inbox for your private Golden Visa guide access email.'
  }
})

function assertMailConfig(config: ReturnType<typeof useRuntimeConfig>) {
  const missing = [
    ['smtpHost', config.smtpHost],
    ['smtpPort', config.smtpPort],
    ['smtpUser', config.smtpUser],
    ['smtpPass', config.smtpPass],
    ['leadMailTo', config.leadMailTo],
    ['leadMailFrom', config.leadMailFrom]
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length === 0) return

  throw createError({
    statusCode: 500,
    statusMessage: `Missing mail configuration: ${missing.join(', ')}`
  })
}

function getBaseUrl(event: Parameters<typeof defineEventHandler>[0]) {
  const protoHeader = getHeader(event, 'x-forwarded-proto')
  const hostHeader = getHeader(event, 'x-forwarded-host') || getHeader(event, 'host')
  const protocol = protoHeader || 'http'
  const host = hostHeader || 'localhost:3000'
  return `${protocol}://${host}`
}
