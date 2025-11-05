import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Login.module.css'

export default function CheckEmail() {
  const router = useRouter()
  const { email } = router.query || {}

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Check your email</h1>
        <p style={{ textAlign: 'center', marginTop: 8 }}>
          We've sent a verification link to <strong>{email || 'your email'}</strong>.
          Please check your inbox (and spam folder) and follow the instructions to complete registration.
        </p>

        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <Link href="/admin/login">
            <button className={styles.button}>Go to login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
