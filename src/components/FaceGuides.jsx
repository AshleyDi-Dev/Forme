import styles from './FaceGuides.module.css'

// Simple outline face shapes for Q1 and Q5 visual guides.
// 40×56 viewBox. Stroke only, no fill — editorial/minimal.

const SHAPES = {
  oval: {
    label: 'Cheekbones widest',
    d: 'M 20 3 C 31 3 37 13 37 28 C 37 43 31 53 20 53 C 9 53 3 43 3 28 C 3 13 9 3 20 3 Z',
    widthY: 28,
  },
  heart: {
    label: 'Forehead widest',
    d: 'M 20 50 C 10 36 3 24 3 15 C 3 8 8 3 13 3 C 16 3 20 6 20 6 C 20 6 24 3 27 3 C 32 3 37 8 37 15 C 37 24 30 36 20 50 Z',
    widthY: 9,
  },
  oblong: {
    label: 'Same width throughout',
    d: 'M 9 3 C 5 3 3 5 3 9 L 3 47 C 3 51 5 53 9 53 L 31 53 C 35 53 37 51 37 47 L 37 9 C 37 5 35 3 31 3 Z',
    widthY: 28,
  },
  square: {
    label: 'Jaw widest',
    d: 'M 5 5 C 5 5 20 3 35 5 L 37 40 C 33 50 27 54 20 54 C 13 54 7 50 3 40 Z',
    widthY: 44,
  },
  diamond: {
    label: 'Balanced / hard to tell',
    d: 'M 20 3 C 26 3 37 13 37 28 C 37 43 26 53 20 53 C 14 53 3 43 3 28 C 3 13 14 3 20 3 Z',
    widthY: 28,
  },
}

export function Q1Guide() {
  return (
    <div className={styles.guideRow}>
      {Object.values(SHAPES).map(({ label, d, widthY }) => (
        <div key={label} className={styles.shapeItem}>
          <svg
            viewBox="0 0 40 56"
            className={styles.shapeSvg}
            aria-hidden="true"
          >
            <path d={d} />
            {/* Width indicator line */}
            <line
              x1="3" y1={widthY}
              x2="37" y2={widthY}
              className={styles.widthLine}
            />
          </svg>
          <span className={styles.shapeLabel}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// Q5 — cheekbone height guide
const CHEEKBONE_POSITIONS = [
  { label: 'High', dotY: 16 },
  { label: 'Average', dotY: 26 },
  { label: 'Not prominent', dotY: null },
  { label: 'Wide, not high', dotY: 28 },
]

const FACE_PATH = 'M 20 3 C 31 3 37 13 37 28 C 37 43 31 53 20 53 C 9 53 3 43 3 28 C 3 13 9 3 20 3 Z'

export function Q5Guide() {
  return (
    <div className={styles.guideRow}>
      {CHEEKBONE_POSITIONS.map(({ label, dotY }) => (
        <div key={label} className={styles.shapeItem}>
          <svg
            viewBox="0 0 40 56"
            className={styles.shapeSvg}
            aria-hidden="true"
          >
            <path d={FACE_PATH} />
            {dotY !== null && (
              <>
                <circle cx="10" cy={dotY} r="2.5" className={styles.dot} />
                <circle cx="30" cy={dotY} r="2.5" className={styles.dot} />
              </>
            )}
          </svg>
          <span className={styles.shapeLabel}>{label}</span>
        </div>
      ))}
    </div>
  )
}
