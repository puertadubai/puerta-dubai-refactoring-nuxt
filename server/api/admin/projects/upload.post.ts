export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.supabaseUrl?.replace(/\/$/, "")

  if (!baseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: "Supabase not configured." })
  }

  const parts = await readMultipartFormData(event)
  if (!parts) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded." })
  }

  const filePart = parts.find((part) => part.name === "file")
  const folderPart = parts.find((part) => part.name === "folder")
  const folder = folderPart?.data?.toString().trim() || "projects"

  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file payload." })
  }

  const safeName = filePart.filename.replace(/[^a-zA-Z0-9._-]/g, "_")
  const path = `${folder}/${Date.now()}-${safeName}`

  await $fetch(`${baseUrl}/storage/v1/object/project-images/${path}`, {
    method: "POST",
    headers: {
      apikey: config.supabaseServiceKey,
      Authorization: `Bearer ${config.supabaseServiceKey}`,
      "Content-Type": filePart.type || "application/octet-stream",
      "x-upsert": "true"
    },
    body: filePart.data
  })

  return {
    path,
    url: `${baseUrl}/storage/v1/object/public/project-images/${path}`
  }
})
