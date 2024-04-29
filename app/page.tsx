import Link from 'next/link';
import styles from './HomePage.module.css';
import { ModeToggle } from '@/components/ModeToggle';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to the Finance Tracker</h1>
          <div className={styles.modeToggleContainer}>
            <ModeToggle />
          </div>
        </div>
        <p className={styles.text}>
          Manage your finances with ease and precision.
        </p>
        <div className={styles.linkContainer}>
          <p className={styles.text}>
            Please proceed to the Dashboard to get started.
          </p>
          <Link href='/dashboard' className={styles.dashboardLink}>
            Go to Dashboard
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <p className={styles.text}>
            If you are a new user, you will first have to sign up and log in.
          </p>
          <Link href='/auth/login' className={styles.dashboardLink}>
            Go to LoginPage
          </Link>
        </div>
      </div>
    </main>
  );
}
