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
  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file payload." })
  }

  const maxSize = 2 * 1024 * 1024
  if (filePart.data.byteLength > maxSize) {
    throw createError({ statusCode: 400, statusMessage: "File exceeds 2MB." })
  }

  const isWebp =
    filePart.type === "image/webp" || filePart.filename.toLowerCase().endsWith(".webp")
  if (!isWebp) {
    throw createError({ statusCode: 400, statusMessage: "Only .webp images are allowed." })
  }

  const filename = filePart.filename.replace(/[^a-zA-Z0-9._-]/g, "_")

  await $fetch(`${baseUrl}/storage/v1/object/press-images/${filename}`, {
    method: "POST",
    headers: {
      apikey: config.supabaseServiceKey,
      Authorization: `Bearer ${config.supabaseServiceKey}`,
      "Content-Type": "image/webp",
      "x-upsert": "true"
    },
    body: filePart.data
  })

  return {
    filename,
    url: `${baseUrl}/storage/v1/render/image/public/press-images/${filename}?width=900`
  }
})
