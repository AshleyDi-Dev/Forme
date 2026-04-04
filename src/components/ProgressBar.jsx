import styles from './ProgressBar.module.css'

/**
 * ProgressBar
 *
 * @param {number}  value       — 0 to 100
 * @param {string}  label       — optional left label (e.g. "Step 2 of 5")
 * @param {boolean} showPercent — show percentage on the right
 */
export default function ProgressBar({
  value = 0,
  label,
  showPercent = false,
}) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={styles.wrapper}>
      {(label || showPercent) && (
        <div className={styles.label}>
          {label    && <span className={styles.labelText}>{label}</span>}
          {showPercent && <span className={styles.labelText}>{clamped}%</span>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
