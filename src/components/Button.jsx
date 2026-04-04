import styles from './Button.module.css'

/**
 * Button
 *
 * @param {'primary' | 'ghost' | 'destructive'} variant
 * @param {boolean} fullWidth
 * @param {boolean} loading
 * @param {boolean} disabled
 * @param {React.ReactNode} children
 */
export default function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  )
}
