# Error Boundaries and Loading States - Usage Guide

This guide demonstrates how to use the error boundaries and loading components in your React application.

## 🛡️ Error Boundary Usage

### 1. Basic Usage

```tsx
import { ErrorBoundary } from '@/shared/components/error-boundary';

function MyComponent() {
  return (
    <ErrorBoundary>
      <SomeComponentThatMightFail />
    </ErrorBoundary>
  );
}
```

### 2. Advanced Configuration

```tsx
import { ErrorBoundary } from '@/shared/components/error-boundary';

function AdvancedExample() {
  return (
    <ErrorBoundary 
      level="page"                    // 'page' | 'component' | 'critical'
      resetOnPropsChange={true}       // Reset when props change
      resetKeys={[userId, dataId]}    // Reset when these values change
      onError={(error, errorInfo) => {
        // Custom error handling
        console.error('Error occurred:', error);
        reportToAnalytics(error);
      }}
      fallback={<CustomErrorUI />}    // Custom fallback UI
    >
      <UserDashboard userId={userId} />
    </ErrorBoundary>
  );
}
```

### 3. Higher-Order Component Pattern

```tsx
import { withErrorBoundary } from '@/shared/components/error-boundary';

const SafeComponent = withErrorBoundary(RiskyComponent, {
  level: 'component',
  onError: (error) => console.error(error),
});

// Usage
<SafeComponent prop1="value" />
```

### 4. Error Levels

- **Critical**: For app-level errors that require full page reload
- **Page**: For page-level errors with retry and navigation options
- **Component**: For component-level errors with retry functionality

## 🔄 Loading Spinner Usage

### 1. Basic Loading Spinner

```tsx
import { LoadingSpinner } from '@/shared/components/loading-spinner';

function BasicExample() {
  return <LoadingSpinner size="md" text="Loading..." />;
}
```

### 2. Different Variants

```tsx
import { LoadingSpinner } from '@/shared/components/loading-spinner';

function VariantExamples() {
  return (
    <div className="space-y-4">
      {/* Default spinner */}
      <LoadingSpinner variant="default" />
      
      {/* Eco-themed spinner */}
      <LoadingSpinner variant="eco" color="primary" />
      
      {/* Minimal spinner */}
      <LoadingSpinner variant="minimal" />
      
      {/* Animated dots */}
      <LoadingSpinner variant="dots" />
      
      {/* Pulse effect */}
      <LoadingSpinner variant="pulse" />
    </div>
  );
}
```

### 3. Specialized Loading Components

```tsx
import { 
  PageLoader, 
  ComponentLoader, 
  InlineLoader, 
  ButtonLoader 
} from '@/shared/components/loading-spinner';

function SpecializedExamples() {
  return (
    <div>
      {/* Full-screen page loader */}
      <PageLoader text="Loading application..." />
      
      {/* Component-level loader */}
      <ComponentLoader text="Loading data..." size="lg" />
      
      {/* Inline loader for small spaces */}
      <InlineLoader text="Saving..." />
      
      {/* Button with loading state */}
      <button disabled>
        <ButtonLoader />
        Processing...
      </button>
    </div>
  );
}
```

### 4. Skeleton Loading

```tsx
import { 
  SkeletonText, 
  SkeletonCard, 
  SkeletonAvatar 
} from '@/shared/components/loading-spinner';

function SkeletonExample() {
  return (
    <div className="space-y-4">
      {/* Text skeleton */}
      <SkeletonText lines={3} />
      
      {/* Card skeleton */}
      <SkeletonCard />
      
      {/* Avatar skeleton */}
      <div className="flex items-center space-x-3">
        <SkeletonAvatar size="lg" />
        <SkeletonText lines={2} className="flex-1" />
      </div>
    </div>
  );
}
```

## 🔄 Suspense with Lazy Loading

### 1. Route-Level Lazy Loading

