// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// API endpoints
export const API_ENDPOINTS = {
  // Community endpoints
  THREADS: '/threads',
  COMMENTS: '/comments',
  VOTES: '/votes',
  COMMUNITIES: '/communities',
  
  // Product endpoints
  PRODUCTS: '/products',
  CATEGORIES: '/product-categories',
  
  // User endpoints
  USERS: '/users',
  AUTH: '/auth',
} as const;

// HTTP client configuration
export const HTTP_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
