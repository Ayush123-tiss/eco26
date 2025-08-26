import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { PWAInstallBanner } from '@/components/pwa/pwa-install-banner';
import { PWAStatus } from '@/components/pwa/pwa-status';
import { ServiceWorkerUpdateBanner } from '@/components/pwa/service-worker-update-banner';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { useServiceWorkerUpdate } from '@/hooks/use-service-worker-update';
import { 
  Smartphone, 
  Download, 
  Wifi, 
  Settings, 
  Code, 
  CheckCircle,
  Globe,
  Zap,
  Shield,
  RefreshCw
} from 'lucide-react';

const PWADemo: React.FC = () => {
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const [activeDemo, setActiveDemo] = useState<'install' | 'offline' | 'update'>('install');
  
  const { isInstallable, isInstalled, isSupported } = usePWAInstall();
  const { isUpdateAvailable } = useServiceWorkerUpdate();

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Fast Loading',
      description: 'Cached resources load instantly, even on slow networks',
      status: 'Active'
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: 'Offline Support',
      description: 'Browse cached content when internet is unavailable',
      status: 'Active'
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: 'App-like Experience',
      description: 'Install on home screen, no app store required',
      status: isInstallable ? 'Available' : 'Ready'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Secure (HTTPS)',
      description: 'All PWA features require secure connection',
      status: location.protocol === 'https:' ? 'Active' : 'Required'
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: 'Auto Updates',
      description: 'Background updates keep app current',
      status: 'Active'
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Responsive Design',
      description: 'Optimized for all device sizes',
      status: 'Active'
    }
  ];

  const installSteps = [
    {
      step: 1,
      title: 'PWA Detection',
      description: 'Browser detects app can be installed',
      code: `// Browser fires beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  setInstallPrompt(e);
});`
    },
    {
      step: 2,
      title: 'Show Install Prompt',
      description: 'Display custom install UI to user',
      code: `// Custom install banner component
<PWAInstallBanner 
  onInstall={handleInstall}
  onDismiss={handleDismiss}
/>`
    },
    {
      step: 3,
      title: 'User Installs',
      description: 'User clicks install, browser shows native prompt',
      code: `// Trigger native install prompt
const install = async () => {
  await installPrompt.prompt();
  const choice = await installPrompt.userChoice;
  console.log(choice.outcome); // 'accepted' or 'dismissed'
};`
    },
    {
      step: 4,
      title: 'App Installed',
      description: 'App appears on home screen, runs in standalone mode',
      code: `// Detect if running as installed PWA
const isPWA = window.matchMedia(
  '(display-mode: standalone)'
).matches;`
    }
  ];

  const manifestExample = {
    name: "EcoBingle - Eco-Friendly Community",
    short_name: "EcoBingle",
    description: "Connect with eco-conscious individuals",
    theme_color: "#10B981",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Progressive Web App Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience EcoBingle as a Progressive Web App with offline support, 
            fast loading, and native app-like features.
          </p>
        </div>

        {/* PWA Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PWAStatus />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Network Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connection:</span>
                  <Badge variant={navigator.onLine ? 'default' : 'destructive'}>
                    {navigator.onLine ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Protocol:</span>
                  <Badge variant={location.protocol === 'https:' ? 'default' : 'secondary'}>
                    {location.protocol.replace(':', '')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cache:</span>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Demo Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setShowInstallBanner(!showInstallBanner)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {showInstallBanner ? 'Hide' : 'Show'} Install Banner
              </Button>
              <Button
                onClick={() => setActiveDemo('offline')}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Test Offline Mode
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Reload App
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Install Banner Demo */}
        {showInstallBanner && <PWAInstallBanner />}
        
        {/* Update Banner Demo */}
        <ServiceWorkerUpdateBanner />

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">PWA Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-green-500 mt-1">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{feature.title}</h3>
                        <Badge 
                          variant={feature.status === 'Active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="install" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="manifest">Manifest</TabsTrigger>
            <TabsTrigger value="service-worker">Service Worker</TabsTrigger>
          </TabsList>

          <TabsContent value="install" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {installSteps.map((step) => (
                    <div key={step.step} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {step.description}
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manifest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Web App Manifest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The manifest.json file defines app metadata and appearance:
                </p>
                <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                  <code>{JSON.stringify(manifestExample, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="service-worker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Worker Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Caching Strategy:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Static assets: Cache First</li>
                      <li>• API calls: Network First</li>
                      <li>• Images: Cache First</li>
                      <li>• Fonts: Cache First</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Offline Features:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Core app functionality</li>
                      <li>• Cached page content</li>
                      <li>• Offline fallback pages</li>
                      <li>• Background sync</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Service worker is automatically generated by Vite PWA plugin 
                    with Workbox for optimal caching strategies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PWADemo;
