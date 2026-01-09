/**
 * UI Component: Toast Notifications
 * Displays toast messages from the UI store
 */

import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store/ui.store';
import styles from './Toast.module.css';

const TOAST_DURATION = 3000;

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    // Set up timers for new toasts
    toasts.forEach((toast) => {
      if (!timersRef.current.has(toast.id)) {
        const duration = toast.duration || TOAST_DURATION;
        const timer = setTimeout(() => {
          removeToast(toast.id);
          timersRef.current.delete(toast.id);
        }, duration);
        timersRef.current.set(toast.id, timer);
      }
    });

    // Clean up timers for removed toasts
    timersRef.current.forEach((timer, id) => {
      if (!toasts.find((t) => t.id === id)) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    });

    // Cleanup all timers on unmount
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
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
