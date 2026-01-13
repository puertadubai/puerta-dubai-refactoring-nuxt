import { supabaseRequest } from "../../../utils/supabase"

type IncomingProject = {
  slug: string
  hero_title: string
  hero_location: string
  hero_image: string
  intro: string
  location_title?: string | null
  location_text?: string | null
  location_map_image?: string | null
  location_map_alt?: string | null
  location_map_query?: string | null
  location_lat?: number | null
  location_lng?: number | null
  location_zoom?: number | null
  investment_title?: string | null
  investment_text?: string | null
  investment_cta_label?: string | null
  investment_cta_link?: string | null
  previous_slug?: string | null
  next_slug?: string | null
  highlights?: { label: string; value: string }[]
  amenities?: { icon: string; label: string; groupIndex?: number }[]
  gallery?: { imagePath: string }[]
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing id." })
  }

  const payload = (await readBody(event)) as IncomingProject

  await supabaseRequest("projects", {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    query: { id: `eq.${id}` },
    body: {
      slug: payload.slug,
      hero_title: payload.hero_title,
      hero_location: payload.hero_location,
      hero_image: payload.hero_image ?? "",
      intro: payload.intro,
      location_title: payload.location_title ?? null,
      location_text: payload.location_text ?? null,
      location_map_image: payload.location_map_image ?? null,
      location_map_alt: payload.location_map_alt ?? null,
      location_map_query: payload.location_map_query ?? null,
      location_lat: payload.location_lat ?? null,
      location_lng: payload.location_lng ?? null,
      location_zoom: payload.location_zoom ?? null,
      investment_title: payload.investment_title ?? null,
      investment_text: payload.investment_text ?? null,
      investment_cta_label: payload.investment_cta_label ?? null,
      investment_cta_link: payload.investment_cta_link ?? null,
      previous_slug: payload.previous_slug ?? null,
      next_slug: payload.next_slug ?? null
    }
  })

  await supabaseRequest("project_highlights", {
    method: "DELETE",
    query: { project_id: `eq.${id}` }
  })

  await supabaseRequest("project_amenities", {
    method: "DELETE",
    query: { project_id: `eq.${id}` }
  })

  await supabaseRequest("project_gallery", {
    method: "DELETE",
    query: { project_id: `eq.${id}` }
  })

  const highlightRows =
    payload.highlights?.map((item, index) => ({
      project_id: id,
      label: item.label,
      value: item.value,
      sort_order: index
    })) ?? []

  const amenityRows =
    payload.amenities?.map((item, index) => ({
      project_id: id,
      icon: item.icon,
      label: item.label,
      group_index: item.groupIndex ?? 0,
      sort_order: index
    })) ?? []

  const galleryRows =
    payload.gallery?.map((item, index) => ({
      project_id: id,
      image_path: item.imagePath,
      sort_order: index
    })) ?? []

  if (highlightRows.length) {
    await supabaseRequest("project_highlights", {
      method: "POST",
      body: highlightRows
    })
  }

  if (amenityRows.length) {
    await supabaseRequest("project_amenities", {
      method: "POST",
      body: amenityRows
    })
  }

  if (galleryRows.length) {
    await supabaseRequest("project_gallery", {
      method: "POST",
      body: galleryRows
    })
  }

  return { status: "ok" }
})