```tsx
import { lazy, Suspense } from 'react';
import { PageLoader } from '@/shared/components/loading-spinner';
import { ErrorBoundary } from '@/shared/components/error-boundary';

const LazyComponent = lazy(() => import('./MyComponent'));

function LazyRoute() {
  return (
    <ErrorBoundary level="page">
      <Suspense fallback={<PageLoader text="Loading page..." />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### 2. Component-Level Lazy Loading

```tsx
import { lazy, Suspense } from 'react';
import { ComponentLoader } from '@/shared/components/loading-spinner';
import { ErrorBoundary } from '@/shared/components/error-boundary';

const LazyChart = lazy(() => import('./Chart'));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <ErrorBoundary level="component">
        <Suspense fallback={<ComponentLoader text="Loading chart..." />}>
          <LazyChart />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

### 3. Conditional Lazy Loading

```tsx
import { lazy, Suspense, useState } from 'react';
import { InlineLoader } from '@/shared/components/loading-spinner';

function ConditionalLoading() {
  const [showChart, setShowChart] = useState(false);
  
  const LazyChart = lazy(() => import('./ExpensiveChart'));
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<InlineLoader text="Loading chart..." />}>
          <LazyChart />
        </Suspense>
      )}
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Error Boundary Placement

```tsx
function App() {
  return (
    {/* Critical level - catches all errors */}
    <ErrorBoundary level="critical">
      <AppProviders>
        {/* Page level - catches route errors */}
        <ErrorBoundary level="page" resetOnPropsChange>
          <Router />
        </ErrorBoundary>
      </AppProviders>
    </ErrorBoundary>
  );
}

function ProductPage() {
  return (
    <div>
      {/* Component level - catches widget errors */}
      <ErrorBoundary level="component">
        <ProductWidget />
      </ErrorBoundary>
      
      <ErrorBoundary level="component">
        <ReviewsWidget />
      </ErrorBoundary>
    </div>
  );
}
```

### 2. Loading State Management

```tsx
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner, SkeletonCard } from '@/shared/components/loading-spinner';

function DataComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  if (error) throw error; // Will be caught by ErrorBoundary
  
  if (isLoading) {
    return <SkeletonCard />; // Better UX than spinner
  }

  return <DataDisplay data={data} />;
}

// Wrap with ErrorBoundary
function SafeDataComponent() {
  return (
    <ErrorBoundary level="component">
      <DataComponent />
    </ErrorBoundary>
  );
}
```

### 3. Progressive Enhancement

```tsx
function ProgressiveComponent() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const AdvancedFeature = lazy(() => import('./AdvancedFeature'));
  
  return (
    <div>
      {/* Always available basic features */}
      <BasicFeatures />
      
      {/* Progressive enhancement */}
      <button onClick={() => setShowAdvanced(true)}>
        Show Advanced Features
      </button>
      
      {showAdvanced && (
        <ErrorBoundary 
          level="component"
          fallback={<div>Advanced features unavailable</div>}
        >
          <Suspense fallback={<ComponentLoader />}>
            <AdvancedFeature />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
```

## 🔧 Configuration Examples

### Error Reporting Integration

```tsx
import { ErrorBoundary } from '@/shared/components/error-boundary';

function AppWithErrorReporting() {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      window.gtag?.('event', 'exception', {
        description: error.message,
        fatal: false,
      });
      
      // Example: Sentry integration
      // Sentry.captureException(error, { extra: errorInfo });
    }
  };

  return (
    <ErrorBoundary onError={handleError}>
      <App />
    </ErrorBoundary>
  );
}
```

### Custom Loading States

```tsx
import { LoadingSpinner } from '@/shared/components/loading-spinner';

function CustomLoadingExample() {
  return (
    <LoadingSpinner
      size="lg"
      variant="eco"
      color="primary"
      text="Preparing your eco-friendly experience..."
      fullScreen
      transparent
    />
  );
}
```

This comprehensive error handling and loading system provides:

- **Graceful error recovery** with retry mechanisms
- **Better user experience** with appropriate loading states
- **Development debugging** with detailed error information
- **Production monitoring** with error reporting integration
- **Performance optimization** through lazy loading and code splitting
