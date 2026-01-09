/**
 * Configuration utilities
 * Centralized access to environment variables with type safety
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Web Template',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
} as const;
