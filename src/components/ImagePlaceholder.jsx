import hourglassIllustration from '../assets/Hourglass-Illustration.png'
import styles from './ImagePlaceholder.module.css'

const ILLUSTRATIONS = {
  'Hourglass': hourglassIllustration,
}

export default function ImagePlaceholder({ result }) {
  const illustration = result ? ILLUSTRATIONS[result] : null

  return (
    <div className={styles.row}>
      {illustration ? (
        <div className={styles.boxFilled}>
          <img src={illustration} alt={result} className={styles.image} />
        </div>
      ) : (
        <div className={styles.box}>
          <span className={styles.label}>Image coming soon</span>
        </div>
      )}
      <div className={styles.box}>
        <span className={styles.label}>Image coming soon</span>
      </div>
    </div>
  )
}
