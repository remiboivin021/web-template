/**
 * Page: Dashboard
 * Protected dashboard page for authenticated users
 */

import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';
import styles from './Dashboard.module.css';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Welcome back, {user?.name}!</p>

      <div className={styles.grid}>
        <Card>
          <h3>Profile Information</h3>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{user?.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user?.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Role:</span>
              <span className={styles.value}>{user?.role}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3>Quick Stats</h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statLabel}>Tasks</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>0</span>
              <span className={styles.statLabel}>Notifications</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3>Recent Activity</h3>
          <p className={styles.empty}>No recent activity</p>
        </Card>

        <Card>
          <h3>Settings</h3>
          <p>Manage your account settings and preferences</p>
        </Card>
      </div>
    </div>
  );
};
