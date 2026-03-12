import { supabaseRequest } from "../../../utils/supabase"
import { mapDbPressReleaseSummary } from "../../../utils/press-releases"

export default defineEventHandler(async () => {
  const articles = await supabaseRequest<any[]>("press_releases", {
    query: {
      select: "id,title,slug,excerpt,cover_image,category,author,published,created_at,updated_at",
      order: "created_at.desc"
    }
  })

  return articles.map(mapDbPressReleaseSummary)
})
