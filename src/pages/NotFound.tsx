/**
 * Page: NotFound (404)
 * Error page for invalid routes
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import styles from './NotFound.module.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.message}>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};
