import React from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle, 
  Smartphone, 
  Globe,
  RefreshCw,
  X
} from 'lucide-react';

interface PWAStatusProps {
  className?: string;
}

export const PWAStatus: React.FC<PWAStatusProps> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isSupported } = usePWAInstall();
  
  // Check if we're online
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  
  // Check if we're running as a PWA
  const isPWAMode = typeof window !== 'undefined' && 
    window.matchMedia('(display-mode: standalone)').matches;

  const getInstallStatus = () => {
    if (!isSupported) return { status: 'Not Supported', color: 'destructive' };
    if (isInstalled || isPWAMode) return { status: 'Installed', color: 'default' };
    if (isInstallable) return { status: 'Available', color: 'secondary' };
    return { status: 'Not Available', color: 'outline' };
  };

  const installStatus = getInstallStatus();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5" />
          <span>PWA Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Installation Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Installation:</span>
          <Badge variant={installStatus.color as any}>
            {installStatus.status}
          </Badge>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Network:</span>
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <Badge variant={isOnline ? 'default' : 'destructive'}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </div>

        {/* Service Worker Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Service Worker:</span>
          <div className="flex items-center space-x-1">
            {isSupported ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
            <Badge variant={isSupported ? 'default' : 'destructive'}>
              {isSupported ? 'Supported' : 'Not Supported'}
            </Badge>
          </div>
        </div>

        {/* Display Mode */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Display Mode:</span>
          <div className="flex items-center space-x-1">
            {isPWAMode ? (
              <Smartphone className="h-4 w-4 text-blue-500" />
            ) : (
              <Globe className="h-4 w-4 text-gray-500" />
            )}
            <Badge variant={isPWAMode ? 'default' : 'outline'}>
              {isPWAMode ? 'Standalone' : 'Browser'}
            </Badge>
          </div>
        </div>

        {/* Features Available */}
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Available Features:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Offline Access</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Fast Loading</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Home Screen</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Push Notifications</span>
            </div>
          </div>
        </div>

        {/* Cache Information */}
        {isPWAMode && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cache Status:</span>
              <div className="flex items-center space-x-1">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PWAStatus;
