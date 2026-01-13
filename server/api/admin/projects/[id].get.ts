import { supabaseRequest } from "../../../utils/supabase"
import { mapDbProjectToAdmin } from "../../../utils/projects"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing id." })
  }

  const rows = await supabaseRequest<any[]>("projects", {
    query: {
      select: "*,project_highlights(*),project_amenities(*),project_gallery(*)",
      id: `eq.${id}`,
      limit: "1"
    }
  })

  if (!rows.length) {
    throw createError({ statusCode: 404, statusMessage: "Project not found." })
  }

  return mapDbProjectToAdmin(rows[0])
})
