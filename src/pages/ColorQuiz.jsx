import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import QuizEngine from '../components/QuizEngine'
import Button from '../components/Button'
import styles from './ColorQuiz.module.css'

// ── Questions ────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'q1',
    title: 'Look at the veins on the inside of your wrist in natural light. What color are they?',
    tip: 'Check in daylight — artificial light can shift the colour.',
    guide: null,
    options: [
      { value: 'bluish_purple',  label: 'Bluish or purple — quite cool toned' },
      { value: 'greenish',       label: 'Greenish — quite warm toned' },
      { value: 'mix_veins',      label: "A mix of both — I honestly can't tell" },
    ],
  },
  {
    id: 'q2',
    title: 'When you wear white and cream next to your face, which is more flattering?',
    tip: null,
    guide: null,
    options: [
      { value: 'bright_white',  label: 'Bright white — it makes me look fresh and alive' },
      { value: 'cream_white',   label: 'Cream or off-white — bright white washes me out' },
      { value: 'both_whites',   label: 'Both work pretty well honestly' },
    ],
  },
  {
    id: 'q3',
    title: 'Think about a time you got complimented on how you look. What were you wearing?',
    tip: null,
    guide: null,
    options: [
      { value: 'cool_compliment', label: 'Something cool toned — blues, pinks, purples, or grey' },
      { value: 'warm_compliment', label: 'Something warm toned — oranges, browns, yellows, or olive' },
      { value: 'both_compliment', label: 'I honestly get compliments in both' },
    ],
  },
  {
    id: 'q4',
    title: 'How would you describe your overall coloring — skin, hair, and eyes together?',
    tip: null,
    guide: null,
    options: [
      { value: 'very_light',    label: 'Very light overall — fair skin, light hair, light eyes' },
      { value: 'medium_overall', label: "Medium — I'm not particularly light or dark" },
      { value: 'deep_overall',  label: 'Deep overall — dark skin, dark hair, dark eyes' },
      { value: 'high_contrast', label: 'I have a lot of contrast — one feature is very light and another very dark' },
    ],
  },
  {
    id: 'q5',
    title: 'What happens to your skin in the sun?',
    tip: null,
    guide: null,
    options: [
      { value: 'burns_fair',  label: "I burn easily and rarely tan — I'm quite fair" },
      { value: 'tan_golden',  label: 'I tan gradually and golden' },
      { value: 'tan_deeply',  label: 'I tan quickly and deeply — my skin gets very dark' },
      { value: 'deep_skin',   label: "I have deeper skin that rarely burns" },
    ],
  },
  {
    id: 'q6',
    title: 'How much contrast is there between your skin, hair, and eyes?',
    tip: null,
    guide: null,
    options: [
      { value: 'very_little_c', label: 'Very little — everything is similar in tone and depth' },
      { value: 'moderate_c',    label: "Moderate — there's some difference but nothing dramatic" },
      { value: 'high_c',        label: "High — there's a striking difference between my features" },
    ],
  },
  {
    id: 'q7',
    title: 'Which of these best describes how you look in bold bright colors?',
    tip: null,
    guide: null,
    options: [
      { value: 'overwhelm',   label: 'They overwhelm me — I look better in softer muted tones' },
      { value: 'suit_well',   label: 'They suit me perfectly — I can carry a bold color easily' },
      { value: 'depends_bold', label: 'Depends on the color — some bold shades work, others don\'t' },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────

const SCORE_MAP = {
  // Q1 — vein color
  bluish_purple:  { Summer: 2, Winter: 2 },
  greenish:       { Spring: 2, Autumn: 2 },
  mix_veins:      {},
  // Q2 — white vs cream
  bright_white:   { Summer: 2, Winter: 2 },
  cream_white:    { Spring: 2, Autumn: 2 },
  both_whites:    {},
  // Q3 — compliment colors
  cool_compliment: { Summer: 2, Winter: 2 },
  warm_compliment: { Spring: 2, Autumn: 2 },
  both_compliment: {},
  // Q4 — overall coloring
  very_light:     { Spring: 3, Summer: 3 },
  medium_overall: { Spring: 1, Summer: 1, Autumn: 1, Winter: 1 },
  deep_overall:   { Autumn: 2, Winter: 3 },
  high_contrast:  { Winter: 3 },
  // Q5 — sun reaction
  burns_fair:  { Spring: 2, Summer: 2 },
  tan_golden:  { Spring: 1, Autumn: 2 },
  tan_deeply:  { Autumn: 1, Winter: 2 },
  deep_skin:   { Autumn: 1, Winter: 2 },
  // Q6 — contrast between features
  very_little_c: { Summer: 2, Autumn: 2 },
  moderate_c:    { Spring: 1, Summer: 1, Autumn: 1, Winter: 1 },
  high_c:        { Winter: 3 },
  // Q7 — bold colors
  overwhelm:    { Summer: 2, Autumn: 2 },
  suit_well:    { Spring: 2, Winter: 2 },
  depends_bold: { Spring: 1, Summer: 1, Autumn: 1, Winter: 1 },
}

function calculateResult(answers) {
  const totals = { Spring: 0, Summer: 0, Autumn: 0, Winter: 0 }

  Object.values(answers).forEach(value => {
    const scores = SCORE_MAP[value] ?? {}
    Object.entries(scores).forEach(([season, pts]) => {
      totals[season] += pts
    })
  })

  return Object.entries(totals).reduce(
    (best, [season, pts]) => pts > best.pts ? { season, pts } : best,
    { season: 'Summer', pts: -1 }
  ).season
}

// ── Result content ────────────────────────────────────────────────

const RESULTS = {
  Spring: {
    label: 'Spring',
    description: "Your coloring is warm, light, and clear — the freshest of the warm seasons. You have a natural brightness that comes alive in clear, warm tones. Heavy or muted shades tend to dull your complexion, while clear warm colors make your skin look luminous.",
    palette: ['#FFBB8A', '#FF8C69', '#F5A0B5', '#FFE07A', '#7ECAC3', '#A8CB7A', '#D4956A', '#FFF0D4'],
    wear: [
      'Warm, clear tones — coral, peach, and warm salmon',
      'Golden yellows and warm ivories close to the face',
      'Clear aquas and warm teals',
      'Light warm greens — grass and lime',
    ],
    avoid: [
      'Black and very dark colours close to the face — they can look harsh',
      'Cool greys, icy pastels, and blue-based pinks',
      'Heavy, earthy, or very muted shades',
    ],
    teaser: 'True Spring or Light Spring?',
  },
  Summer: {
    label: 'Summer',
    description: "Your coloring is cool, light, and soft — the most delicate of the cool seasons. You suit muted, dusty versions of cool tones rather than anything sharp or saturated. High contrast or very bold colors tend to overwhelm your natural softness.",
    palette: ['#D4879A', '#B8A9D0', '#8CB8D4', '#A3B89A', '#C49AAB', '#B0B8C4', '#7AABB0', '#E8C4C8'],
    wear: [
      'Soft, dusty cool tones — muted rose, lavender, powder blue',
      'Cool greys and blue-greys',
      'Soft sage, muted teal, and dusty aqua',
      'Blush and soft mauves',
    ],
    avoid: [
      'Black and very sharp contrasts close to the face',
      'Warm oranges, rusts, and olive greens',
      'Bright, saturated colours — they overpower your softness',
    ],
    teaser: 'Light Summer or Soft Summer?',
  },
  Autumn: {
    label: 'Autumn',
    description: "Your coloring is warm, rich, and muted — the deepest of the warm seasons. You suit earthy, complex tones that have warmth and depth without brightness. Clear or cool colors tend to look jarring against your natural richness.",
    palette: ['#C06040', '#D4733A', '#8B7D3A', '#C47850', '#5A7840', '#9B6040', '#D4A830', '#3A7070'],
    wear: [
      'Warm earthy tones — rust, terracotta, burnt orange, and camel',
      'Olive, forest green, and warm khaki',
      'Rich browns, warm gold, and mustard',
      'Deep warm teal and muted brick red',
    ],
    avoid: [
      'Black (very dark navy or dark brown works better)',
      'Icy pastels and cool pinks or lavenders',
      'Bright, clear, or neon shades',
    ],
    teaser: 'Soft Autumn or Deep Autumn?',
  },
  Winter: {
    label: 'Winter',
    description: "Your coloring is cool, deep, and high contrast — the most striking of the cool seasons. You suit bold, clear, and saturated cool tones. Muted or warm colors can make you look washed out or muddy, while high contrast and cool clarity is your natural home.",
    palette: ['#CC2040', '#1840A8', '#0A8040', '#1A1A1A', '#FFFFFF', '#CC1880', '#F0C0D0', '#0A1870'],
    wear: [
      'Bold, clear cool tones — true red, royal blue, emerald',
      'Black and pure white — especially together',
      'Icy pastels — icy pink, icy blue, icy violet',
      'Deep jewel tones — sapphire, ruby, deep purple',
    ],
    avoid: [
      'Warm oranges, peach, and golden tones',
      'Muted or earthy colours — they dull your natural contrast',
      'Mid-tone browns and beiges next to the face',
    ],
    teaser: 'True Winter or Deep Winter?',
  },
}

// ── Palette swatch strip ──────────────────────────────────────────

function PaletteStrip({ colors }) {
  return (
    <div className={styles.paletteStrip}>
      {colors.map(hex => (
        <div
          key={hex}
          className={styles.swatch}
          style={{ backgroundColor: hex }}
          aria-label={hex}
        />
      ))}
    </div>
  )
}

// ── Upgrade teaser ────────────────────────────────────────────────

function UpgradeTeaser({ subtype }) {
  return (
    <div className={styles.teaser}>
      <p className={styles.teaserEyebrow}>Go deeper</p>
      <p className={styles.teaserHeading}>{subtype}</p>
      <p className={styles.teaserBody}>
        Your full 12-season analysis gives you a precise subtype — like <em>{subtype}</em> — with a more tailored palette and specific guidance.
      </p>
      <Button variant="ghost" disabled>
        Coming soon
      </Button>
    </div>
  )
}

// ── Result screen ─────────────────────────────────────────────────

function ResultScreen({ season, onSave, onRetake, saving, saved }) {
  const result = RESULTS[season] ?? RESULTS.Summer

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your color season</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <PaletteStrip colors={result.palette} />

        <div className={styles.guidance}>
          <div className={styles.guidanceBlock}>
            <p className={styles.guidanceHeading}>What to wear</p>
            <ul className={styles.guidanceList}>
              {result.wear.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.guidanceBlock}>
            <p className={styles.guidanceHeading}>What to avoid</p>
            <ul className={styles.guidanceList}>
              {result.avoid.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.resultActions}>
          {saved ? (
            <p className={styles.savedConfirmation} role="status">
              <span aria-hidden="true">✓</span> Result saved
            </p>
          ) : (
            <Button fullWidth loading={saving} onClick={onSave}>
              Save result
            </Button>
          )}
          <Button variant="ghost" fullWidth onClick={onRetake}>
            Retake quiz
          </Button>
          <Link to="/analyze" className={styles.backLink}>
            Back to Analyze
          </Link>
        </div>

        <UpgradeTeaser subtype={result.teaser} />

      </div>
    </div>
  )
}

function PreviousResultScreen({ season, onRetake }) {
  const result = RESULTS[season] ?? RESULTS.Summer

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your saved color season</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <PaletteStrip colors={result.palette} />

        <div className={styles.guidance}>
          <div className={styles.guidanceBlock}>
            <p className={styles.guidanceHeading}>What to wear</p>
            <ul className={styles.guidanceList}>
              {result.wear.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.guidanceBlock}>
            <p className={styles.guidanceHeading}>What to avoid</p>
            <ul className={styles.guidanceList}>
              {result.avoid.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.resultActions}>
          <Button variant="ghost" fullWidth onClick={onRetake}>
            Retake quiz
          </Button>
          <Link to="/analyze" className={styles.backLink}>
            Back to Analyze
          </Link>
        </div>

        <UpgradeTeaser subtype={result.teaser} />

      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function ColorQuiz() {
  const { user } = useAuth()

  const [loading, setLoading]         = useState(true)
  const [savedResult, setSavedResult] = useState(null)
  const [newResult, setNewResult]     = useState(null)
  const [newAnswers, setNewAnswers]   = useState(null)
  const [skipPrev, setSkipPrev]       = useState(false)
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('style_summary')
        .select('color_season')
        .eq('user_id', user.id)
        .maybeSingle()

      if (data?.color_season) setSavedResult(data.color_season)
      setLoading(false)
    }
    load()
  }, [user.id])

  function handleComplete(answers) {
    const season = calculateResult(answers)
    setNewAnswers(answers)
    setNewResult(season)
  }

  async function handleSave() {
    setSaving(true)

    const { error: attemptError } = await supabase.from('quiz_attempts').insert({
      user_id:      user.id,
      quiz_type:    'color',
      answers_json: newAnswers,
      result_json:  { season: newResult },
      is_current:   true,
    })
    if (attemptError) console.error('[ColorQuiz] quiz_attempts error:', attemptError)

    const { error: summaryError } = await supabase.from('style_summary').upsert(
      { user_id: user.id, color_season: newResult },
      { onConflict: 'user_id' }
    )
    if (summaryError) console.error('[ColorQuiz] style_summary error:', summaryError)

    setSaving(false)
    setSaved(true)
  }

  function handleRetakeFromResult() {
    setNewResult(null)
    setNewAnswers(null)
    setSaved(false)
    setSkipPrev(true)
  }

  if (loading) return null

  if (newResult) {
    return (
      <ResultScreen
        season={newResult}
        onSave={handleSave}
        onRetake={handleRetakeFromResult}
        saving={saving}
        saved={saved}
      />
    )
  }

  if (savedResult && !skipPrev) {
    return (
      <PreviousResultScreen
        season={savedResult}
        onRetake={() => setSkipPrev(true)}
      />
    )
  }

  return (
    <QuizEngine
      questions={QUESTIONS}
      onComplete={handleComplete}
    />
  )
}
