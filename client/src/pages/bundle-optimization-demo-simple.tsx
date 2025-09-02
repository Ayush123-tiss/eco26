import React from 'react';
import { Card } from '@/shared/components/ui/card';

export function BundleOptimizationDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Bundle Info
          </h1>
          <p className="text-xl text-gray-600">
            Basic information about app performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Bundle Size</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Size:</span>
                <span className="font-medium">~1.2 MB</span>
              </div>
              <div className="flex justify-between">
                <span>Gzipped:</span>
                <span className="font-medium">~380 KB</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Load Time</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Average:</span>
                <span className="font-medium">~1.4s</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-medium">Fast</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BundleOptimizationDemo;
