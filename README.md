# 🌱 EcoBingle - Sustainable Living Platform

A comprehensive full-stack web application built with React, TypeScript, and Tailwind CSS, focused on promoting eco-friendly products and sustainable living through community engagement.

## 🌟 Live Demo

🚀 **[View Live Application](https://ayush123-tiss.github.io/eco26)** 

## ✨ Features

### 🛒 **E-Commerce System**
- **Product Management**: Complete CRUD operations for eco-friendly products
- **Shopping Cart**: Real-time cart with quantity controls and persistent storage
- **Checkout Flow**: Comprehensive checkout with multiple payment options
- **Order Management**: Complete order tracking with localStorage persistence
- **My Orders**: Detailed order history with status tracking

### 📱 **Progressive Web App (PWA)**
- **Offline Support**: Service worker for offline functionality
- **Installable**: Add to home screen capability
- **Background Sync**: Auto-sync when connection is restored
- **Push Notifications**: Real-time notifications support

### 🎨 **Animations & UX**
- **Framer Motion**: Smooth animations and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with keyboard navigation
- **Loading States**: Skeleton screens and smooth transitions

### 👥 **Community Features**
- **Blog Publishing**: Rich text editor for eco-focused content
- **Community Creation**: User-generated communities with moderation
- **EcoHubs Forum**: Discussion threads with upvoting and commenting
- **Content Management**: Comprehensive context-based state management

### 🔧 **Developer Experience**
- **TypeScript**: Full type safety across the application
- **Storybook**: Component documentation and testing
- **Testing**: Comprehensive test suite with Vitest
- **Bundle Optimization**: Code splitting and performance optimization

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom eco-theme
- **Animations**: Framer Motion
- **Routing**: Wouter (lightweight routing)
- **State Management**: React Context API with useReducer
- **PWA**: Vite PWA Plugin with Workbox

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: In-memory fallback for development

### Development Tools
- **Build Tool**: Vite
- **Documentation**: Storybook
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier with Tailwind plugin

### Deployment
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Domain**: Custom domain support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayush123-tiss/eco26.git
   cd eco26
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run test suite
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Documentation
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook for production

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
```

## 📱 PWA Features

### Installation
- **Desktop**: Chrome, Edge, Safari support
- **Mobile**: Android (Chrome) and iOS (Safari) support
- **Offline**: Full offline functionality with service worker

### Capabilities
- ✅ Offline browsing
- ✅ Background sync
- ✅ Push notifications
- ✅ App-like experience
- ✅ Auto-updates

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#0F766E, #14B8A6)
- **Secondary**: Emerald (#10B981, #059669)
- **Accent**: Blue (#3B82F6)
- **Success**: Green (#22C55E)
- **Warning**: Yellow (#FEF3C7)

### Typography
- **Font**: Inter (system font fallback)
- **Scale**: Tailwind's default type scale
- **Responsive**: Fluid typography with clamp()

### Components
- **Cards**: Glass-morphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Responsive with mobile menu

## 🌐 Deployment

### GitHub Pages
The application is automatically deployed to GitHub Pages using GitHub Actions.

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **Automatic deployment**
   - GitHub Actions builds the application
   - Deploys to GitHub Pages
   - Updates live URL

### Custom Domain (Optional)
1. Add `CNAME` file to `public/` directory
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: User workflows and interactions
- **E2E Tests**: Critical user journeys
- **Visual Tests**: Component appearance in Storybook

### Running Tests
```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📚 Documentation

### Storybook
Component documentation is available in Storybook:
```bash
npm run storybook
```

### API Documentation
- **Product API**: RESTful endpoints for product management
- **Order API**: Order creation and tracking
- **Community API**: Forum and community features

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates
- `chore:` Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **React Community** for the excellent ecosystem
- **Vite** for blazing fast development experience
- **Unsplash** for high-quality eco-themed images

## 📞 Support

For support, email support@ecobingle.com or join our Discord community.

---

**Made with 💚 for a sustainable future**
