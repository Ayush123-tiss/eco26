import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface ServiceWorkerUpdateBannerProps {
  className?: string;
}

export const ServiceWorkerUpdateBanner: React.FC<ServiceWorkerUpdateBannerProps> = ({ 
  className = '' 
}) => {
  // Simplified - no complex service worker management
  return null;
};

export default ServiceWorkerUpdateBanner;
    setIsDismissed(true);
  };

  return (
    <Card className={`fixed bottom-4 left-4 right-4 z-50 shadow-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 md:left-auto md:w-96 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-blue-800">
                App Update Available
              </h3>
              <p className="text-xs text-blue-600 mt-1">
                A new version of EcoBingle is ready. Update now to get the latest features and improvements.
              </p>
              
              <div className="flex items-center space-x-2 mt-3">
                <Button
                  onClick={handleUpdate}
                  disabled={isUpdateInstalling}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  {isUpdateInstalling ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Download className="h-3 w-3 mr-1" />
                      Update Now
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 text-xs"
                >
                  Later
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceWorkerUpdateBanner;
