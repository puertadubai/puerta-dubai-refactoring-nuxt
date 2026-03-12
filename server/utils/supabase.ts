type SupabaseRequestOptions = {
  method?: string
  headers?: Record<string, string>
  query?: Record<string, string>
  body?: unknown
  responseType?: "json" | "text"
}

export const supabaseRequest = async <T>(
  path: string,
  options: SupabaseRequestOptions = {}
) => {
  const config = useRuntimeConfig()
  const baseUrl = config.supabaseUrl?.replace(/\/$/, "")

  if (!baseUrl || !config.supabaseServiceKey) {
    throw new Error("Supabase credentials are not configured.")
  }

  const headers: Record<string, string> = {
    apikey: config.supabaseServiceKey,
    Authorization: `Bearer ${config.supabaseServiceKey}`,
    ...options.headers
  }

  return await $fetch<T>(`${baseUrl}/rest/v1/${path}`, {
    method: options.method ?? "GET",
    headers,
    query: options.query,
    body: options.body,
    responseType: options.responseType ?? "json"
  })
}

export const buildPublicImageUrl = (path?: string | null) => {
  if (!path) return ""
  const config = useRuntimeConfig()
  const baseUrl = config.supabaseUrl?.replace(/\/$/, "")
  if (!baseUrl) return ""
  return `${baseUrl}/storage/v1/object/public/project-images/${path}`
}

export const buildPublicBucketImageUrl = (bucket: string, path?: string | null) => {
  if (!path) return ""
  const config = useRuntimeConfig()
  const baseUrl = config.supabaseUrl?.replace(/\/$/, "")
  if (!baseUrl) return ""
  return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`
}

export const buildPublicRenderImageUrl = (
  bucket: string,
  path?: string | null,
  width?: number
) => {
  if (!path) return ""
  const config = useRuntimeConfig()
  const baseUrl = config.supabaseUrl?.replace(/\/$/, "")
  if (!baseUrl) return ""

  const url = new URL(`${baseUrl}/storage/v1/render/image/public/${bucket}/${path}`)
  if (width) {
    url.searchParams.set("width", String(width))
  }

  return url.toString()
}
