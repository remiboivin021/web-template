/**
 * UI Component: Toast Notifications
 * Displays toast messages from the UI store
 */

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui.store';
import styles from './Toast.module.css';

const TOAST_DURATION = 3000;

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  useEffect(() => {
    toasts.forEach((toast) => {
      const duration = toast.duration || TOAST_DURATION;
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, removeToast]);

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role="alert"
          aria-label={toast.message}
        >
          <div className={styles.icon}>{getIcon(toast.type)}</div>
          <p className={styles.message}>{toast.message}</p>
          <button
            className={styles.closeButton}
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

function getIcon(type: 'success' | 'error' | 'info' | 'warning'): string {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'info':
      return 'ℹ';
    case 'warning':
      return '⚠';
    default:
      return '';
  }
}
