# EcoBingle Connect - Local Development Setup

This is a fullstack React + Express application for an eco-friendly social platform and marketplace.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript + Drizzle ORM
- **Database**: PostgreSQL (with in-memory storage fallback for development)
- **Routing**: Wouter (lightweight React router)
- **State**: TanStack Query (React Query)

## 📦 Project Structure

```
├── client/          # React frontend application
├── server/          # Express backend API
├── shared/          # Shared TypeScript types and schemas
├── attached_assets/ # Static assets and images
└── dist/           # Production build output
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation & Running

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

   This will start:
   - Backend API server on `http://localhost:5000`
   - Frontend dev server on `http://localhost:3000` (with proxy to backend)

3. **Open your browser:**
   - Visit `http://localhost:5000` to see the full application

## 📝 Available Scripts

- `npm run dev` - Start fullstack development server
- `npm run dev:client` - Start only frontend development server
- `npm run dev:server` - Start only backend development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run preview` - Preview production build locally

## 🌱 Features

- **Eco People**: Community posts, discussions, and social features
- **Eco Products**: Sustainable product marketplace with filtering
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Hot Reload**: Fast development with Vite HMR

## 🗃️ Database

The application currently uses **in-memory storage** for development, so no database setup is required. Data is seeded automatically when the server starts.

To connect to a real PostgreSQL database later:

1. Update the `.env` file with your `DATABASE_URL`
2. Run `npm run db:push` to sync the schema

## 🔧 Configuration

Environment variables (optional):

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `DATABASE_URL` - PostgreSQL connection string

## 📱 Development Tips

- The app uses a proxy setup - frontend calls to `/api/*` are forwarded to the backend
- Tailwind CSS is configured with custom eco-friendly color variables
- shadcn/ui components are pre-installed and ready to use
- React Query handles all API state management

## 🎨 UI Components

The project uses shadcn/ui components with custom eco-friendly theming:

- Custom green, blue, and gray color palette
- Responsive design with mobile-first approach
- Accessible components with proper ARIA labels

## 🤝 Contributing

1. The codebase follows modern React and TypeScript best practices
2. Components use functional components with hooks
3. API routes follow RESTful conventions
4. Shared types ensure type safety between frontend and backend

Enjoy building with EcoBingle Connect! 🌱
