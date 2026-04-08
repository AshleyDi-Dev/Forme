import { Link } from 'react-router-dom'
import Button from '../components/Button'
import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <p className={styles.wordmark}>Forme</p>

        <div className={styles.hero}>
          <h1 className={styles.headline}>
            Learn what works for your body — and wear it with confidence.
          </h1>
          <p className={styles.supporting}>
            Find your proportions, face shape, hair profile, and best colors — then turn that
            into styling guidance that actually makes sense for you.
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/signup">
            <Button fullWidth>Get started</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" fullWidth>Sign in</Button>
          </Link>
          <p className={styles.demoNote}>Explore demo coming soon</p>
        </div>

      </div>
    </div>
  )
}
