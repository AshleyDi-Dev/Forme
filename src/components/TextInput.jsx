import styles from './TextInput.module.css'

/**
 * TextInput
 *
 * @param {string}  label
 * @param {string}  error      — error message, triggers error state
 * @param {string}  success    — success message, triggers success state
 * @param {string}  helperText — neutral supporting text
 * @param {boolean} disabled
 */
export default function TextInput({
  label,
  error,
  success,
  helperText,
  disabled = false,
  id,
  className = '',
  ...props
}) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  const inputClass = [
    styles.input,
    error   ? styles.inputError   : '',
    success ? styles.inputSuccess : '',
    className,
  ].filter(Boolean).join(' ')

  const subText = error ?? success ?? helperText

  const subTextClass = [
    styles.helperText,
    error   ? styles.errorText   : '',
    success ? styles.successText : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClass}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={subText ? `${inputId}-hint` : undefined}
        {...props}
      />
      {subText && (
        <p id={`${inputId}-hint`} className={subTextClass}>
          {subText}
        </p>
      )}
    </div>
  )
}
