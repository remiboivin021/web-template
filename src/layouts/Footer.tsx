/**
 * Layout Component: Footer
 * Bottom page footer
 */

import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>© {currentYear} Web Template. All rights reserved.</p>
        <div className={styles.links}>
          <a href="/privacy" className={styles.link}>
            Privacy Policy
          </a>
          <a href="/terms" className={styles.link}>
            Terms of Service
          </a>
          <a href="/contact" className={styles.link}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
