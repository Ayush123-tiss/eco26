# EcoBingle Storybook Documentation

## 🌱 Overview

This Storybook setup showcases the EcoBingle component library with eco-themed styling, comprehensive animations, and interactive documentation. Perfect for documenting and testing React + Tailwind components in isolation.

## 🚀 Quick Start

### Installation

Since you may encounter dependency conflicts, here's the recommended approach:

```bash
# Option 1: Automatic setup (if no conflicts)
npx storybook@latest init

# Option 2: Manual installation (if conflicts occur)
npm install --save-dev storybook@latest
npm install --save-dev @storybook/react @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions

# Option 3: Use specific compatible versions
npm install --save-dev "storybook@^8.6.14" "@storybook/react@^8.6.14" "@storybook/react-vite@^8.6.14" "@storybook/addon-essentials@^8.6.14"
```

### Running Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

## 📁 Project Structure

```
client/src/
├── stories/                    # Storybook stories
│   ├── EcoButton.stories.tsx   # Animated button components
│   ├── EcoCard.stories.tsx     # Card components with eco styling
│   ├── EcoModal.stories.tsx    # Modal dialogs for various interactions
│   ├── CertificateCard.stories.tsx # 3D flip certificate cards
│   └── Animations.stories.tsx  # Animation component showcase
├── shared/
│   ├── animations/             # Animation system
│   │   ├── components/         # Animated components
│   │   ├── variants.ts         # Animation variants
│   │   └── animation-config.ts # Animation configuration
│   └── components/
│       ├── ui/                 # Base UI components
│       └── certificates/       # Certificate components
└── .storybook/
    ├── main.ts                 # Storybook configuration
    └── preview.ts              # Global preview settings
```

## 🎨 Component Library

### EcoButton (`EcoButton.stories.tsx`)
- **Variants**: `default`, `eco`, `glow`
- **Features**: Scale animations, eco-green glow effects, accessibility support
- **Use Cases**: Primary actions, secondary buttons, special celebrations

**Stories Included:**
- ✅ EcoPrimary - Main action button with eco branding
- ✅ EcoSecondary - Outline button variant
- ✅ EcoGlow - Special glow effect for important actions
- ✅ WithIcon - Buttons with Lucide icons
- ✅ ActionButtons - Collection of common action buttons
- ✅ ButtonSizes - Small, medium, large variations
- ✅ DisabledState - Disabled button styling

### EcoCard (`EcoCard.stories.tsx`)
- **Features**: Hover animations, eco-themed styling, flexible content
- **Use Cases**: Community posts, product displays, tips, statistics

**Stories Included:**
- ✅ EcoPostCard - Social media style post with user info
- ✅ EcoProductCard - E-commerce product display
- ✅ EcoTipCard - Educational content card
- ✅ EcoStatsCard - User statistics and achievements
- ✅ SimpleEcoCard - Basic card template

### EcoModal (`EcoModal.stories.tsx`)
- **Variants**: `default`, `success`, `warning`, `eco`
- **Features**: Dialog components, form interactions, confirmations
- **Use Cases**: Post creation, action confirmations, warnings

**Stories Included:**
- ✅ CreateEcoPost - Rich post creation modal
- ✅ EcoActionConfirmation - Action completion with points
- ✅ EcoWarning - Environmental impact warnings
- ✅ SimpleEcoModal - Basic modal template

### CertificateCard (`CertificateCard.stories.tsx`)
- **Features**: 3D flip animations, celebration effects, level-based styling
- **Levels**: Bronze, Silver, Gold, Platinum
- **Use Cases**: Achievement displays, certification systems

**Stories Included:**
- ✅ BronzeCertificate - Entry level achievement
- ✅ SilverCertificate - Intermediate achievement
- ✅ GoldCertificate - Advanced achievement
- ✅ PlatinumCertificate - Master level achievement
- ✅ CertificateCollection - Grid of all levels
- ✅ InteractiveDemonstration - Clickable flip demo

