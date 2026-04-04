import { useNavigate } from 'react-router-dom'
import styles from './PageHeader.module.css'

/**
 * PageHeader
 *
 * @param {string}          title
 * @param {string}          subtitle       — optional secondary line
 * @param {boolean|string}  back           — true = navigate(-1), string = navigate to that path
 * @param {React.ReactNode} rightAction    — optional slot for a button or icon
 */
export default function PageHeader({
  title,
  subtitle,
  back,
  rightAction,
}) {
  const navigate = useNavigate()

  function handleBack() {
    if (typeof back === 'string') {
      navigate(back)
    } else {
      navigate(-1)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {back !== undefined && (
          <button className={styles.backButton} onClick={handleBack} aria-label="Go back">
            <svg className={styles.backArrow} viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        )}
      </div>

      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.right}>
        {rightAction}
      </div>
    </header>
  )
}
