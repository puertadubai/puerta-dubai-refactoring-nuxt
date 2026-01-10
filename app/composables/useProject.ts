import { computed } from 'vue'
import projects from '~/data/projects.json'

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
export const useProject = (slug: string) => {
  const project = computed<Project | null>(() => {
    return projects.find((p: Project) => p.slug === slug) ?? null
  })

  return {
    project
  }
}
