import { supabaseRequest } from "../../../utils/supabase"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing id." })
  }

  await supabaseRequest("press_releases", {
    method: "DELETE",
    query: { id: `eq.${id}` }
  })

  return { status: "deleted" }
})
