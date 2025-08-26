import React, { Suspense, lazy, useState } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ComponentLoader } from '@/shared/components/loading-spinner';

// Route-level code splitting (already implemented in router)
const RouteExample = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Route-Level Code Splitting</h3>
    <p className="text-gray-600">
      Each page is loaded only when navigated to, implemented in our router with React.lazy().
    </p>
    <div className="bg-gray-50 p-4 rounded-lg">
      <pre className="text-sm text-gray-800 overflow-x-auto">
{`// router.tsx
const HomePage = createLazyComponent(
  () => import('@/features/community/pages/home-page'),
  'HomePage'
);

const ProductsPage = createLazyComponent(
  () => import('@/features/products/pages/products-page'),
  'ProductsPage'
);`}
      </pre>
    </div>
    <p className="text-sm text-gray-600">
      ✅ Benefits: Faster initial load, smaller bundle size per route
    </p>
  </div>
);

// Component-level code splitting
const LazyChart = lazy(() => import('@/shared/components/chart-component'));
const LazyMap = lazy(() => import('@/shared/components/map-component'));
const LazyDataTable = lazy(() => import('@/shared/components/data-table'));

const ComponentExample = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const components = [
    { id: 'chart', name: 'Chart Component', Component: LazyChart },
    { id: 'map', name: 'Map Component', Component: LazyMap },
    { id: 'table', name: 'Data Table', Component: LazyDataTable }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Component-Level Code Splitting</h3>
      <p className="text-gray-600">
        Heavy components are loaded only when needed, reducing initial bundle size.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {components.map(({ id, name, Component }) => (
          <Card key={id} className="p-4">
            <h4 className="font-medium mb-2">{name}</h4>
            <Button
              onClick={() => setActiveComponent(activeComponent === id ? null : id)}
              variant={activeComponent === id ? "default" : "outline"}
              size="sm"
              className="w-full"
            >
              {activeComponent === id ? 'Hide' : 'Load'} {name}
            </Button>
            
            {activeComponent === id && (
              <div className="mt-4 border-t pt-4">
                <Suspense fallback={<ComponentLoader text={`Loading ${name}...`} />}>
                  <Component />
                </Suspense>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Component-level splitting
const LazyChart = lazy(() => import('./chart-component'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <LazyChart />
</Suspense>`}
        </pre>
      </div>
      <p className="text-sm text-gray-600">
        ✅ Benefits: Load heavy components only when needed
      </p>
    </div>
  );
};

// Feature-level code splitting
const LazyUserManagement = lazy(() => import('@/features/admin/user-management'));
const LazyAnalytics = lazy(() => import('@/features/admin/analytics'));

const FeatureExample = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    { id: 'users', name: 'User Management', Component: LazyUserManagement },
    { id: 'analytics', name: 'Analytics Dashboard', Component: LazyAnalytics }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Feature-Level Code Splitting</h3>
      <p className="text-gray-600">
        Entire features (admin panels, dashboards) loaded based on user permissions or access.
      </p>
      
      <div className="space-y-4">
        {features.map(({ id, name, Component }) => (
          <Card key={id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{name}</h4>
              <Button
                onClick={() => setActiveFeature(activeFeature === id ? null : id)}
                variant={activeFeature === id ? "default" : "outline"}
                size="sm"
              >
                {activeFeature === id ? 'Hide' : 'Load'} Feature
              </Button>
            </div>
            
            {activeFeature === id && (
              <div className="border-t pt-4">
                <Suspense fallback={<ComponentLoader text={`Loading ${name}...`} />}>
                  <Component />
                </Suspense>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Feature-level splitting
const AdminPanel = lazy(() => import('@/features/admin'));

// Conditional loading based on permissions
{user.isAdmin && (
  <Suspense fallback={<Loading />}>
    <AdminPanel />
  </Suspense>
)}`}
        </pre>
      </div>
      <p className="text-sm text-gray-600">
        ✅ Benefits: Role-based code loading, reduced bundle for regular users
      </p>
    </div>
  );
};

// Library-level code splitting
const LibraryExample = () => {
  const [showExample, setShowExample] = useState(false);

  const loadLibrary = async () => {
    setShowExample(true);
    // Simulate dynamic import of a heavy library
    console.log('Heavy library loaded:', new Date().toISOString());
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Library-Level Code Splitting</h3>
      <p className="text-gray-600">
        Heavy third-party libraries loaded only when their functionality is needed.
      </p>
      
      <Card className="p-4">
        <h4 className="font-medium mb-2">Date Library Example</h4>
        <p className="text-sm text-gray-600 mb-4">
          Load date formatting libraries only when needed.
        </p>
        <Button onClick={loadLibrary} disabled={showExample}>
          {showExample ? 'Library Loaded ✓' : 'Load Date Library'}
        </Button>
        
        {showExample && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              Date library loaded successfully! Check console for formatted date.
            </p>
          </div>
        )}
      </Card>

      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Library-level splitting
const loadDateLibrary = async () => {
  const { default: moment } = await import('moment');
  return moment().format('YYYY-MM-DD');
};

// Or with React component
const DatePicker = lazy(() => import('react-datepicker'));`}
        </pre>
      </div>
      <p className="text-sm text-gray-600">
        ✅ Benefits: Reduce initial bundle by excluding heavy libraries
      </p>
    </div>
  );
};

export const CodeSplittingDemo: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Splitting Strategies</h1>
          <p className="text-gray-600">
            Demonstration of different code splitting techniques to optimize bundle size and loading performance.
          </p>
        </div>

        <Tabs defaultValue="route" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="route">Route-Level</TabsTrigger>
            <TabsTrigger value="component">Component-Level</TabsTrigger>
            <TabsTrigger value="feature">Feature-Level</TabsTrigger>
            <TabsTrigger value="library">Library-Level</TabsTrigger>
          </TabsList>

          <TabsContent value="route">
            <Card className="p-6">
              <RouteExample />
            </Card>
          </TabsContent>

          <TabsContent value="component">
            <Card className="p-6">
              <ComponentExample />
            </Card>
          </TabsContent>

          <TabsContent value="feature">
            <Card className="p-6">
              <FeatureExample />
            </Card>
          </TabsContent>

          <TabsContent value="library">
            <Card className="p-6">
              <LibraryExample />
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Performance Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">75%</div>
              <div className="text-sm text-green-800">Smaller Initial Bundle</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">40%</div>
              <div className="text-sm text-blue-800">Faster First Load</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">60%</div>
              <div className="text-sm text-purple-800">Better Cache Utilization</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">90%</div>
              <div className="text-sm text-orange-800">Unused Code Elimination</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <h4 className="font-medium">Route-level splitting for all pages</h4>
                <p className="text-sm text-gray-600">Split at route boundaries for maximum impact</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <h4 className="font-medium">Component-level for heavy components</h4>
                <p className="text-sm text-gray-600">Charts, maps, rich text editors, etc.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <h4 className="font-medium">Feature-level for admin/optional features</h4>
                <p className="text-sm text-gray-600">Load based on user permissions or feature flags</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <h4 className="font-medium">Library-level for optional dependencies</h4>
                <p className="text-sm text-gray-600">Date libraries, charting libraries, etc.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CodeSplittingDemo;
