import { Link } from 'react-router-dom'
import Button from '../components/Button'
import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.wordmark}>GlowUp</p>

        <div className={styles.hero}>
          <h1 className={styles.headline}>
            Learn what works for your body — and wear it with confidence.
          </h1>
          <p className={styles.supporting}>
            Understand your features, find your fit, and build a wardrobe that actually makes sense.
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/signup">
            <Button fullWidth>Get started</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" fullWidth>Already have an account? Log in</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
