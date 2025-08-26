import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  mode: ThemeMode;
  accentColor: AccentColor;
  isDark: boolean;
  colors: ThemeColors;
}

interface ThemeContextType {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
  toggleTheme: () => void;
}

// Default theme configuration
const defaultAccentColor: AccentColor = 'blue';
const defaultThemeMode: ThemeMode = 'system';

// Color palettes for different accent colors
const accentColorPalettes = {
  blue: {
    light: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#1d4ed8'
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#93c5fd',
      accent: '#3b82f6'
    }
  },
  green: {
    light: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#059669'
    },
    dark: {
      primary: '#34d399',
      secondary: '#6ee7b7',
      accent: '#10b981'
    }
  },
  purple: {
    light: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#7c3aed'
    },
    dark: {
      primary: '#a78bfa',
      secondary: '#c4b5fd',
      accent: '#8b5cf6'
    }
  },
  orange: {
    light: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#ea580c'
    },
    dark: {
      primary: '#fb923c',
      secondary: '#fdba74',
      accent: '#f97316'
    }
  },
  red: {
    light: {
      primary: '#ef4444',
      secondary: '#f87171',
      accent: '#dc2626'
    },
    dark: {
      primary: '#f87171',
      secondary: '#fca5a5',
      accent: '#ef4444'
    }
  },
  teal: {
    light: {
      primary: '#14b8a6',
      secondary: '#5eead4',
      accent: '#0d9488'
    },
    dark: {
      primary: '#5eead4',
      secondary: '#99f6e4',
      accent: '#14b8a6'
    }
  }
};

// Base color schemes
const lightColors: Omit<ThemeColors, 'primary' | 'secondary' | 'accent'> = {
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

const darkColors: Omit<ThemeColors, 'primary' | 'secondary' | 'accent'> = {
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  border: '#334155',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171'
};

// Helper function to detect system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Helper function to determine if theme should be dark
const getIsDark = (mode: ThemeMode): boolean => {
  if (mode === 'system') {
    return getSystemTheme() === 'dark';
  }
  return mode === 'dark';
};

// Helper function to build complete theme colors
const buildThemeColors = (mode: ThemeMode, accentColor: AccentColor): ThemeColors => {
  const isDark = getIsDark(mode);
  const baseColors = isDark ? darkColors : lightColors;
  const accentColors = accentColorPalettes[accentColor][isDark ? 'dark' : 'light'];

  return {
    ...baseColors,
    ...accentColors
  };
};

// Storage keys
const THEME_MODE_KEY = 'ecobingle-theme-mode';
const ACCENT_COLOR_KEY = 'ecobingle-accent-color';

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  defaultAccentColor?: AccentColor;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = defaultThemeMode,
  defaultAccentColor = defaultAccentColor
}) => {
  // Initialize theme state
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_MODE_KEY) as ThemeMode;
      return stored || defaultMode;
    }
    return defaultMode;
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ACCENT_COLOR_KEY) as AccentColor;
      return stored || defaultAccentColor;
    }
    return defaultAccentColor;
  });

  // Build current theme
  const isDark = getIsDark(themeMode);
  const colors = buildThemeColors(themeMode, accentColor);

  const theme: Theme = {
    mode: themeMode,
    accentColor,
    isDark,
    colors
  };

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply CSS custom properties for dynamic colors
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply accent color data attribute for Tailwind variants
    root.setAttribute('data-accent-color', accentColor);
  }, [isDark, colors, accentColor]);

  // Listen for system theme changes
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Force re-render when system theme changes
      setThemeModeState(current => current === 'system' ? 'system' : current);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Theme mode setter with persistence
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem(THEME_MODE_KEY, mode);
  };

  // Accent color setter with persistence
  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem(ACCENT_COLOR_KEY, color);
  };

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const contextValue: ThemeContextType = {
    theme,
    setThemeMode,
    setAccentColor,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme color utilities
export const getThemeColor = (colorKey: keyof ThemeColors): string => {
  return `var(--color-${colorKey})`;
};

// CSS class utilities
export const themeClasses = {
  background: 'bg-[var(--color-background)]',
  surface: 'bg-[var(--color-surface)]',
  text: 'text-[var(--color-text)]',
  textSecondary: 'text-[var(--color-textSecondary)]',
  primary: 'bg-[var(--color-primary)]',
  secondary: 'bg-[var(--color-secondary)]',
  accent: 'bg-[var(--color-accent)]',
  border: 'border-[var(--color-border)]'
};
