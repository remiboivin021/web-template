/**
 * UI Component: Loading Spinner
 * Displays a loading indicator
 */

import styles from './Loading.module.css';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label="Loading">
          <span className={styles.srOnly}>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label="Loading">
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};
