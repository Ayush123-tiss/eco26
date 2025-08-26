import React, { Suspense, useState } from 'react';
import { createLazyComponent } from '@/lib/bundle-optimization';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

// Lazy load heavy components
const LazyChart = createLazyComponent(
  () => import('./chart-component'),
  'ChartComponent'
);

const LazyAnimatedCard = createLazyComponent(
  () => import('./animated-card'),
  'AnimatedCard'
);

const LazyDataTable = createLazyComponent(
  () => import('./data-table'),
  'DataTable'
);

// Loading components
const ChartSkeleton = () => (
  <div className="w-full h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-muted-foreground">Loading chart...</div>
  </div>
);

const CardSkeleton = () => (
  <div className="w-full h-32 bg-muted animate-pulse rounded-lg"></div>
);

const TableSkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-8 bg-muted animate-pulse rounded"></div>
    ))}
  </div>
);

export function BundleOptimizationDemo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showChart, setShowChart] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const bundleStats = {
    beforeOptimization: {
      totalSize: '2.8 MB',
      gzipSize: '890 KB',
      chunks: 3,
      loadTime: '3.2s'
    },
    afterOptimization: {
      totalSize: '1.2 MB',
      gzipSize: '380 KB',
      chunks: 12,
      loadTime: '1.4s'
    }
  };

  const optimizationTechniques = [
    {
      name: 'Tree Shaking',
      description: 'Remove unused code from libraries',
      savings: '40%',
      status: 'active'
    },
    {
      name: 'Code Splitting',
      description: 'Split code into smaller chunks',
      savings: '60%',
      status: 'active'
    },
    {
      name: 'Dynamic Imports',
      description: 'Load heavy libraries only when needed',
      savings: '70%',
      status: 'active'
    },
    {
      name: 'Gzip Compression',
      description: 'Compress assets for faster loading',
      savings: '75%',
      status: 'active'
    },
    {
      name: 'Library Replacement',
      description: 'Replace heavy libraries with lighter alternatives',
      savings: '50%',
      status: 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Bundle Size Optimization Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Demonstration of advanced bundle optimization techniques for React + Tailwind CSS projects
          </p>
        </div>

        <Separator />

        {/* Bundle Size Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Bundle Size Comparison</CardTitle>
            <CardDescription>
              Before and after optimization results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-red-600">Before Optimization</h3>
                  <Badge variant="destructive">Slow</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Size:</span>
                    <span className="font-mono">{bundleStats.beforeOptimization.totalSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gzipped:</span>
                    <span className="font-mono">{bundleStats.beforeOptimization.gzipSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chunks:</span>
                    <span className="font-mono">{bundleStats.beforeOptimization.chunks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load Time:</span>
                    <span className="font-mono">{bundleStats.beforeOptimization.loadTime}</span>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-600">After Optimization</h3>
                  <Badge variant="default" className="bg-green-600">Fast</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Size:</span>
                    <span className="font-mono text-green-600">{bundleStats.afterOptimization.totalSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gzipped:</span>
                    <span className="font-mono text-green-600">{bundleStats.afterOptimization.gzipSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chunks:</span>
                    <span className="font-mono text-green-600">{bundleStats.afterOptimization.chunks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load Time:</span>
                    <span className="font-mono text-green-600">{bundleStats.afterOptimization.loadTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Summary */}
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                Optimization Results
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">57%</div>
                  <div className="text-muted-foreground">Size Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">57%</div>
                  <div className="text-muted-foreground">Faster Load</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">300%</div>
                  <div className="text-muted-foreground">More Chunks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">A+</div>
                  <div className="text-muted-foreground">Performance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimization Techniques */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Techniques</CardTitle>
            <CardDescription>
              Active optimization strategies and their impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {optimizationTechniques.map((technique) => (
                <div
                  key={technique.name}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{technique.name}</h4>
                    <Badge
                      variant={technique.status === 'active' ? 'default' : 'secondary'}
                    >
                      {technique.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {technique.description}
                  </p>
                  <div className="text-sm font-medium text-green-600">
                    Up to {technique.savings} size reduction
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demos */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Lazy Loading Demos</CardTitle>
            <CardDescription>
              Click buttons to load heavy components dynamically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="animations">Animations</TabsTrigger>
                <TabsTrigger value="data">Data Tables</TabsTrigger>
              </TabsList>

              <TabsContent value="charts" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => setShowChart(!showChart)}
                    variant={showChart ? "destructive" : "default"}
                  >
                    {showChart ? 'Hide' : 'Load'} Chart Component
                  </Button>
                  <Badge variant="outline">
                    ~400KB when loaded
                  </Badge>
                </div>
                {showChart && (
                  <Suspense fallback={<ChartSkeleton />}>
                    <LazyChart />
                  </Suspense>
                )}
              </TabsContent>

              <TabsContent value="animations" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => setShowAnimations(!showAnimations)}
                    variant={showAnimations ? "destructive" : "default"}
                  >
                    {showAnimations ? 'Hide' : 'Load'} Animated Components
                  </Button>
                  <Badge variant="outline">
                    ~200KB when loaded
                  </Badge>
                </div>
                {showAnimations && (
                  <Suspense fallback={<CardSkeleton />}>
                    <LazyAnimatedCard />
                  </Suspense>
                )}
              </TabsContent>

              <TabsContent value="data" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => setShowTable(!showTable)}
                    variant={showTable ? "destructive" : "default"}
                  >
                    {showTable ? 'Hide' : 'Load'} Data Table
                  </Button>
                  <Badge variant="outline">
                    ~150KB when loaded
                  </Badge>
                </div>
                {showTable && (
                  <Suspense fallback={<TableSkeleton />}>
                    <LazyDataTable />
                  </Suspense>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle>Bundle Optimization Best Practices</CardTitle>
            <CardDescription>
              Key strategies for maintaining small bundle sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">✅ Do</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Use dynamic imports for heavy libraries</li>
                  <li>• Implement tree shaking with proper imports</li>
                  <li>• Split code at route level with React.lazy</li>
                  <li>• Use lighter alternatives (date-fns vs moment)</li>
                  <li>• Enable gzip/brotli compression</li>
                  <li>• Analyze bundle size regularly</li>
                  <li>• Preload critical components</li>
                  <li>• Use CSS-only solutions when possible</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-red-600">❌ Don't</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Import entire libraries when you need one function</li>
                  <li>• Load all components eagerly</li>
                  <li>• Use heavy animation libraries for simple effects</li>
                  <li>• Include unused dependencies</li>
                  <li>• Ignore bundle size warnings</li>
                  <li>• Use large icon libraries for few icons</li>
                  <li>• Bundle everything into one chunk</li>
                  <li>• Forget about mobile users</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commands */}
        <Card>
          <CardHeader>
            <CardTitle>Bundle Analysis Commands</CardTitle>
            <CardDescription>
              Use these npm scripts to analyze your bundle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <code className="text-sm">npm run build:analyze</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Build with bundle analyzer
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <code className="text-sm">npm run size-check</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check bundle size limits
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <code className="text-sm">npm run analyze:size</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Detailed size analysis
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <code className="text-sm">npm run preview:gzip</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Preview with compression
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
