import { queryClient } from '@/shared/services/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/shared/components/ui/toaster';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { AppRouter } from '@/app/router';
import { RouteMonitor } from '@/shared/components/route-monitor';
import { ThemeProvider } from '@/shared/context/theme-context';
import { PWAInstallBanner } from '@/components/pwa/pwa-install-banner';
import { ServiceWorkerUpdateBanner } from '@/components/pwa/service-worker-update-banner';
import { Router } from 'wouter';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router>
            <Toaster />
            <PWAInstallBanner showMinimized />
            <ServiceWorkerUpdateBanner />
            <AppRouter />
            <RouteMonitor />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
