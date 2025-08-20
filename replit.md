# Overview

This is a Reddit-style social platform called "EcoBingle" focused on environmental and sustainability topics. The application allows users to browse and interact with communities, create posts, vote on content, and engage in discussions around eco-friendly topics. It features a modern interface with separate sections for community posts, blogs, and news articles.

The platform is built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL with Drizzle ORM for data management. The UI is built with shadcn/ui components and styled with Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom eco-themed color variables and design system

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API structure with organized route handlers
- **Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation for development
- **Middleware**: Custom logging middleware for API request tracking
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle with schema definitions in shared directory
- **Connection**: Neon Database serverless PostgreSQL connection
- **Development**: In-memory storage implementation with seeded data for development

## Database Schema
- **Users**: Authentication and profile management
- **Communities**: Eco-focused communities with metadata (icons, colors, member counts)
- **Threads**: Posts with support for text, images, and categorization
- **Votes**: Upvote/downvote system for content ranking
- **Comments**: Threaded discussion system for posts

## Authentication and Authorization
- Currently using placeholder user system ("current-user")
- Session management configured with connect-pg-simple for PostgreSQL sessions
- Authentication system ready for implementation but not yet active

## UI/UX Design Patterns
- **Component Structure**: Atomic design with reusable UI components
- **Theme System**: CSS custom properties for consistent theming
- **Responsive Design**: Mobile-first approach with collapsible sidebars
- **Accessibility**: Built on Radix UI primitives ensuring ARIA compliance

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-zod**: Schema validation integration with Zod

## UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Conditional className utility

## State Management and Data Fetching
- **@tanstack/react-query**: Powerful data synchronization for React
- **@hookform/resolvers**: Form validation resolvers
- **react-hook-form**: Performant forms with easy validation

## Development and Build Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: Secure URL-friendly unique string ID generator
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component library

## Production Considerations
- Database migrations handled through Drizzle Kit
- Environment-based configuration for database connections
- Production build optimization with Vite and esbuild
- Static asset serving through Express in production mode