import styles from './Divider.module.css'

/**
 * Divider
 *
 * @param {string} label — optional centred text (e.g. "or")
 */
export default function Divider({ label }) {
  return (
    <div className={styles.wrapper} role="separator">
      <div className={styles.line} />
      {label && <span className={styles.label}>{label}</span>}
      {label && <div className={styles.line} />}
    </div>
  )
}
