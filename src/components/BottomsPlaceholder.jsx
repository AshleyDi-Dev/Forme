import styles from './ImagePlaceholder.module.css'

// Import all bottoms illustrations — replace with real assets as they are sourced.
// Naming convention: Bottoms-{BodyType}-{1|2|3}.png
// Falls back to dashed placeholder if asset doesn't exist yet.

const bottomsAssets = {
  'Hourglass':         [null, null, null],
  'Pear':              [null, null, null],
  'Apple':             [null, null, null],
  'Rectangle':         [null, null, null],
  'Inverted Triangle': [null, null, null],
}

export default function BottomsPlaceholder({ bodyType }) {
  const images = bottomsAssets[bodyType] ?? [null, null, null]

  return (
    <div className={styles.rowThree}>
      {images.map((src, i) => (
        src
          ? <div key={i} className={styles.boxFilled}>
              <img src={src} alt={`${bodyType} bottoms example ${i + 1}`} className={styles.image} />
            </div>
          : <div key={i} className={styles.box}>
              <span className={styles.label}>Image coming soon</span>
            </div>
      ))}
    </div>
  )
}
