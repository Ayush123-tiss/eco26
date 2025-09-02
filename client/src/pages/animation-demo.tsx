import React from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

const AnimationDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Animations
          </h1>
          <p className="text-xl text-gray-600">
            Basic CSS animations for smooth user experience
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Basic Hover Effects</h2>
            <div className="space-y-4">
              <Button className="transition-all hover:scale-105">
                Hover to Scale
              </Button>
              <Button variant="outline" className="transition-colors hover:bg-gray-100">
                Simple Hover
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Fade Animations</h2>
            <div className="animate-pulse bg-gray-200 h-20 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Loading Animation</span>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Simple Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
                <h3 className="font-semibold">Card 1</h3>
                <p className="text-gray-600">Simple hover effect</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
                <h3 className="font-semibold">Card 2</h3>
                <p className="text-gray-600">Basic animations only</p>
              </div>
            </div>
          </Card>

          <div className="text-center py-8">
            <p className="text-gray-600">
              All animations use simple CSS transitions for better performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDemo;


