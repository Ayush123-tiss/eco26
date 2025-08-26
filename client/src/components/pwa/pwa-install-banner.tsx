import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { Download, X, Smartphone, Monitor, Leaf } from 'lucide-react';

interface PWAInstallBannerProps {
  className?: string;
  showMinimized?: boolean;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ 
  className = '',
  showMinimized = false 
}) => {
  const { isInstallable, isInstalled, install, dismiss } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Don't show if not installable, already installed, or manually dismissed
  if (!isInstallable || isInstalled || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    try {
      setIsInstalling(true);
      await install();
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    dismiss();
  };

  if (showMinimized) {
    return (
      <Button
        onClick={handleInstall}
        disabled={isInstalling}
        className={`fixed bottom-4 right-4 z-50 shadow-lg ${className}`}
        size="sm"
      >
        <Download className="h-4 w-4 mr-1" />
        Install App
      </Button>
    );
  }

  return (
    <Card className={`fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-green-800">
                Install EcoBingle App
              </h3>
              <p className="text-sm text-green-600 mt-1">
                Get quick access to eco-friendly products and community features. 
                Works offline and loads faster!
              </p>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-green-500">
                <div className="flex items-center">
                  <Smartphone className="h-3 w-3 mr-1" />
                  Mobile Friendly
                </div>
                <div className="flex items-center">
                  <Monitor className="h-3 w-3 mr-1" />
                  Desktop Support
                </div>
                <div className="flex items-center">
                  <Leaf className="h-3 w-3 mr-1" />
                  Offline Ready
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              {isInstalling ? 'Installing...' : 'Install'}
            </Button>
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAInstallBanner;
