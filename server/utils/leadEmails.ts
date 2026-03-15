type LeadEmailPayload = {
  name: string
  email: string
  country?: string | null
  whatsapp?: string | null
  notes?: string | null
  interest?: string | null
  consent?: boolean | null
  lang?: string | null
}

type MailContent = {
  subject: string
  html: string
  text: string
}

export function buildGuideAccessLink(baseUrl: string, email: string) {
  const url = new URL('/golden-visa', ensureTrailingSlash(baseUrl))
  url.searchParams.set('email', email)
  return url.toString()
}

export function buildLeadAdminEmail(
  lead: LeadEmailPayload & Record<string, string | boolean | null | undefined>,
  accessLink: string
): MailContent {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Country', lead.country ?? ''],
    ['WhatsApp', lead.whatsapp ?? ''],
    ['Interest', lead.interest ?? ''],
    ['Notes', lead.notes ?? ''],
    ['Consent', String(lead.consent ?? '')],
    ['Language', lead.lang ?? ''],
    ['Guide link', accessLink]
  ]

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:10px 12px;border:1px solid #d7cdc4;background:#f7f0e8;">${escapeHtml(
          label
        )}</th><td style="padding:10px 12px;border:1px solid #e8ddd2;">${escapeHtml(value)}</td></tr>`
    )
    .join('')

  return {
    subject: 'New Golden Visa lead - Puerta Dubai',
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;color:#302d2d;">
        <h2 style="margin:0 0 18px;">New Golden Visa lead</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;">
          ${htmlRows}
        </table>
      </div>
    `
  }
}

export function buildLeadConfirmationEmail(
  lead: LeadEmailPayload,
  logoUrl: string,
  accessLink: string
): MailContent {
  const summaryRows = [
    ['Full name', lead.name],
    ['Email', lead.email],
    ['Country', lead.country ?? 'Not provided'],
    ['WhatsApp', lead.whatsapp ?? 'Not provided'],
    ['Interest', lead.interest ?? 'Not specified'],
    ['Preferred language', lead.lang?.toUpperCase() ?? 'Default site language']
  ]

  if (lead.notes?.trim()) {
    summaryRows.push(['Notes', lead.notes.trim()])
  }

  const htmlSummary = summaryRows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(48,45,45,0.12);color:#7a6d62;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(
            label
          )}</td>
          <td style="padding:12px 0;border-bottom:1px solid rgba(48,45,45,0.12);color:#302d2d;font-size:15px;line-height:1.55;">${escapeHtml(
            value
          )}</td>
        </tr>
      `
    )
    .join('')

  return {
    subject: 'Your Golden Visa guide access - Puerta Dubai',
    text: [
      `Hello ${lead.name},`,
      '',
      'Your registration has been confirmed.',
      'Your private Golden Visa guide link is ready:',
      accessLink,
      '',
      'For security, you will be asked to confirm the same email address again on the access page.',
      '',
      'Submitted details:',
      ...summaryRows.map(([label, value]) => `- ${label}: ${value}`),
      '',
      'Puerta Dubai'
    ].join('\n'),
    html: `
      <!doctype html>
      <html lang="en">
        <body style="margin:0;padding:0;background:#f3ede7;color:#302d2d;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ede7;padding:28px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:680px;background:#fffdf9;border:1px solid rgba(48,45,45,0.08);">
                  <tr>
                    <td style="padding:36px 40px 28px;background:linear-gradient(180deg,#302d2d 0%,#1f1c1c 100%);text-align:center;">
                      <img src="${escapeAttribute(logoUrl)}" alt="Puerta Dubai" width="180" style="display:block;margin:0 auto 18px;max-width:180px;width:100%;height:auto;" />
                      <p style="margin:0 0 8px;color:#dcc6b8;font-size:12px;letter-spacing:0.26em;text-transform:uppercase;">Golden Visa Guide</p>
                      <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:1;">Registration Confirmed</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 40px 40px;">
                      <p style="margin:0 0 18px;font-size:17px;line-height:1.7;">Hello ${escapeHtml(
                        lead.name
                      )},</p>
                      <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#4e453f;">
                        Thank you for registering with Puerta Dubai. Your request for the Golden Visa guide has been recorded, and your private access link is ready.
                      </p>
                      <p style="margin:0 0 26px;font-size:16px;line-height:1.8;color:#4e453f;">
                        This guide is part of a gated journey. The link below takes you to the private Golden Visa route, where you will confirm the same email address one final time before opening the guide.
                      </p>
                      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                        <tr>
                          <td align="center" style="background:#302d2d;">
                            <a href="${escapeAttribute(
                              accessLink
                            )}" style="display:inline-block;padding:15px 26px;color:#ffffff;text-decoration:none;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;">Access The Guide</a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#7a6d62;">Your submitted details</p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 26px;">
                        ${htmlSummary}
                      </table>
                      <p style="margin:0;font-size:14px;line-height:1.7;color:#7a6d62;">
                        If you did not request this access, you can ignore this email. Otherwise, keep it for your records and use the button above to continue.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
  }
}

function ensureTrailingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function escapeAttribute(input: string) {
  return escapeHtml(input)
}
