import { supabaseRequest } from "../../../utils/supabase"

type IncomingPressRelease = {
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  cover_image?: string | null
  category?: string | null
  author?: string | null
  published?: boolean | null
}

export default defineEventHandler(async (event) => {
  const payload = (await readBody(event)) as IncomingPressRelease

  if (!payload?.title || !payload?.slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields." })
  }

  const timestamp = new Date().toISOString()

  const rows = await supabaseRequest<any[]>("press_releases", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt ?? "",
      content: payload.content ?? "",
      cover_image: payload.cover_image ?? "",
      category: payload.category ?? "",
      author: payload.author ?? "",
      published: Boolean(payload.published),
      created_at: timestamp,
      updated_at: timestamp
    }
  })

  const article = rows[0]
  if (!article?.id) {
    throw createError({ statusCode: 500, statusMessage: "Failed to create article." })
  }

  return { id: article.id }
})
