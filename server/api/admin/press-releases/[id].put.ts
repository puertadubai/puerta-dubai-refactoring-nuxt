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
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing id." })
  }

  const payload = (await readBody(event)) as IncomingPressRelease

  if (!payload?.title || !payload?.slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields." })
  }

  await supabaseRequest("press_releases", {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    query: { id: `eq.${id}` },
    body: {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt ?? "",
      content: payload.content ?? "",
      cover_image: payload.cover_image ?? "",
      category: payload.category ?? "",
      author: payload.author ?? "",
      published: Boolean(payload.published),
      updated_at: new Date().toISOString()
    }
  })

  return { status: "ok" }
})
