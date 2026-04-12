import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecommendations } from '../hooks/useRecommendations'
import styles from './Recommendations.module.css'

// ── Chevron icon ──────────────────────────────────────────────────

function Chevron({ open }) {
  return (
    <svg
      className={`${styles.cardChevron} ${open ? styles.cardChevronOpen : ''}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Shared primitives ─────────────────────────────────────────────

function ChipRow({ items }) {
  if (!items?.length) return null
  return (
    <div className={styles.chipRow}>
      {items.map((item, i) => (
        <span key={i} className={styles.chip}>{item}</span>
      ))}
    </div>
  )
}

function LabelledChips({ label, items }) {
  if (!items?.length) return null
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>{label}</p>
      <ChipRow items={items} />
    </div>
  )
}

function AvoidBlock({ items }) {
  if (!items?.length) return null
  return (
    <div className={styles.avoidBlock}>
      <p className={styles.avoidLabel}>May be worth avoiding</p>
      <ul className={styles.avoidList}>
        {items.map((item, i) => (
          <li key={i} className={styles.avoidItem}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function EmptyState({ message, quizPath, quizLabel }) {
  return (
    <div className={styles.emptySection}>
      <p className={styles.emptyText}>{message}</p>
      <Link to={quizPath} className={styles.emptyLink}>{quizLabel}</Link>
    </div>
  )
}

// ── Accordion card ────────────────────────────────────────────────

function Card({ eyebrow, title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.section}>
      <button
        className={`${styles.cardHeader} ${open ? styles.cardHeaderOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className={styles.cardHeaderText}>
          {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
          <span className={styles.sectionTitle}>{title}</span>
        </div>
        <Chevron open={open} />
      </button>
      {open && (
        <div className={styles.cardBody}>
          {children}
        </div>
      )}
    </div>
  )
}

// ── Garment cards ─────────────────────────────────────────────────

const GARMENT_NULL_MSG = 'Complete the body proportions quiz to unlock this category.'

function GarmentCard({ label, data }) {
  return (
    <Card eyebrow="Clothing" title={label}>
      {data ? (
        <>
          <ChipRow items={data.whatWorks} />
          <AvoidBlock items={data.avoid} />
        </>
      ) : (
        <EmptyState message={GARMENT_NULL_MSG} quizPath="/analyze/body" quizLabel="Take the body quiz" />
      )}
    </Card>
  )
}

function NecklinesCard({ necklines }) {
  return (
    <Card eyebrow="Clothing" title="Necklines">
      {necklines ? (
        <ChipRow items={necklines} />
      ) : (
        <EmptyState message={GARMENT_NULL_MSG} quizPath="/analyze/body" quizLabel="Take the body quiz" />
      )}
    </Card>
  )
}

// ── Haircuts card ─────────────────────────────────────────────────

function HaircutsCard({ haircuts }) {
  return (
    <Card eyebrow="Hair" title="Haircuts">
      {haircuts ? (
        <>
          <ChipRow items={haircuts.whatWorks} />
          <AvoidBlock items={haircuts.avoid} />
          {haircuts.textureNote && (
            <p className={styles.patternNote}>{haircuts.textureNote}</p>
          )}
        </>
      ) : (
        <EmptyState
          message="Complete the face shape quiz to unlock haircut recommendations."
          quizPath="/analyze/face"
          quizLabel="Take the face quiz"
        />
      )}
    </Card>
  )
}

// ── Hair info card ────────────────────────────────────────────────

function HairSubsection({ title, data }) {
  if (!data) return null
  return (
    <div className={styles.hairSubsection}>
      <p className={styles.subsectionTitle}>{title}</p>
      <p className={styles.whyText}>{data.why}</p>
      <ChipRow items={data.whatWorks} />
      <LabelledChips label="Product types to look for" items={data.productTypes} />
      {data.routineNote && (
        <p className={styles.patternNote}>{data.routineNote}</p>
      )}
      <AvoidBlock items={data.avoid} />
    </div>
  )
}

function HairInfoCard({ hair }) {
  const subsections = [
    { key: 'texture',  title: 'Texture',  data: hair?.texture },
    { key: 'density',  title: 'Density',  data: hair?.density },
    { key: 'porosity', title: 'Porosity', data: hair?.porosity },
  ].filter(s => s.data)

  return (
    <Card eyebrow="Hair" title="Hair info">
      {subsections.length > 0 ? (
        subsections.map((s, i) => (
          <div key={s.key}>
            {i > 0 && <div className={styles.subsectionDivider} />}
            <HairSubsection title={s.title} data={s.data} />
          </div>
        ))
      ) : (
        <EmptyState
          message="Complete the hair quiz to unlock personalised hair recommendations."
          quizPath="/analyze/hair"
          quizLabel="Take the hair quiz"
        />
      )}
    </Card>
  )
}

// ── Accessories card ──────────────────────────────────────────────

function AccessoriesCard({ accessories }) {
  return (
    <Card eyebrow="Accessories" title="Finishing touches">
      {accessories ? (
        <>
          <p className={styles.whyText}>{accessories.why}</p>
          <div className={styles.group}>
            <p className={styles.groupLabel}>Earrings</p>
            <ChipRow items={accessories.earrings} />
            {accessories.earringsAvoid?.length > 0 && (
              <div className={styles.avoidInline}>
                {accessories.earringsAvoid.map((item, i) => (
                  <p key={i} className={styles.avoidInlineText}>{item}</p>
                ))}
              </div>
            )}
          </div>
          <LabelledChips label="Necklace length" items={accessories.necklaceLength} />
          <div className={styles.group}>
            <p className={styles.groupLabel}>Glasses frames</p>
            <ChipRow items={accessories.glassesFrames} />
            {accessories.glassesAvoid && (
              <p className={styles.avoidInlineText}>{accessories.glassesAvoid}</p>
            )}
          </div>
          <LabelledChips label="Hat styles" items={accessories.hatStyles} />
        </>
      ) : (
        <EmptyState
          message="Complete the face shape quiz to unlock accessory recommendations."
          quizPath="/analyze/face"
          quizLabel="Take the face quiz"
        />
      )}
    </Card>
  )
}

// ── Colour card ───────────────────────────────────────────────────

function SwatchGrid({ swatches, small = false }) {
  if (!swatches?.length) return null
  return (
    <div className={styles.swatchGrid}>
      {swatches.map(({ name, hex }) => (
        <div key={hex} className={small ? styles.swatchItemSm : styles.swatchItem}>
          <div
            className={small ? styles.swatchColorSm : styles.swatchColor}
            style={{ background: hex }}
            title={hex}
            aria-label={name}
            role="img"
          />
          <span className={styles.swatchName}>{name}</span>
        </div>
      ))}
    </div>
  )
}

function ColourCard({ color }) {
  return (
    <Card eyebrow="Colour" title="Your palette">
      {color ? (
        <>
          <p className={styles.whyText}>{color.why}</p>
          <SwatchGrid swatches={color.paletteHero} />
          <div className={styles.group}>
            <p className={styles.groupLabel}>Your neutrals</p>
            <SwatchGrid swatches={color.neutrals} small />
          </div>
          {color.patternGuidance && (
            <p className={styles.patternNote}>{color.patternGuidance}</p>
          )}
          <LabelledChips label="Metals" items={color.metals} />
          <AvoidBlock items={color.avoid} />
          {color.upgradeTeaser && (
            <div className={styles.teaser}>
              <p className={styles.teaserText}>{color.upgradeTeaser}</p>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          message="Complete the colour analysis quiz to unlock your personal palette."
          quizPath="/analyze/color"
          quizLabel="Take the colour quiz"
        />
      )}
    </Card>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function Recommendations() {
  const { recommendations, loading, error } = useRecommendations()

  if (loading) return null

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.errorText}>
            Something went wrong loading your recommendations. Please try again.
          </p>
        </div>
      </div>
    )
  }

  const { garments, color, accessories, hair, haircuts } = recommendations ?? {}

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <p className={styles.pageEyebrow}>Your style report</p>
          <h1 className={styles.pageHeading}>Recommendations</h1>
          <p className={styles.pageSubheading}>
            Personalised guidance based on your completed quizzes.
          </p>
        </div>

        {/* ── Group 1: Clothing ── */}
        <div className={styles.groupSection}>
          <h2 className={styles.groupHeading}>Clothing</h2>
          <div className={styles.cardGrid}>
            <GarmentCard  label="Tops"      data={garments?.tops}      />
            <GarmentCard  label="Jackets"   data={garments?.jackets}   />
            <GarmentCard  label="Bottoms"   data={garments?.bottoms}   />
            <GarmentCard  label="Dresses"   data={garments?.dresses}   />
            <GarmentCard  label="Skirts"    data={garments?.skirts}    />
            <GarmentCard  label="Outerwear" data={garments?.outerwear} />
            <NecklinesCard necklines={garments?.necklines} />
          </div>
        </div>

        {/* ── Group 2: Hair & Accessories ── */}
        <div className={styles.groupSection}>
          <h2 className={styles.groupHeading}>Hair &amp; Accessories</h2>
          <div className={styles.cardGrid}>
            <HaircutsCard    haircuts={haircuts}       />
            <HairInfoCard    hair={hair}               />
            <AccessoriesCard accessories={accessories} />
          </div>
        </div>

        {/* ── Group 3: Colour ── */}
        <div className={styles.groupSection}>
          <h2 className={styles.groupHeading}>Colour</h2>
          <div className={styles.cardGrid}>
            <ColourCard color={color} />
          </div>
        </div>

        {/* ── Coming soon ── */}
        <div className={styles.comingSoonCard}>
          <p className={styles.comingSoonEyebrow}>Coming soon</p>
          <p className={styles.comingSoonTitle}>Your glow-up plan</p>
          <p className={styles.comingSoonBody}>
            Your best options across clothing, colour, and hair — all in one place.
          </p>
        </div>

      </div>
    </div>
  )
}
