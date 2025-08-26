// App-wide constants
export const APP_NAME = 'EcoBingle Connect';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Sustainable Community & Marketplace Platform';

// UI Constants
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

export const COLORS = {
  PRIMARY: {
    50: '#f0f9f0',
    100: '#dcf2dc',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'eco-ui-theme',
  USER_PREFERENCES: 'eco-user-preferences',
  DRAFT_POST: 'eco-draft-post',
} as const;
