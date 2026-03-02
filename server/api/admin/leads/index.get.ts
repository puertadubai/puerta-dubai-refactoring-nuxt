import { supabaseRequest } from "../../../utils/supabase"

export default defineEventHandler(async () => {
  const leads = await supabaseRequest<any[]>("leads", {
    query: {
      select:
        "id,name,email,whatsapp,country,interest,notes,utm_source,utm_medium,utm_campaign,created_at",
      order: "created_at.desc",
      limit: "200"
    }
  })

  return leads
})
