/**
 * Page: Home
 * Landing page
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import styles from './Home.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Web Template</h1>
        <p className={styles.subtitle}>
          A modern, type-safe TypeScript web application boilerplate with React
        </p>
        <div className={styles.actions}>
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.grid}>
          <Card>
            <h3>⚡ Fast Development</h3>
            <p>Built with Vite for lightning-fast HMR and optimized builds</p>
          </Card>
          <Card>
            <h3>🛡️ Type Safety</h3>
            <p>Strict TypeScript configuration ensures code reliability</p>
          </Card>
          <Card>
            <h3>🎨 Modern UI</h3>
            <p>Beautiful, responsive design with CSS modules</p>
          </Card>
          <Card>
            <h3>🔐 Authentication</h3>
            <p>Complete auth flow with protected routes</p>
          </Card>
          <Card>
            <h3>📦 State Management</h3>
            <p>Zustand for simple, scalable state management</p>
          </Card>
          <Card>
            <h3>✅ Testing Ready</h3>
            <p>Vitest and React Testing Library configured</p>
          </Card>
        </div>
      </section>
    </div>
  );
};
