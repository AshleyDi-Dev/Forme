// Recommendations engine for Forme.
//
// Usage:
//   import { getRecommendations } from './recommendationsEngine'
//   const recs = getRecommendations(styleSummaryRow)
//
// Pass the style_summary row for the current user directly from Supabase.
// The function is pure — it does not fetch, mutate, or produce side effects.
// Any missing or unrecognised field returns null for that category rather
// than throwing, so it is safe to call with a partially complete summary.

import { garmentRules, colorRules, accessoryRules, hairRules } from './recommendations'

const GARMENT_CATEGORIES = ['tops', 'jackets', 'bottoms', 'dresses', 'skirts', 'outerwear']

export function getRecommendations(styleSummary = {}) {
  const {
    body_type,
    face_shape,
    color_season,
    hair_texture,
    hair_density,
    hair_porosity,
  } = styleSummary

  // ── Clothing ────────────────────────────────────────────────────
  // Each garment category is keyed by body_type. Necklines use the
  // body_type base, with face_shape applied as a modifier where one exists.
  let clothing = null
  if (body_type) {
    const faceOverride = garmentRules.necklineFaceModifiers?.[face_shape]?.[body_type]
    const necklines = faceOverride?.necklines ?? garmentRules.necklines?.[body_type] ?? null

    clothing = { necklines }
    for (const cat of GARMENT_CATEGORIES) {
      clothing[cat] = garmentRules[cat]?.[body_type] ?? null
    }
  }

  // ── Colour ──────────────────────────────────────────────────────
  const color = colorRules?.[color_season] ?? null

  // ── Accessories ─────────────────────────────────────────────────
  const accessories = accessoryRules?.[face_shape] ?? null

  // ── Hair ────────────────────────────────────────────────────────
  const hair = {
    texture:  hairRules.texture?.[hair_texture]   ?? null,
    density:  hairRules.density?.[hair_density]   ?? null,
    porosity: hairRules.porosity?.[hair_porosity] ?? null,
  }

  return { clothing, color, accessories, hair }
}
