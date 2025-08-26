import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface RouteMetrics {
  path: string;
  loadTime: number;
  timestamp: number;
  chunkSize?: number;
  errors?: string[];
}

interface PerformanceData {
  routes: RouteMetrics[];
  totalChunks: number;
  totalLoadTime: number;
  averageLoadTime: number;
  errorRate: number;
}

export const RouteMonitor: React.FC = () => {
  const [location] = useLocation();
  const [metrics, setMetrics] = useState<RouteMetrics[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    
    // Monitor navigation
    const handleLoad = () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      const newMetric: RouteMetrics = {
        path: location,
        loadTime,
        timestamp: Date.now()
      };

      setMetrics(prev => [...prev.slice(-9), newMetric]); // Keep last 10 entries
      
      // Log performance
      console.log(`🚀 Route ${location} loaded in ${loadTime.toFixed(2)}ms`);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [location]);

  const performanceData: PerformanceData = {
    routes: metrics,
    totalChunks: metrics.length,
    totalLoadTime: metrics.reduce((sum, m) => sum + m.loadTime, 0),
    averageLoadTime: metrics.length > 0 ? metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length : 0,
    errorRate: 0 // Would track actual errors in production
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development' && !showDebug) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm hover:bg-blue-700 transition-colors"
      >
        📊 Route Performance
      </button>
      
      {showDebug && (
        <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Route Metrics</h3>
            <button
              onClick={() => setMetrics([])}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium">Total Routes</div>
                <div className="text-gray-600">{performanceData.totalChunks}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="font-medium">Avg Load Time</div>
                <div className="text-gray-600">{performanceData.averageLoadTime.toFixed(2)}ms</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recent Navigation</h4>
              <div className="space-y-1">
                {metrics.slice(-5).reverse().map((metric, index) => (
                  <div key={index} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
                    <span className="font-mono text-blue-600 truncate">{metric.path}</span>
                    <span className={`font-medium ${
                      metric.loadTime < 100 ? 'text-green-600' :
                      metric.loadTime < 300 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {metric.loadTime.toFixed(0)}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 border-t pt-2">
              💡 Green (&lt;100ms), Yellow (&lt;300ms), Red (&gt;300ms)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
