type PressImageSize = "hero" | "card" | "thumbnail"

const PRESS_IMAGE_WIDTHS: Record<PressImageSize, number> = {
  hero: 1800,
  card: 900,
  thumbnail: 400
}

export const usePressImage = () => {
  const config = useRuntimeConfig()

  const encodePath = (value: string) =>
    value
      .split("/")
      .filter(Boolean)
      .map((segment) => {
        try {
          return encodeURIComponent(decodeURIComponent(segment))
        } catch {
          return encodeURIComponent(segment)
        }
      })
      .join("/")

  const extractPressImagePath = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return ""

    if (/^https?:\/\//i.test(trimmed)) {
      try {
        const parsed = new URL(trimmed)
        const objectPrefix = "/storage/v1/object/public/press-images/"
        const renderPrefix = "/storage/v1/render/image/public/press-images/"

        if (parsed.pathname.startsWith(objectPrefix)) {
          return parsed.pathname.slice(objectPrefix.length)
        }
        if (parsed.pathname.startsWith(renderPrefix)) {
          return parsed.pathname.slice(renderPrefix.length)
        }

        return trimmed
      } catch {
        return trimmed
      }
    }

    const withoutBucketPrefix = trimmed.replace(/^press-images\//, "")
    return withoutBucketPrefix.replace(/^\/+/, "")
  }

  const getPressImageUrl = (
    filename?: string | null,
    size: PressImageSize | number = "card"
  ) => {
    if (!filename) return ""

    const baseUrl = config.public.supabaseUrl?.replace(/\/$/, "")
    if (!baseUrl) return ""

    const width = typeof size === "number" ? size : PRESS_IMAGE_WIDTHS[size]
    const extractedPath = extractPressImagePath(filename)
    if (!extractedPath) return ""

    if (/^https?:\/\//i.test(extractedPath)) return extractedPath

    const encodedFilename = encodePath(extractedPath)
    const useImageTransform = Boolean(config.public.supabaseUseImageTransform)

    if (useImageTransform) {
      return `${baseUrl}/storage/v1/render/image/public/press-images/${encodedFilename}?width=${width}`
    }

    return `${baseUrl}/storage/v1/object/public/press-images/${encodedFilename}`
  }

  return {
    getPressImageUrl
  }
}
