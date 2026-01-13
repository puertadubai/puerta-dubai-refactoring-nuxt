import { buildPublicImageUrl } from "./supabase"

type DbHighlight = {
  label: string
  value: string
  sort_order?: number | null
}

type DbAmenity = {
  icon: string
  label: string
  group_index?: number | null
  sort_order?: number | null
}

type DbGalleryImage = {
  image_path: string
  sort_order?: number | null
}

type DbProject = {
  id: string
  slug: string
  hero_title: string
  hero_location: string
  hero_image: string
  intro: string
  location_title: string | null
  location_text: string | null
  location_map_image: string | null
  location_map_alt: string | null
  location_map_query: string | null
  location_lat: number | null
  location_lng: number | null
  location_zoom: number | null
  investment_title: string | null
  investment_text: string | null
  investment_cta_label: string | null
  investment_cta_link: string | null
  previous_slug: string | null
  next_slug: string | null
  project_highlights?: DbHighlight[]
  project_amenities?: DbAmenity[]
  project_gallery?: DbGalleryImage[]
}

const sortByOrder = <T extends { sort_order?: number | null }>(items: T[]) =>
  items.slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

const sortAmenities = (items: DbAmenity[]) =>
  items
    .slice()
    .sort(
      (a, b) =>
        (a.group_index ?? 0) - (b.group_index ?? 0) ||
        (a.sort_order ?? 0) - (b.sort_order ?? 0)
    )

const groupAmenities = (items: DbAmenity[]) => {
  const grouped: { icon: string; label: string }[][] = []
  sortAmenities(items).forEach((item) => {
    const groupIndex = Math.max(0, item.group_index ?? 0)
    if (!grouped[groupIndex]) grouped[groupIndex] = []
    grouped[groupIndex].push({ icon: item.icon, label: item.label })
  })
  return grouped.filter(Boolean)
}

export const mapDbProjectToPublic = (project: DbProject) => {
  const highlights = sortByOrder(project.project_highlights ?? []).map((item) => ({
    label: item.label,
    value: item.value
  }))

  const gallery = sortByOrder(project.project_gallery ?? []).map((item) =>
    buildPublicImageUrl(item.image_path)
  )

  const coords =
    project.location_lat != null && project.location_lng != null
      ? {
          lat: project.location_lat,
          lng: project.location_lng,
          zoom: project.location_zoom ?? undefined
        }
      : undefined

  return {
    slug: project.slug,
    hero: {
      title: project.hero_title,
      location: project.hero_location,
      image: buildPublicImageUrl(project.hero_image)
    },
    intro: project.intro,
    amenities: groupAmenities(project.project_amenities ?? []),
    highlights,
    gallery,
    location: {
      title: project.location_title ?? "",
      text: project.location_text ?? "",
      mapImage: project.location_map_image
        ? buildPublicImageUrl(project.location_map_image)
        : undefined,
      mapAlt: project.location_map_alt ?? undefined,
      mapQuery: project.location_map_query ?? undefined,
      coords
    },
    investment: {
      title: project.investment_title ?? "",
      text: project.investment_text ?? "",
      ctaLabel: project.investment_cta_label ?? undefined,
      ctaLink: project.investment_cta_link ?? undefined
    },
    previous: project.previous_slug ?? undefined,
    next: project.next_slug ?? undefined
  }
}

export const mapDbProjectToAdmin = (project: DbProject) => {
  const highlights = sortByOrder(project.project_highlights ?? []).map((item) => ({
    label: item.label,
    value: item.value
  }))

  const amenities = sortAmenities(project.project_amenities ?? []).map((item) => ({
    icon: item.icon,
    label: item.label,
    groupIndex: item.group_index ?? 0
  }))

  const gallery = sortByOrder(project.project_gallery ?? []).map((item) => ({
    imagePath: item.image_path,
    imageUrl: buildPublicImageUrl(item.image_path)
  }))

  return {
    id: project.id,
    slug: project.slug,
    hero: {
      title: project.hero_title,
      location: project.hero_location,
      imagePath: project.hero_image,
      imageUrl: buildPublicImageUrl(project.hero_image)
    },
    intro: project.intro,
    amenities,
    highlights,
    gallery,
    location: {
      title: project.location_title ?? "",
      text: project.location_text ?? "",
      mapImagePath: project.location_map_image ?? "",
      mapImageUrl: project.location_map_image
        ? buildPublicImageUrl(project.location_map_image)
        : "",
      mapAlt: project.location_map_alt ?? "",
      mapQuery: project.location_map_query ?? "",
      lat: project.location_lat ?? null,
      lng: project.location_lng ?? null,
      zoom: project.location_zoom ?? null
    },
    investment: {
      title: project.investment_title ?? "",
      text: project.investment_text ?? "",
      ctaLabel: project.investment_cta_label ?? "",
      ctaLink: project.investment_cta_link ?? ""
    },
    previous: project.previous_slug ?? "",
    next: project.next_slug ?? ""
  }
}
