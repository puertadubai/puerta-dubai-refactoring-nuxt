import { supabaseRequest } from "../../utils/supabase"
import { mapDbPressReleaseDetail } from "../../utils/press-releases"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing slug." })
  }

  const rows = await supabaseRequest<any[]>("press_releases", {
    query: {
      select:
        "id,title,slug,excerpt,content,cover_image,category,author,published,created_at,updated_at",
      slug: `eq.${slug}`,
      published: "eq.true",
      limit: "1"
    }
  })

  if (!rows.length) {
    throw createError({ statusCode: 404, statusMessage: "Article not found." })
  }

  return mapDbPressReleaseDetail(rows[0])
})
