import React from 'react';
import { Loader2, Leaf, Recycle, Wind } from 'lucide-react';
import { cn } from '@/shared/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'eco' | 'minimal' | 'dots' | 'pulse';
  className?: string;
  text?: string;
  fullScreen?: boolean;
  transparent?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

/**
 * LoadingSpinner component with multiple variants and customization options
 * 
 * Features:
 * - Multiple size options
 * - Different spinner variants (default, eco-themed, minimal, dots, pulse)
 * - Color themes
 * - Full-screen overlay option
 * - Customizable loading text
 * - Accessibility support
 * - Responsive design
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  text,
  fullScreen = false,
  transparent = false,
  color = 'primary',
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: 'h-4 w-4',
      text: 'text-xs',
      container: 'gap-2',
    },
    md: {
      spinner: 'h-6 w-6',
      text: 'text-sm',
      container: 'gap-3',
    },
    lg: {
      spinner: 'h-8 w-8',
      text: 'text-base',
      container: 'gap-4',
    },
    xl: {
      spinner: 'h-12 w-12',
      text: 'text-lg',
      container: 'gap-4',
    },
  };

  // Color configurations
  const colorConfig = {
    primary: 'text-eco-green',
    secondary: 'text-eco-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  const config = sizeConfig[size];
  const colorClass = colorConfig[color];

  // Render different spinner variants
  const renderSpinner = () => {
    const baseClasses = cn(config.spinner, colorClass, className);

    switch (variant) {
      case 'eco':
        return (
          <div className={cn('relative', config.spinner)}>
            <Leaf className={cn(baseClasses, 'animate-pulse absolute')} />
            <Recycle className={cn(baseClasses, 'animate-spin')} />
          </div>
        );

      case 'minimal':
        return (
          <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', config.spinner, colorClass)} />
        );

      case 'dots':
        return (
          <div className={cn('flex space-x-1', config.container)}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full bg-current',
                  size === 'sm' ? 'h-1 w-1' : size === 'md' ? 'h-2 w-2' : size === 'lg' ? 'h-3 w-3' : 'h-4 w-4',
                  colorClass
                )}
                style={{
                  animation: `dot-pulse 1.4s ease-in-out ${i * 0.16}s infinite both`,
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={cn('relative', config.spinner)}>
            <Wind className={cn(baseClasses, 'animate-pulse')} />
            <div 
              className={cn(
                'absolute inset-0 rounded-full border-2 border-current animate-ping',
                colorClass
              )}
              style={{ animationDuration: '2s' }}
            />
          </div>
        );

      default:
        return <Loader2 className={cn(baseClasses, 'animate-spin')} />;
    }
  };

  const spinnerContent = (
    <div 
      className={cn(
        'flex flex-col items-center justify-center',
        config.container
      )}
      role="status"
      aria-label={text || 'Loading'}
    >
      {renderSpinner()}
      {text && (
        <span className={cn(config.text, 'font-medium text-eco-gray-700')}>
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          transparent 
            ? 'bg-white/80 backdrop-blur-sm' 
            : 'bg-white'
        )}
      >
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Specialized loading components for common use cases
export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading page...' }) => (
  <LoadingSpinner 
    size="lg" 
    variant="eco" 
    text={text} 
    fullScreen 
    transparent 
  />
);

export const ComponentLoader: React.FC<{ text?: string; size?: LoadingSpinnerProps['size'] }> = ({ 
  text = 'Loading...', 
  size = 'md' 
}) => (
  <div className="flex min-h-[200px] items-center justify-center">
    <LoadingSpinner size={size} text={text} />
  </div>
);

export const InlineLoader: React.FC<{ text?: string }> = ({ text }) => (
  <LoadingSpinner size="sm" variant="minimal" text={text} />
);

export const ButtonLoader: React.FC = () => (
  <LoadingSpinner size="sm" variant="minimal" className="mr-2" />
);

// Skeleton loader components for better UX
export const SkeletonText: React.FC<{ 
  lines?: number; 
  className?: string; 
}> = ({ lines = 3, className }) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={cn(
          'h-4 rounded bg-eco-gray-200 animate-pulse',
          i === lines - 1 ? 'w-3/4' : 'w-full'
        )}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('rounded-lg border border-eco-gray-200 p-6', className)}>
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-1/4 rounded bg-eco-gray-200" />
      <div className="h-4 w-3/4 rounded bg-eco-gray-200" />
      <div className="h-4 w-1/2 rounded bg-eco-gray-200" />
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }[size];

  return (
    <div className={cn('rounded-full bg-eco-gray-200 animate-pulse', sizeClass)} />
  );
};

// CSS for dot animation (add to your global styles)
export const dotPulseCSS = `
@keyframes dot-pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

export default LoadingSpinner;
