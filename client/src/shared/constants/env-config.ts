// Environment configuration
export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  API_URL: import.meta.env.VITE_API_URL || '/api',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  DEBUG: import.meta.env.NODE_ENV === 'development',
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_USER_PROFILES: true,
  ENABLE_ANALYTICS: ENV.ENABLE_ANALYTICS,
  ENABLE_OFFLINE_MODE: false,
} as const;

// API configuration
export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
} as const;
