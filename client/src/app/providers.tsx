import { Suspense } from 'react';
import { Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/shared/components/ui/toaster';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { ThemeProvider } from '@/shared/context/theme-context';
import { queryClient } from '@/shared/services/query-client';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="eco-ui-theme">
        <TooltipProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Toaster />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
