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

import { clothingRules, colorRules, accessoryRules, hairRules } from './recommendations'

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
  // Base rule comes from body_type. If a face modifier exists for this
  // face_shape + body_type combination, override only the necklines field.
  let clothing = null
  const baseClothing = clothingRules.bodyTypes?.[body_type]
  if (baseClothing) {
    const faceOverride = clothingRules.faceModifiers?.[face_shape]?.[body_type]
    clothing = faceOverride
      ? { ...baseClothing, necklines: faceOverride.necklines }
      : { ...baseClothing }
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
