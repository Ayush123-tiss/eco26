import React from 'react';
import { Card } from '@/shared/components/ui/card';

const PWADemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Progressive Web App Features
          </h1>
          <p className="text-xl text-gray-600">
            Basic PWA functionality for EcoBingle
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Offline Support</h2>
            <p className="text-gray-600 mb-4">
              The app works offline with cached content for better user experience.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                ✅ Basic offline functionality enabled
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Installation</h2>
            <p className="text-gray-600 mb-4">
              Users can install the app on their devices for quick access.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                ✅ PWA manifest configured
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Performance</h2>
            <p className="text-gray-600 mb-4">
              Fast loading and responsive design optimized for all devices.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                ✅ Optimized for mobile and desktop
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PWADemo;
