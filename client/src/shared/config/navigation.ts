// Centralized navigation configuration to ensure consistency across all navigation components

export interface NavRoute {
  path: string;
  label: string;
  icon?: React.ReactNode | string;
  description?: string;
  category: 'main' | 'people' | 'products' | 'user' | 'demo';
  isExternal?: boolean;
  requiresAuth?: boolean;
}

// Main application routes
export const APP_ROUTES: NavRoute[] = [
  // Main navigation
  {
    path: '/',
    label: 'Home',
    category: 'main',
    description: 'EcoBingle homepage and community hub'
  },
  
  // Eco People section
  {
    path: '/',
    label: 'Community',
    category: 'people',
    description: 'Connect with eco-conscious community members'
  },
  {
    path: '/blog',
    label: 'Blog',
    category: 'people',
    description: 'Read and share eco-friendly articles'
  },
  {
    path: '/news',
    label: 'News',
    category: 'people',
    description: 'Latest environmental news and updates'
  },
  
  // Eco Products section
  {
    path: '/products',
    label: 'All Products',
    category: 'products',
    description: 'Browse eco-friendly products'
  },
  {
    path: '/my-orders',
    label: 'My Orders',
    category: 'products',
    description: 'Track your orders and purchase history',
    requiresAuth: true
  },
  
  // User section
  {
    path: '/dashboard',
    label: 'Dashboard',
    category: 'user',
    description: 'Personal dashboard and settings',
    requiresAuth: true
  },
  {
    path: '/profile',
    label: 'Profile',
    category: 'user',
    description: 'Manage your profile information',
    requiresAuth: true
  },
  {
    path: '/settings',
    label: 'Settings',
    category: 'user',
    description: 'Account and application settings',
    requiresAuth: true
  },
  
  // Demo and development routes
  {
    path: '/demo',
    label: 'Error Demo',
    category: 'demo',
    description: 'Error boundary demonstration'
  },
  {
    path: '/accessibility',
    label: 'A11y Demo',
    category: 'demo',
    description: 'Accessibility features demonstration'
  },
  {
    path: '/theme',
    label: 'Theme Demo',
    category: 'demo',
    description: 'Theme system demonstration'
  },
  {
    path: '/bundle-optimization',
    label: 'Bundle Demo',
    category: 'demo',
    description: 'Bundle optimization demonstration'
  },
  {
    path: '/pwa',
    label: 'PWA Demo',
    category: 'demo',
    description: 'Progressive Web App features'
  },
  {
    path: '/navigation',
    label: 'Navigation Demo',
    category: 'demo',
    description: 'Navigation system demonstration'
  },
  {
    path: '/animations',
    label: 'Animation Demo',
    category: 'demo',
    description: 'Animation system demonstration'
  },
  {
    path: '/code-splitting',
    label: 'Code Splitting',
    category: 'demo',
    description: 'Code splitting demonstration'
  },
  {
    path: '/summary',
    label: 'Implementation Summary',
    category: 'demo',
    description: 'Project implementation overview'
  }
];

// Route helper functions
export const getRoutesByCategory = (category: NavRoute['category']) => {
  return APP_ROUTES.filter(route => route.category === category);
};

export const getMainRoutes = () => getRoutesByCategory('main');
export const getPeopleRoutes = () => getRoutesByCategory('people');
export const getProductRoutes = () => getRoutesByCategory('products');
export const getUserRoutes = () => getRoutesByCategory('user');
export const getDemoRoutes = () => getRoutesByCategory('demo');

export const getPublicRoutes = () => {
  return APP_ROUTES.filter(route => !route.requiresAuth);
};

export const getAuthenticatedRoutes = () => {
  return APP_ROUTES.filter(route => route.requiresAuth);
};

export const findRouteByPath = (path: string) => {
  return APP_ROUTES.find(route => route.path === path);
};

// Navigation icons (SVG strings or component references)
export const NAV_ICONS = {
  home: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>`,
  community: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
  </svg>`,
  blog: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>`,
  news: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>`,
  products: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>`,
  orders: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>`,
  profile: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>`,
  settings: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>`,
  dashboard: `<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>`
};

export default APP_ROUTES;
