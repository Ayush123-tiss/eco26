/**
 * Bundle Optimization Utilities
 * Dynamic imports for large libraries and code splitting helpers
 */

import React, { lazy } from 'react';

// ===== DYNAMIC IMPORTS FOR HEAVY LIBRARIES =====

/**
 * Date utilities - Replace moment.js with date-fns for smaller bundle
 * Only import specific functions instead of the entire library
 */
export const useDateUtils = () => {
  const importDateFns = async () => {
    const [
      { format },
      { parseISO },
      { isValid },
      { addDays },
      { subDays },
      { differenceInDays },
      { startOfWeek },
      { endOfWeek }
    ] = await Promise.all([
      import('date-fns/format'),
      import('date-fns/parseISO'),
      import('date-fns/isValid'),
      import('date-fns/addDays'),
      import('date-fns/subDays'),
      import('date-fns/differenceInDays'),
      import('date-fns/startOfWeek'),
      import('date-fns/endOfWeek')
    ]);

    return {
      format,
      parseISO,
      isValid,
      addDays,
      subDays,
      differenceInDays,
      startOfWeek,
      endOfWeek
    };
  };

  return { importDateFns };
};

/**
 * Chart library - Recharts is heavy (~400KB), load only when needed
 */
export const loadChartLibrary = async () => {
  const [
    { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer },
    { BarChart, Bar },
    { PieChart, Pie, Cell },
    { AreaChart, Area }
  ] = await Promise.all([
    import('recharts'),
    import('recharts'),
    import('recharts'),
    import('recharts')
  ]);

  return {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
  };
};

/**
 * Animation library - Framer Motion is heavy, load only when needed
 */
export const loadAnimationLibrary = async () => {
  const [
    { motion },
    { AnimatePresence },
    { useAnimation },
    { useSpring },
    { useTransform }
  ] = await Promise.all([
    import('framer-motion'),
    import('framer-motion'),
    import('framer-motion'),
    import('framer-motion'),
    import('framer-motion')
  ]);

  return {
    motion,
    AnimatePresence,
    useAnimation,
    useSpring,
    useTransform
  };
};

/**
 * Form validation - Load heavy validation schemas only when needed
 */
export const loadValidationSchemas = async () => {
  const { z } = await import('zod');
  
  return {
    // Common validation schemas
    emailSchema: z.string().email('Invalid email address'),
    passwordSchema: z.string().min(8, 'Password must be at least 8 characters'),
    phoneSchema: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
    urlSchema: z.string().url('Invalid URL'),
    
    // Complex validation schemas
    userProfileSchema: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      age: z.number().min(13, 'Must be at least 13 years old').max(120, 'Invalid age'),
      bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
    }),
    
    postSchema: z.object({
      title: z.string().min(5, 'Title must be at least 5 characters').max(100),
      content: z.string().min(10, 'Content must be at least 10 characters'),
      tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed'),
      isPublic: z.boolean().default(true)
    })
  };
};

// ===== UTILITY LIBRARY REPLACEMENTS =====

/**
 * Lightweight utility functions to replace lodash
 * Only include what you actually use
 */
export const lightweightUtils = {
  // Replace lodash.debounce
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate = false
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    
    return (...args: Parameters<T>) => {
      const callNow = immediate && !timeout;
      
      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func(...args);
      }, wait);
      
      if (callNow) func(...args);
    };
  },

  // Replace lodash.throttle
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle = false;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Replace lodash.chunk
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  // Replace lodash.uniq
  uniq: <T>(array: T[]): T[] => [...new Set(array)],

  // Replace lodash.pick
  pick: <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  // Replace lodash.omit
  omit: <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
  }
};

// ===== LAZY LOADED COMPONENTS =====

/**
 * Create lazy components with better error handling and loading states
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string,
  preload = false
) => {
  const LazyComponent = lazy(() => 
    importFunc().catch(error => {
      console.error(`Failed to load ${componentName}:`, error);
      // Return a fallback component instead of crashing
      const FallbackComponent = () => React.createElement('div', {
        className: 'p-4 border border-red-200 bg-red-50 rounded-lg'
      }, [
        React.createElement('h3', {
          className: 'text-red-700 font-medium',
          key: 'title'
        }, `Failed to load ${componentName}`),
        React.createElement('p', {
          className: 'text-red-600 text-sm mt-1',
          key: 'message'
        }, 'Please refresh the page or try again later.')
      ]);
      
      return {
        default: FallbackComponent as unknown as T
      };
    })
  );

  // Preload the component if requested
  if (preload && typeof window !== 'undefined') {
    // Preload after a short delay to not block initial render
    setTimeout(() => importFunc(), 100);
  }

  (LazyComponent as any).displayName = `Lazy(${componentName})`;
  
  // Add a preload method for manual preloading
  (LazyComponent as any).preload = importFunc;
  
  return LazyComponent;
};

/**
 * Intersection Observer based preloading
 * Preload components when they're about to enter the viewport
 */
export const useIntersectionPreload = (
  importFunc: () => Promise<any>,
  options: IntersectionObserverInit = { rootMargin: '100px' }
) => {
  const [hasPreloaded, setHasPreloaded] = React.useState(false);
  const targetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!targetRef.current || hasPreloaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPreloaded) {
          importFunc();
          setHasPreloaded(true);
          observer.disconnect();
        }
      },
      options
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [importFunc, hasPreloaded, options]);

  return targetRef;
};

// ===== ICON OPTIMIZATION =====

/**
 * Load only specific icons instead of entire icon libraries
 */
export const loadIcons = async (iconNames: string[]) => {
  // Dynamically import only the icons we need from lucide-react
  const iconImports = iconNames.map(async (iconName) => {
    try {
      const icon = await import(`lucide-react/${iconName}`);
      return { [iconName]: icon.default || icon };
    } catch (error) {
      console.warn(`Icon ${iconName} not found in lucide-react`);
      return { [iconName]: null };
    }
  });

  const icons = await Promise.all(iconImports);
  return icons.reduce((acc, icon) => ({ ...acc, ...icon }), {});
};

/**
 * CSS-only icons for common use cases (smaller than icon libraries)
 */
export const cssIcons = {
  chevronDown: 'after:content-["▼"] after:text-xs',
  chevronUp: 'after:content-["▲"] after:text-xs',
  chevronRight: 'after:content-["▶"] after:text-xs',
  chevronLeft: 'after:content-["◀"] after:text-xs',
  close: 'after:content-["✕"] after:text-lg',
  check: 'after:content-["✓"] after:text-lg after:text-green-600',
  warning: 'after:content-["⚠"] after:text-lg after:text-yellow-600',
  info: 'after:content-["ℹ"] after:text-lg after:text-blue-600'
};

export default {
  useDateUtils,
  loadChartLibrary,
  loadAnimationLibrary,
  loadValidationSchemas,
  lightweightUtils,
  createLazyComponent,
  useIntersectionPreload,
  loadIcons,
  cssIcons
};
