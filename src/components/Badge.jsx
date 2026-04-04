import styles from './Badge.module.css'

/**
 * Badge
 *
 * @param {'body'|'face'|'hair'|'color'|'neutral'} variant
 * @param {React.ReactNode} children
 */
export default function Badge({
  variant = 'neutral',
  children,
  className = '',
  ...props
}) {
  const classes = [
    styles.badge,
    styles[variant] ?? styles.neutral,
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
