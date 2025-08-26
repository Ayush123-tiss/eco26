import React, { useState, Suspense, lazy } from 'react';
import { ErrorBoundary, withErrorBoundary } from '@/shared/components/error-boundary';
import { 
  LoadingSpinner, 
  ComponentLoader, 
  SkeletonCard, 
  ButtonLoader,
  PageLoader 
} from '@/shared/components/loading-spinner';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { AlertTriangle, RefreshCw, Bug, Zap } from 'lucide-react';
import Header from '@/shared/components/layout/header';

// Simulated components that might fail
const BuggyComponent: React.FC<{ shouldError: boolean }> = ({ shouldError }) => {
  if (shouldError) {
    throw new Error('Simulated component error for demonstration');
  }
  return (
    <div className="rounded-lg bg-green-50 p-4">
      <p className="text-green-800">✅ Component loaded successfully!</p>
    </div>
  );
};

// Lazy component for demonstrating Suspense
const LazyComponent = lazy(() => 
  new Promise<{ default: React.ComponentType<any> }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-blue-800">🚀 Lazy component loaded!</p>
          </div>
        )
      });
    }, 2000); // 2 second delay
  })
);

// Higher-order component example
const SafeBuggyComponent = withErrorBoundary(BuggyComponent, {
  level: 'component',
  onError: (error) => console.log('HOC caught error:', error.message),
});

/**
 * ErrorBoundaryDemo - Comprehensive demonstration of error boundaries and loading states
 * 
 * This component showcases:
 * - Different error boundary levels
 * - Various loading spinner variants
 * - Suspense with lazy loading
 * - Error recovery mechanisms
 * - Skeleton loading states
 */
export const ErrorBoundaryDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'people' | 'products' | 'demo'>('demo');
  const [triggerError, setTriggerError] = useState(false);
  const [showLazy, setShowLazy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  const resetErrors = () => {
    setTriggerError(false);
    setShowLazy(false);
  };

  return (
    <div className="min-h-screen bg-eco-gray-50">
      {/* Header */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="p-8">
        <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-eco-gray-900">
            Error Boundaries & Loading States Demo
          </h1>
          <p className="text-eco-gray-600">
            Interactive demonstration of error handling and loading patterns in React
          </p>
        </div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Demo Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setTriggerError(!triggerError)}
                variant={triggerError ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                <Bug className="h-4 w-4" />
                {triggerError ? 'Fix Error' : 'Trigger Error'}
              </Button>
              
              <Button
                onClick={() => setShowLazy(!showLazy)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {showLazy ? 'Hide' : 'Load'} Lazy Component
              </Button>
              
              <Button
                onClick={handleAsyncAction}
                disabled={isLoading}
                variant="secondary"
                className="flex items-center gap-2"
              >
                {isLoading ? <ButtonLoader /> : null}
                Async Action
              </Button>
              
              <Button
                onClick={() => setShowSkeletons(!showSkeletons)}
                variant="outline"
              >
                {showSkeletons ? 'Hide' : 'Show'} Skeletons
              </Button>
              
              <Button onClick={resetErrors} variant="outline">
                Reset All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Boundary Examples */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Component Level Error Boundary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Component Level Error Boundary
                <Badge variant="secondary">Component</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary 
                level="component"
                resetKeys={[triggerError.toString()]}
                onError={(error) => console.log('Component error:', error.message)}
              >
                <BuggyComponent shouldError={triggerError} />
              </ErrorBoundary>
            </CardContent>
          </Card>

          {/* HOC Error Boundary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Higher-Order Component
                <Badge variant="outline">HOC</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SafeBuggyComponent shouldError={triggerError} />
            </CardContent>
          </Card>
        </div>

        {/* Loading States Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Loading Spinner Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <div className="text-center">
                <p className="mb-2 text-sm font-medium">Default</p>
                <LoadingSpinner variant="default" />
              </div>
              <div className="text-center">
                <p className="mb-2 text-sm font-medium">Eco</p>
                <LoadingSpinner variant="eco" />
              </div>
              <div className="text-center">
                <p className="mb-2 text-sm font-medium">Minimal</p>
                <LoadingSpinner variant="minimal" />
              </div>
              <div className="text-center">
                <p className="mb-2 text-sm font-medium">Dots</p>
                <LoadingSpinner variant="dots" />
              </div>
              <div className="text-center">
                <p className="mb-2 text-sm font-medium">Pulse</p>
                <LoadingSpinner variant="pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suspense with Lazy Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Suspense with Lazy Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary level="component">
              {showLazy ? (
                <Suspense fallback={<ComponentLoader text="Loading lazy component..." />}>
                  <LazyComponent />
                </Suspense>
              ) : (
                <div className="rounded-lg bg-eco-gray-100 p-4 text-center">
                  <p className="text-eco-gray-600">Click "Load Lazy Component" to see Suspense in action</p>
                </div>
              )}
            </ErrorBoundary>
          </CardContent>
        </Card>

        {/* Skeleton Loading States */}
        {showSkeletons && (
          <Card>
            <CardHeader>
              <CardTitle>Skeleton Loading States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Async Loading Demo */}
        {isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Async Operation in Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ComponentLoader text="Processing your request..." size="lg" />
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryDemo;
