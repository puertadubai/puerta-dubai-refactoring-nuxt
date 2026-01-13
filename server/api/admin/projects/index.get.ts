import { supabaseRequest } from "../../../utils/supabase"
import { mapDbProjectToAdmin } from "../../../utils/projects"

export default defineEventHandler(async () => {
  const projects = await supabaseRequest<any[]>("projects", {
    query: {
      select: "*,project_highlights(*),project_amenities(*),project_gallery(*)",
      order: "created_at.desc"
    }
  })

  return projects.map(mapDbProjectToAdmin)
})
