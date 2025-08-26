# Modern React Project Structure

This document outlines the scalable folder structure implemented for EcoBingle Connect.

## 📁 Project Structure

```
client/src/
├── app/                          # App-level configuration
│   ├── App.tsx                   # Main App component
│   ├── providers.tsx             # Global providers (Theme, Query, etc.)
│   ├── router.tsx                # App routing configuration
│   └── index.ts                  # App exports
│
├── features/                     # Feature-based modules
│   ├── community/                # Community feature
│   │   ├── components/           # Feature-specific components
│   │   │   ├── thread-card.tsx
│   │   │   ├── create-post-dialog.tsx
│   │   │   └── index.ts
│   │   ├── pages/                # Feature pages
│   │   │   ├── home-page.tsx
│   │   │   └── index.ts
│   │   ├── hooks/                # Feature-specific hooks
│   │   │   └── index.ts
│   │   └── services/             # Feature API services
│   │       └── index.ts
│   │
│   └── products/                 # Products feature
│       ├── components/
│       ├── pages/
│       │   ├── products-page.tsx
│       │   └── index.ts
│       └── hooks/
│
├── shared/                       # Shared across features
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── left-sidebar.tsx
│   │   │   ├── right-sidebar.tsx
│   │   │   └── index.ts
│   │   ├── loading-spinner.tsx   # Common components
│   │   ├── error-boundary.tsx
│   │   ├── not-found-page.tsx
│   │   └── index.ts              # Component exports
│   │
│   ├── hooks/                    # Shared custom hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── index.ts              # Common hooks (debounce, localStorage, etc.)
│   │   └── ...
│   │
│   ├── services/                 # API and external services
│   │   ├── api-config.ts         # API configuration
│   │   ├── http-client.ts        # HTTP client setup
│   │   ├── query-client.ts       # React Query setup
│   │   └── index.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── index.ts              # Common utilities
│   │   ├── legacy-utils.ts       # Legacy utils
│   │   └── ...
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts              # Common types
│   │   └── ...
│   │
│   ├── constants/                # App constants
│   │   ├── app-constants.ts      # UI constants, colors, etc.
│   │   ├── env-config.ts         # Environment config
│   │   └── index.ts
│   │
│   └── context/                  # React Context providers
│       ├── theme-context.tsx     # Theme provider
│       └── index.ts
│
├── assets/                       # Static assets
│   ├── images/                   # Application images
│   │   └── index.ts
│   ├── icons/                    # Custom icons
│   │   └── index.ts
│   ├── fonts/                    # Custom fonts
│   └── README.md
│
├── styles/                       # Global styles
│   ├── globals.css               # Global CSS (moved from index.css)
│   ├── components.css            # Component-specific styles
│   └── utilities.css             # Utility classes
│
├── __tests__/                    # Test files
│   ├── App.test.tsx
│   ├── test-utils.tsx
│   └── ...
│
└── main.tsx                      # Application entry point
```

## 🏗️ Architecture Principles

### 1. **Feature-Based Organization**
- Features are self-contained modules (community, products)
- Each feature has its own components, pages, hooks, and services
- Reduces coupling between features

### 2. **Shared Resources**
- Common components, hooks, and utilities in `shared/`
- Promotes reusability across features
- Maintains consistency

### 3. **Clear Separation of Concerns**
- **App**: Global configuration and setup
- **Features**: Business logic and feature-specific code
- **Shared**: Reusable resources
- **Assets**: Static files
- **Styles**: Styling and theming

### 4. **Scalable Import Patterns**
```tsx
// Feature imports
import { ThreadCard } from '@/features/community/components';
import { HomePage } from '@/features/community/pages';

// Shared imports
import { Button, Card } from '@/shared/components';
import { useDebounce } from '@/shared/hooks';
import { httpClient } from '@/shared/services';

// Asset imports
import { Logo } from '@/assets/images';
```

## 📋 Best Practices Implemented

### ✅ **Component Organization**
- Feature-specific components in feature folders
- Shared UI components in `shared/components/ui/`
- Layout components separated from business logic

### ✅ **Type Safety**
- Centralized type definitions in `shared/types/`
- Feature-specific types within features
- Proper TypeScript configuration

### ✅ **State Management**
- React Query for server state (`shared/services/`)
- Context for global client state (`shared/context/`)
- Local state within components

### ✅ **Styling Strategy**
- Tailwind CSS with utility classes
- Component-specific styles in `styles/components.css`
- Global styles in `styles/globals.css`

### ✅ **Testing Structure**
- Test files in dedicated `__tests__/` directory
- Test utilities for consistent testing setup
- Co-located tests for features (future)

### ✅ **Performance Optimization**
- Lazy loading for route components
- Tree-shaking friendly exports
- Optimized bundle splitting

## 🔄 Migration Benefits

### **Before**: Flat Structure
```
src/
├── components/
├── pages/
├── hooks/
├── lib/
└── ...
```

### **After**: Scalable Structure
- ✅ Feature-based organization
- ✅ Clear dependencies
- ✅ Better code discovery
- ✅ Easier maintenance
- ✅ Team scalability

## 🚀 Next Steps

1. **Update Import Paths**: Fix all import statements to use new structure
2. **Add Missing Components**: Create placeholder components for missing files
3. **Implement Barrel Exports**: Add index.ts files for clean imports
4. **Setup Testing**: Configure testing framework for new structure
5. **Documentation**: Add feature-specific README files

This structure supports large-scale React applications and provides:
- **Maintainability**: Easy to locate and modify code
- **Scalability**: Simple to add new features
- **Team Collaboration**: Clear ownership and boundaries
- **Performance**: Optimized for code splitting and lazy loading
