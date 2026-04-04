import styles from './SelectionCard.module.css'

/**
 * SelectionCard
 *
 * @param {string}          label      — answer text
 * @param {boolean}         selected
 * @param {function}        onSelect
 * @param {string}          imageSrc   — optional image
 * @param {string}          imageAlt
 * @param {React.ReactNode} icon       — optional icon/emoji if no image
 */
export default function SelectionCard({
  label,
  selected = false,
  onSelect,
  imageSrc,
  imageAlt = '',
  icon,
  className = '',
  ...props
}) {
  const classes = [
    styles.card,
    selected ? styles.selected : '',
    className,
  ].filter(Boolean).join(' ')

  const hasMedia = imageSrc || icon

  return (
    <button
      type="button"
      className={classes}
      onClick={onSelect}
      aria-pressed={selected}
      {...props}
    >
      {hasMedia && (
        <div className={styles.media}>
          {imageSrc
            ? <img src={imageSrc} alt={imageAlt} />
            : <span className={styles.icon} aria-hidden="true">{icon}</span>
          }
        </div>
      )}

      <span className={styles.label}>{label}</span>

      <div className={styles.check} aria-hidden="true">
        <svg className={styles.checkMark} viewBox="0 0 10 10">
          <polyline points="1.5,5 4,7.5 8.5,2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}
