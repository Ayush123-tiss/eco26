// Simple environment configuration
export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  API_URL: import.meta.env.VITE_API_URL || '/api',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
} as const;

// Simple feature flags
export const FEATURES = {
  ENABLE_DARK_MODE: false,
  ENABLE_NOTIFICATIONS: false,
  ENABLE_USER_PROFILES: true,
} as const;

// Basic API configuration
export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  TIMEOUT: 10000,
} as const;
