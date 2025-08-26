import React, { useEffect, useState } from 'react';
import { loadChartLibrary } from '@/lib/bundle-optimization';

interface ChartData {
  name: string;
  beforeOptimization: number;
  afterOptimization: number;
}

const ChartComponent: React.FC = () => {
  const [chartComponents, setChartComponents] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const data: ChartData[] = [
    { name: 'Initial Load', beforeOptimization: 2800, afterOptimization: 1200 },
    { name: 'Gzipped Size', beforeOptimization: 890, afterOptimization: 380 },
    { name: 'Load Time (ms)', beforeOptimization: 3200, afterOptimization: 1400 },
    { name: 'Parse Time (ms)', beforeOptimization: 850, afterOptimization: 320 },
    { name: 'First Paint (ms)', beforeOptimization: 1200, afterOptimization: 600 },
  ];

  useEffect(() => {
    const loadCharts = async () => {
      try {
        const components = await loadChartLibrary();
        setChartComponents(components);
      } catch (error) {
        console.error('Failed to load chart library:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart library...</div>
      </div>
    );
  }

  if (!chartComponents) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-red-600">Failed to load chart library</div>
      </div>
    );
  }

  const {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
  } = chartComponents;

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
          📊 Chart Library Loaded Dynamically
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          This chart component (~400KB) was loaded only when requested, not during initial page load.
        </p>
      </div>

      {/* Line Chart */}
      <div className="space-y-2">
        <h4 className="font-medium">Bundle Size Optimization Trend</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="beforeOptimization"
                stroke="#ef4444"
                strokeWidth={2}
                name="Before Optimization"
              />
              <Line
                type="monotone"
                dataKey="afterOptimization"
                stroke="#22c55e"
                strokeWidth={2}
                name="After Optimization"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-2">
        <h4 className="font-medium">Performance Comparison</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="beforeOptimization" fill="#ef4444" name="Before" />
              <Bar dataKey="afterOptimization" fill="#22c55e" name="After" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
