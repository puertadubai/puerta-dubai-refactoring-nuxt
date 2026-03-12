import { supabaseRequest } from "../../../utils/supabase"
import { mapDbPressReleaseDetail } from "../../../utils/press-releases"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing id." })
  }

  const rows = await supabaseRequest<any[]>("press_releases", {
    query: {
      select:
        "id,title,slug,excerpt,content,cover_image,category,author,published,created_at,updated_at",
      id: `eq.${id}`,
      limit: "1"
    }
  })

  if (!rows.length) {
    throw createError({ statusCode: 404, statusMessage: "Article not found." })
  }

  return mapDbPressReleaseDetail(rows[0])
})
