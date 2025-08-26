import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  level?: 'page' | 'component' | 'critical';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire application.
 * 
 * Features:
 * - Different error levels (page, component, critical)
 * - Retry functionality with attempt tracking
 * - Error reporting capabilities
 * - Customizable fallback UI
 * - Automatic reset on prop changes
 * - Development vs production error details
 */
export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    this.logError(error, errorInfo);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error boundary when specified props change
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }

    // Reset when resetKeys change
    if (hasError && resetKeys && resetKeys.length > 0) {
      const prevResetKeys = prevProps.resetKeys || [];
      const hasResetKeyChanged = resetKeys.some((key, idx) => prevResetKeys[idx] !== key);
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      level: this.props.level || 'component',
    };

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Full Details:', errorDetails);
      console.groupEnd();
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // this.reportToService(errorDetails);
    }
  };

  private reportToService = async (errorDetails: any) => {
    try {
      // Example implementation - replace with your error reporting service
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorDetails),
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    });
  };

  private handleRetry = () => {
    const { retryCount } = this.state;
    
    // Limit retry attempts
    if (retryCount >= 3) {
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));

    // Add a small delay before retry to prevent immediate re-error
    this.resetTimeoutId = window.setTimeout(() => {
      this.forceUpdate();
    }, 100);
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private renderErrorUI = () => {
    const { error, errorInfo, errorId, retryCount } = this.state;
    const { level = 'component' } = this.props;
    const isDevelopment = process.env.NODE_ENV === 'development';

    const errorLevelConfig = {
      critical: {
        title: 'Critical System Error',
        description: 'A critical error has occurred. Please contact support.',
        color: 'destructive' as const,
        showRetry: false,
      },
      page: {
        title: 'Page Error',
        description: 'This page encountered an error. Please try refreshing.',
        color: 'destructive' as const,
        showRetry: true,
      },
      component: {
        title: 'Component Error',
        description: 'Something went wrong with this component.',
        color: 'secondary' as const,
        showRetry: true,
      },
    };

    const config = errorLevelConfig[level];
    const maxRetries = 3;
    const canRetry = config.showRetry && retryCount < maxRetries;

    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              {config.title}
              <Badge variant={config.color} className="text-xs">
                {level.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 text-center">
            <p className="text-eco-gray-600">{config.description}</p>
            
            {isDevelopment && error && (
              <div className="rounded-lg bg-eco-gray-100 p-4 text-left">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-eco-gray-800">
                  <Bug className="h-4 w-4" />
                  Development Details
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong>Error:</strong> {error.message}
                  </div>
                  <div>
                    <strong>Error ID:</strong> <code className="rounded bg-eco-gray-200 px-1">{errorId}</code>
                  </div>
                  {retryCount > 0 && (
                    <div>
                      <strong>Retry Attempts:</strong> {retryCount}/{maxRetries}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              {canRetry && (
                <Button
                  onClick={this.handleRetry}
                  variant="default"
                  size="sm"
                  className="bg-eco-green hover:bg-eco-green-dark"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again ({maxRetries - retryCount} left)
                </Button>
              )}
              
              <Button
                onClick={this.handleReload}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload Page
              </Button>
              
              {level === 'page' && (
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  size="sm"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              )}
            </div>

            {retryCount >= maxRetries && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-800">
                  Maximum retry attempts reached. Please reload the page or contact support.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // Use custom fallback if provided, otherwise use default error UI
      return fallback || this.renderErrorUI();
    }

    return children;
  }
}

// Higher-order component wrapper for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for programmatically triggering error boundary
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: ErrorInfo) => {
    // This will be caught by the nearest error boundary
    throw error;
  };
};

export default ErrorBoundary;
