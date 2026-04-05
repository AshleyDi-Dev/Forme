import styles from './HairGuide.module.css'

const TEXTURES = [
  {
    label: 'Straight',
    paths: [
      'M 12 4 L 12 56',
      'M 24 4 L 24 56',
      'M 36 4 L 36 56',
    ],
  },
  {
    label: 'Wavy',
    paths: [
      'M 10 4 C 18 14 2 26 10 36 C 18 46 2 52 10 58',
      'M 24 4 C 32 14 16 26 24 36 C 32 46 16 52 24 58',
      'M 38 4 C 46 14 30 26 38 36 C 46 46 30 52 38 58',
    ],
  },
  {
    label: 'Curly',
    paths: [
      'M 14 4 C 26 4 30 14 22 20 C 14 26 10 36 18 42 C 26 48 26 54 18 58',
      'M 34 4 C 46 4 46 14 38 20 C 30 26 26 36 34 42 C 42 48 40 54 34 58',
    ],
  },
  {
    label: 'Coily',
    paths: [
      'M 10 4 L 22 11 L 10 18 L 22 25 L 10 32 L 22 39 L 10 46 L 22 53',
      'M 30 4 L 42 11 L 30 18 L 42 25 L 30 32 L 42 39 L 30 46 L 42 53',
    ],
  },
]

export function HairTextureGuide() {
  return (
    <div className={styles.guideRow}>
      {TEXTURES.map(({ label, paths }) => (
        <div key={label} className={styles.shapeItem}>
          <svg
            viewBox="0 0 48 60"
            className={styles.shapeSvg}
            aria-hidden="true"
          >
            {paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </svg>
          <span className={styles.shapeLabel}>{label}</span>
        </div>
      ))}
    </div>
  )
}
