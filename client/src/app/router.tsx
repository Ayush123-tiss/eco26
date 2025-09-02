import { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/shared/components/error-boundary';
import { PageLoader, ComponentLoader } from '@/shared/components/loading-spinner';
import MainLayout from '../components/MainLayout';

// Enhanced lazy loading with retry mechanism and preloading

// Enhanced lazy loading with retry mechanism and preloading
const createLazyComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  componentName: string
) => {
  const LazyComponent = lazy(() => {
    return importFunc().catch((error) => {
      console.error(`Failed to load ${componentName}:`, error);
      // Return a fallback component for failed imports
      return {
        default: () => (
          <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Failed to Load Component
              </h2>
              <p className="text-gray-600 mb-4">
                {componentName} could not be loaded. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      };
    });
  });
  
  // Add display name for debugging
  LazyComponent.displayName = `Lazy(${componentName})`;
  
  return LazyComponent;
};

// Route configuration with metadata
interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  fallbackText: string;
  errorLevel: 'page' | 'component';
  preload?: boolean;
  exact?: boolean;
}

// Lazy load pages with enhanced error handling
const ProductsPage = createLazyComponent(
  () => import('@/features/products/pages/products-page'),
  'ProductsPage'
);

const ErrorBoundaryDemo = createLazyComponent(
  () => import('@/shared/components/error-boundary-demo'),
  'ErrorBoundaryDemo'
);

const AccessibilityDemo = createLazyComponent(
  () => import('@/shared/components/accessibility-demo'),
  'AccessibilityDemo'
);

const NotFoundPage = createLazyComponent(
  () => import('@/shared/components/not-found-page'),
  'NotFoundPage'
);

const CodeSplittingDemo = createLazyComponent(
  () => import('@/shared/components/code-splitting-demo'),
  'CodeSplittingDemo'
);

const CodeSplittingSummary = createLazyComponent(
  () => import('@/shared/components/code-splitting-summary'),
  'CodeSplittingSummary'
);

const NavigationDemo = createLazyComponent(
  () => import('@/shared/components/navigation/navigation-demo'),
  'NavigationDemo'
);

const ThemeDemo = createLazyComponent(
  () => import('@/pages/theme-demo'),
  'ThemeDemo'
);

const BundleOptimizationDemo = createLazyComponent(
  () => import('@/pages/bundle-optimization-demo-simple'),
  'BundleOptimizationDemo'
);

const PWADemo = createLazyComponent(
  () => import('@/pages/pwa-demo'),
  'PWADemo'
);

const AnimationDemo = createLazyComponent(
  () => import('@/pages/animation-demo'),
  'AnimationDemo'
);

const BlogDashboard = createLazyComponent(
  () => import('../pages/blog-dashboard'),
  'BlogDashboard'
);

const CommunityPage = createLazyComponent(
  () => import('../pages/community-page'),
  'CommunityPage'
);

const CommunityDetailPage = createLazyComponent(
  () => import('../pages/community-detail'),
  'CommunityDetailPage'
);

const EcoProductsPage = createLazyComponent(
  () => import('../pages/eco-products'),
  'EcoProductsPage'
);

const CheckoutPage = createLazyComponent(
  () => import('../pages/checkout'),
  'CheckoutPage'
);

const OrderConfirmationPage = createLazyComponent(
  () => import('../pages/order-confirmation'),
  'OrderConfirmationPage'
);

const MyOrdersPage = createLazyComponent(
  () => import('../pages/my-orders'),
  'MyOrdersPage'
);

const NewsPage = createLazyComponent(
  () => import('../pages/news'),
  'NewsPage'
);

const CertificatesPage = createLazyComponent(
  () => import('../pages/certificates'),
  'CertificatesPage'
);

// Dynamic import for code splitting by features
const ProfilePage = createLazyComponent(
  () => import('@/features/user/pages/profile-page'),
  'ProfilePage'
);

const SettingsPage = createLazyComponent(
  () => import('@/features/user/pages/settings-page'),
  'SettingsPage'
);

const DashboardPage = createLazyComponent(
  () => import('@/features/dashboard/pages/dashboard-page-simple'),
  'DashboardPage'
);

