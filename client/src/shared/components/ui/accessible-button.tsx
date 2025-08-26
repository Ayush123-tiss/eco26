import React, { forwardRef } from 'react';
import { cn } from '@/shared/utils';
import { LoadingSpinner } from '@/shared/components/loading-spinner';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  describedBy?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    loadingText,
    children,
    className,
    disabled,
    describedBy,
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500',
      ghost: 'hover:bg-gray-100 focus-visible:ring-gray-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500'
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <LoadingSpinner 
            size="sm" 
            className="mr-2" 
            aria-hidden="true"
          />
        )}
        <span className={loading ? 'opacity-70' : ''}>
          {loading && loadingText ? loadingText : children}
        </span>
        {loading && (
          <span className="sr-only">Loading, please wait</span>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