### Animations (`Animations.stories.tsx`)
- **Components**: AnimatedButton, AnimatedCard, BounceAnimation, FlipCard, CelebrationEffect, AnimatedInput, StaggeredGrid
- **Features**: Framer Motion integration, reduced motion support, eco-themed effects

**Stories Included:**
- ✅ AllAnimations - Complete animation showcase
- ✅ AnimatedButtonShowcase - All button animation variants
- ✅ CardAnimations - Various card animation types

## 🎯 Storybook Configuration

### `.storybook/main.ts`
- **Framework**: `@storybook/react-vite`
- **Builder**: Vite for fast builds and HMR
- **Addons**: Essentials, interactions, docs, controls, viewport, backgrounds
- **TypeScript**: Full support with react-docgen-typescript
- **Path Aliases**: `@` alias configured for imports

### `.storybook/preview.ts`
- **Global CSS**: Tailwind CSS imported
- **Themes**: Light/dark mode support
- **Backgrounds**: Eco-themed background options
- **Viewports**: Mobile, tablet, desktop presets
- **Eco Colors**: Custom background colors matching app theme

## 🌟 Features

### Eco-Themed Styling
- **Colors**: `#0F766E` (eco-green), `#14B8A6` (eco-secondary), custom gray palette
- **Gradients**: Bronze, silver, gold, platinum gradients for achievements
- **Icons**: Lucide React icons with nature themes

### Animation System
- **Framer Motion**: Smooth, performant animations
- **Accessibility**: `useReducedMotion` support for accessibility preferences
- **Variants**: Pre-configured animation variants for consistency
- **Performance**: Optimized for smooth 60fps animations

### Interactive Documentation
- **Auto-docs**: Automatic documentation generation
- **Controls**: Interactive props editing in Storybook
- **Actions**: Event logging for interactive components
- **Viewport Testing**: Test components across different screen sizes

## 🛠 Development

### Adding New Stories

1. Create a new `.stories.tsx` file in `client/src/stories/`
2. Follow the naming convention: `ComponentName.stories.tsx`
3. Use this template:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../path/to/component';

const meta: Meta<typeof YourComponent> = {
  title: 'EcoBingle/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of your component',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define your prop controls here
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### Troubleshooting

**Common Issues:**

1. **Dependency Conflicts**: Use compatible Storybook versions (8.6.14 recommended)
2. **TypeScript Errors**: Ensure all imports use the correct default/named exports
3. **Tailwind Not Loading**: Verify CSS import in `.storybook/preview.ts`
4. **Animation Issues**: Check Framer Motion compatibility and reduced motion settings

**Installation Problems:**
If automatic initialization fails, try manual installation:

```bash
# Clear npm cache
npm cache clean --force

# Install specific versions
npm install --save-dev "storybook@8.6.14" "@storybook/react@8.6.14" "@storybook/react-vite@8.6.14"

# Create .storybook folder manually if needed
mkdir .storybook
```

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## 🌍 Contributing

When adding new components:

1. **Follow eco-theme**: Use eco-green colors and nature-inspired design
2. **Add animations**: Include smooth Framer Motion animations where appropriate
3. **Accessibility**: Ensure components support reduced motion and proper ARIA labels
4. **Documentation**: Write clear stories with descriptions and use cases
5. **Responsive**: Test components across different viewport sizes

## 🚀 Building for Production

```bash
# Build Storybook for deployment
npm run build-storybook

# The built files will be in `storybook-static/`
# Deploy to any static hosting service
```

## 📋 Checklist

- ✅ Storybook configuration files created
- ✅ EcoButton stories with all variants
- ✅ EcoCard stories for different use cases
- ✅ EcoModal stories with form interactions
- ✅ CertificateCard stories with 3D animations
- ✅ Animation showcase stories
- ✅ Tailwind CSS integration
- ✅ TypeScript support
- ✅ Responsive design testing
- ✅ Accessibility features
- ⏳ Storybook dependencies installation (may need manual completion)
- ⏳ First Storybook run test

Ready to showcase your beautiful eco-themed components! 🌱✨
