import { supabaseRequest } from "../../utils/supabase"
import { mapDbProjectToPublic } from "../../utils/projects"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing slug." })
  }

  const rows = await supabaseRequest<any[]>("projects", {
    query: {
      select: "*,project_highlights(*),project_amenities(*),project_gallery(*)",
      slug: `eq.${slug}`,
      limit: "1"
    }
  })

  if (!rows.length) {
    throw createError({ statusCode: 404, statusMessage: "Project not found." })
  }

  return mapDbProjectToPublic(rows[0])
})
