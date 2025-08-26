# Theme System Implementation

## Overview

A comprehensive theme system built with React Context API, TypeScript, and Tailwind CSS that provides:

- **Light/Dark/System modes** with automatic system preference detection
- **Custom accent colors** (6 predefined options)
- **localStorage persistence** across browser sessions
- **CSS custom properties** for seamless Tailwind integration
- **WCAG 2.1 AA accessibility compliance**
- **Keyboard shortcuts** (Ctrl/Cmd + T for quick toggle)

## Architecture

### Core Components

#### 1. ThemeProvider (`shared/contexts/theme-context.tsx`)
- **React Context API** for theme state management
- **localStorage integration** for persistence
- **CSS custom properties** for dynamic styling
- **System preference detection** with media query listeners
- **Type-safe interfaces** with TypeScript

```tsx
// Usage in your app
import { ThemeProvider } from '@/shared/contexts/theme-context';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

#### 2. ThemeToggle (`shared/components/theme/theme-toggle.tsx`)
- **Simple toggle button** for quick light/dark switching
- **Advanced dropdown** with mode selection and accent colors
- **Size variants** (sm, default, lg)
- **Accessibility features** with ARIA labels and keyboard navigation

```tsx
// Simple toggle
<ThemeToggle />

// Advanced with dropdown
<ThemeToggle variant="advanced" />

// Different sizes
<ThemeToggle size="sm" />
```

#### 3. CSS Configuration (`styles/globals.css`)
- **CSS custom properties** for all theme colors
- **Light and dark mode** color definitions
- **Accent color variables** for dynamic theming
- **Smooth transitions** between theme changes

#### 4. Tailwind Configuration (`tailwind.config.ts`)
- **Dark mode class strategy** (`darkMode: 'class'`)
- **Extended color palette** with CSS variables
- **Custom theme colors** for accent color system
- **Responsive design support**

## Features

### Theme Modes
- **Light Mode**: High contrast with light backgrounds
- **Dark Mode**: Low light optimized with dark backgrounds  
- **System Mode**: Automatically follows OS preference

### Accent Colors
- **Blue**: Primary brand color (default)
- **Green**: Eco-friendly theme
- **Purple**: Creative/artistic theme
- **Orange**: Energetic/warm theme
- **Red**: Alert/important theme
- **Teal**: Calm/professional theme

### Accessibility
- **WCAG 2.1 AA compliance** with proper contrast ratios
- **Keyboard navigation** support
- **Screen reader friendly** with ARIA labels
- **Focus indicators** for all interactive elements
- **Color independence** - no meaning conveyed by color alone

### Persistence
- **localStorage** automatically saves preferences
- **Cross-session** persistence
- **Browser compatibility** with fallback to defaults
- **Real-time sync** across multiple tabs

## Integration Guide

### 1. Setup Theme Provider

Wrap your app with the ThemeProvider:

```tsx
import { ThemeProvider } from '@/shared/contexts/theme-context';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Your components */}
      </div>
    </ThemeProvider>
  );
}
```

### 2. Use Theme Hook

Access theme state in components:

```tsx
import { useTheme } from '@/shared/contexts/theme-context';

function MyComponent() {
  const { theme, accentColor, setTheme, setAccentColor } = useTheme();
  
  return (
    <div className={`bg-theme-${accentColor} text-white`}>
      Current theme: {theme}
    </div>
  );
}
```

### 3. Theme-Aware Styling

Use Tailwind classes that respond to themes:

```tsx
// Background colors
<div className="bg-background text-foreground">
  
// Primary colors
<button className="bg-primary text-primary-foreground">
  
// Accent colors  
<div className="bg-theme-blue text-white">

// Responsive to theme changes
<card className="bg-card text-card-foreground border-border">
```

### 4. Navigation Integration

The theme toggle is automatically integrated into:
- **Desktop navbar**: Top-right corner
- **Mobile menu**: Footer section with advanced options
- **Responsive design**: Adapts to screen size

## Color System

### Semantic Colors
```css
--background: Main page background
--foreground: Primary text color
--card: Card/surface background
--primary: Brand primary color
--secondary: Secondary elements
--muted: Subdued backgrounds
--accent: Accent highlights
--border: Border colors
--ring: Focus ring colors
```

### Theme Colors
```css
--theme-blue: #4F46E5
--theme-green: #059669
--theme-purple: #7C3AED
--theme-orange: #EA580C
--theme-red: #DC2626
--theme-teal: #0891B2
```

## Development

### Adding New Accent Colors

1. Add color to the `AccentColor` type:
```tsx
export type AccentColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'pink';
```

2. Add CSS variable to globals.css:
```css
--theme-pink: hsl(330 81% 60%);
```

3. Add to Tailwind config:
```tsx
theme: {
  pink: 'var(--theme-pink)',
}
```

### Custom Theme Integration

For custom components, ensure they use semantic color classes:

```tsx
// Good - theme aware
<div className="bg-background border-border text-foreground">

// Bad - hardcoded colors  
<div className="bg-white border-gray-200 text-black">
```

## Performance

- **CSS custom properties** for instant theme switching
- **localStorage caching** prevents flash of unstyled content
- **Minimal JavaScript** - themes applied via CSS classes
- **No re-renders** for theme changes in unrelated components
- **Prefers-reduced-motion** support for animations

## Browser Support

- **Modern browsers** with CSS custom properties support
- **Graceful fallback** to default theme if localStorage unavailable
- **IE11+ compatibility** (with polyfills)
- **Mobile optimized** touch interactions

## Testing

Demo page available at `/theme` showcasing:
- All theme modes and accent colors
- Component variations and states
- Accessibility features demonstration
- Real-time theme switching
- Persistence testing across page reloads

## Keyboard Shortcuts

- **Ctrl/Cmd + T**: Quick theme toggle (light ↔ dark)
- **Tab navigation**: Through theme selection options
- **Enter/Space**: Activate theme options
- **Esc**: Close advanced theme dropdown

## Migration Guide

To migrate existing components:

1. Replace hardcoded colors with semantic classes
2. Test in both light and dark modes
3. Ensure proper contrast ratios
4. Add theme-aware hover/focus states
5. Verify accessibility with screen readers

## Future Enhancements

- Custom color picker for accent colors
- High contrast mode for accessibility
- Multiple theme presets (corporate, eco, etc.)
- CSS-in-JS integration for dynamic theming
- Animation preferences and reduced motion support

---

**Built with modern React patterns and accessibility-first design principles.**
