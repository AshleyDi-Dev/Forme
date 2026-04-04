import styles from './Card.module.css'

const padClass = {
  none: styles.padNone,
  sm:   styles.padSm,
  md:   styles.padMd,
  lg:   styles.padLg,
  xl:   styles.padXl,
}

/**
 * Card
 *
 * @param {boolean}                          clickable — renders as <button>, adds hover state
 * @param {'none'|'sm'|'md'|'lg'|'xl'}      padding
 * @param {React.ReactNode}                  children
 * @param {function}                         onClick   — required when clickable
 */
export default function Card({
  clickable = false,
  padding = 'lg',
  children,
  className = '',
  onClick,
  ...props
}) {
  const classes = [
    styles.card,
    clickable ? styles.clickable : '',
    padClass[padding] ?? styles.padLg,
    className,
  ].filter(Boolean).join(' ')

  if (clickable) {
    return (
      <button className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    )
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
