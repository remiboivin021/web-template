/**
 * Page: About
 * About page
 */

import { Card } from '@/components/Card';
import styles from './About.module.css';

export const AboutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Web Template</h1>

      <Card className={styles.section}>
        <h2>Overview</h2>
        <p>
          Web Template is a comprehensive TypeScript boilerplate for building modern web
          applications with React. It provides all the essential features you need to get started
          quickly while maintaining best practices and code quality.
        </p>
      </Card>

      <Card className={styles.section}>
        <h2>Technology Stack</h2>
        <ul className={styles.list}>
          <li>
            <strong>React 19</strong> - Modern UI library with latest features
          </li>
          <li>
            <strong>TypeScript</strong> - Strict type safety throughout the codebase
          </li>
          <li>
            <strong>Vite</strong> - Lightning-fast build tool and dev server
          </li>
          <li>
            <strong>Zustand</strong> - Simple and scalable state management
          </li>
          <li>
            <strong>React Router</strong> - Client-side routing
          </li>
          <li>
            <strong>Axios</strong> - Promise-based HTTP client
          </li>
          <li>
            <strong>Zod</strong> - Schema validation for forms and APIs
          </li>
          <li>
            <strong>Vitest</strong> - Fast unit testing framework
          </li>
          <li>
            <strong>ESLint & Prettier</strong> - Code quality and formatting
          </li>
        </ul>
      </Card>

      <Card className={styles.section}>
        <h2>Key Features</h2>
        <ul className={styles.list}>
          <li>Authentication flow with protected routes</li>
          <li>Responsive design with CSS modules</li>
          <li>Theme switching (light/dark mode)</li>
          <li>Toast notification system</li>
          <li>Form validation with custom hooks</li>
          <li>API client with interceptors</li>
          <li>Error boundaries and loading states</li>
          <li>Accessibility-first components</li>
          <li>SEO-ready structure</li>
        </ul>
      </Card>
    </div>
  );
};
