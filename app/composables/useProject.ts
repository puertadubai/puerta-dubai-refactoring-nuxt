import { computed, unref } from 'vue'

/* ======================
   Types
====================== */
export interface Project {
  slug: string

  hero: {
    title: string
    location: string
    image: string
  }

  intro: string

  amenities: {
    icon: string
    label: string
  }[][]

  highlights: {
    label: string
    value: string
  }[]

  gallery: string[]

  location: {
    title: string
    text: string
    mapImage?: string
    mapAlt?: string
    mapQuery?: string
    coords?: {
      lat: number
      lng: number
      zoom?: number
    }
  }

  investment: {
    title: string
    text: string
    ctaLabel?: string
    ctaLink?: string
  }

  previous?: string
  next?: string
}

/* ======================
   Composable
====================== */
export const useProject = (slug: string | Ref<string>) => {
  const resolvedSlug = computed(() => unref(slug))
  const { data: project, pending, error, refresh } = useFetch<Project | null>(() =>
    resolvedSlug.value ? `/api/projects/${resolvedSlug.value}` : null
  )

  return {
    project,
    pending,
    error,
    refresh
  }
}