// Route configurations
const routes: RouteConfig[] = [
  {
    path: '/',
    component: CommunityPage,
    fallbackText: 'Loading community...',
    errorLevel: 'page',
    preload: true,
    exact: true
  },
  {
    path: '/products',
    component: EcoProductsPage,
    fallbackText: 'Loading eco products...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/checkout',
    component: CheckoutPage,
    fallbackText: 'Loading checkout...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/order-confirmation',
    component: OrderConfirmationPage,
    fallbackText: 'Loading order confirmation...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/my-orders',
    component: MyOrdersPage,
    fallbackText: 'Loading my orders...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    fallbackText: 'Loading dashboard...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/profile',
    component: ProfilePage,
    fallbackText: 'Loading profile...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/settings',
    component: SettingsPage,
    fallbackText: 'Loading settings...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/blog',
    component: BlogDashboard,
    fallbackText: 'Loading blog dashboard...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/news',
    component: NewsPage,
    fallbackText: 'Loading news...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/certificates',
    component: CertificatesPage,
    fallbackText: 'Loading certificates...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/community/:id',
    component: CommunityDetailPage,
    fallbackText: 'Loading community details...',
    errorLevel: 'page',
    preload: false
  },
  // Demo routes - grouped separately for clarity
  {
    path: '/demo',
    component: ErrorBoundaryDemo,
    fallbackText: 'Loading demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/accessibility',
    component: AccessibilityDemo,
    fallbackText: 'Loading accessibility demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/theme',
    component: ThemeDemo,
    fallbackText: 'Loading theme demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/bundle-optimization',
    component: BundleOptimizationDemo,
    fallbackText: 'Loading bundle optimization demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/pwa',
    component: PWADemo,
    fallbackText: 'Loading PWA demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/navigation',
    component: NavigationDemo,
    fallbackText: 'Loading navigation demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/animations',
    component: AnimationDemo,
    fallbackText: 'Loading animation demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/code-splitting',
    component: CodeSplittingDemo,
    fallbackText: 'Loading code splitting demo...',
    errorLevel: 'page',
    preload: false
  },
  {
    path: '/summary',
    component: CodeSplittingSummary,
    fallbackText: 'Loading implementation summary...',
    errorLevel: 'page',
    preload: false
  }
];

// Enhanced lazy route wrapper with better error handling
interface LazyRouteProps {
  Component: React.ComponentType<any>;
  fallbackText: string;
  errorLevel: 'page' | 'component';
  routePath: string;
}

const LazyRoute: React.FC<LazyRouteProps> = ({ 
  Component, 
  fallbackText, 
  errorLevel, 
  routePath 
}) => {
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxAttempts = 3;

  const handleRetry = () => {
    if (loadAttempts < maxAttempts) {
      setLoadAttempts(prev => prev + 1);
      window.location.reload();
    }
  };

  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              {errorLevel === 'page' ? 'Page Load Error' : 'Component Error'}
            </h2>
            <p className="text-gray-600 mb-4">
              Failed to load {routePath}. 
              {loadAttempts < maxAttempts 
                ? ` Attempt ${loadAttempts + 1} of ${maxAttempts}.`
                : ' Maximum retry attempts reached.'
              }
            </p>
            <div className="space-x-4">
              {loadAttempts < maxAttempts && (
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Retry Loading
                </button>
              )}
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Go Back
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {error?.message || 'Unknown error'}
                  {error?.stack && '\n\n' + error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}
    >
      <Suspense
        fallback={
          errorLevel === 'page' ? (
            <PageLoader text={fallbackText} />
          ) : (
            <ComponentLoader text={fallbackText} />
          )
        }
      >
        <MainLayout>
          <Component />
        </MainLayout>
      </Suspense>
    </ErrorBoundary>
  );
};

// Preloader hook for route prefetching
const useRoutePreloader = () => {
  useEffect(() => {
    // Preload critical routes on mount
    const preloadRoutes = routes.filter(route => route.preload);
    
    const preloadPromises = preloadRoutes.map(route => {
      try {
        // Trigger dynamic import for preloading
        return route.component.preload?.();
      } catch (error) {
        console.warn(`Failed to preload route ${route.path}:`, error);
        return Promise.resolve();
      }
    });

    Promise.all(preloadPromises).then(() => {
      console.log('Critical routes preloaded successfully');
    });
  }, []);

  const preloadRoute = (path: string) => {
    const route = routes.find(r => r.path === path);
    if (route?.component?.preload) {
      try {
        route.component.preload();
      } catch (error) {
        console.warn(`Failed to preload route ${path}:`, error);
      }
    }
  };

  return { preloadRoute };
};

// Route analytics and performance monitoring
const useRouteAnalytics = () => {
  const [location] = useLocation();

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Log route performance metrics
      console.log(`Route ${location} loaded in ${loadTime.toFixed(2)}ms`);
      
      // You can send these metrics to your analytics service
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: location,
          load_time: loadTime
        });
      }
    };
  }, [location]);
};

export const AppRouter: React.FC = () => {
  const { preloadRoute } = useRoutePreloader();
  useRouteAnalytics();

  // Intersection observer for link hover preloading
  useEffect(() => {
    const handleLinkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href.includes(window.location.origin)) {
        const path = new URL(link.href).pathname;
        preloadRoute(path);
      }
    };

    document.addEventListener('mouseover', handleLinkHover);
    return () => document.removeEventListener('mouseover', handleLinkHover);
  }, [preloadRoute]);

  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} exact={route.exact}>
          <LazyRoute
            Component={route.component}
            fallbackText={route.fallbackText}
            errorLevel={route.errorLevel}
            routePath={route.path}
          />
        </Route>
      ))}
      
      {/* Catch-all route for 404 */}
      <Route>
        <LazyRoute
          Component={NotFoundPage}
          fallbackText="Loading..."
          errorLevel="page"
          routePath="404"
        />
      </Route>
    </Switch>
  );
};

export default AppRouter;
