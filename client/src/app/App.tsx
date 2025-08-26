import AppProviders from './providers';
import AppRouter from './router';
import { ErrorBoundary } from '@/shared/components/error-boundary';

export default function App() {
  return (
    <ErrorBoundary 
      level="critical"
      onError={(error, errorInfo) => {
        // Log critical app-level errors to monitoring service
        console.error('Critical app error:', { error, errorInfo });
        // Example: reportToSentry(error, errorInfo);
      }}
    >
      <AppProviders>
        <ErrorBoundary 
          level="page"
          resetOnPropsChange
          onError={(error, errorInfo) => {
            // Log page-level errors
            console.error('Page error:', { error, errorInfo });
          }}
        >
          <AppRouter />
        </ErrorBoundary>
      </AppProviders>
    </ErrorBoundary>
  );
}
