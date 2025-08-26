import React from 'react';
import { useTheme } from '../shared/context/theme-context';
import { ThemeToggle } from '../shared/components/theme/theme-toggle';
import { Button } from '../shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/components/ui/card';
import { Badge } from '../shared/components/ui/badge';
import { Separator } from '../shared/components/ui/separator';

export function ThemeDemo() {
  const { theme, accentColor } = useTheme();
  
  const colorPalette = [
    { name: 'Blue', value: 'blue', class: 'bg-theme-blue' },
    { name: 'Green', value: 'green', class: 'bg-theme-green' },
    { name: 'Purple', value: 'purple', class: 'bg-theme-purple' },
    { name: 'Orange', value: 'orange', class: 'bg-theme-orange' },
    { name: 'Red', value: 'red', class: 'bg-theme-red' },
    { name: 'Teal', value: 'teal', class: 'bg-theme-teal' },
  ];

  const componentVariants = [
    { name: 'Primary', variant: 'default' as const },
    { name: 'Secondary', variant: 'secondary' as const },
    { name: 'Outline', variant: 'outline' as const },
    { name: 'Ghost', variant: 'ghost' as const },
    { name: 'Link', variant: 'link' as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Theme System Demo</h1>
            <p className="text-muted-foreground">
              A comprehensive demonstration of the React + Tailwind CSS theme system
            </p>
          </div>
          <ThemeToggle variant="advanced" />
        </div>

        <Separator />

        {/* Theme Status */}
        <Card>
          <CardHeader>
            <CardTitle>Current Theme Configuration</CardTitle>
            <CardDescription>
              Real-time theme settings and system preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Theme Mode</h4>
                <Badge variant="outline" className="w-fit">
                  {theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}
                </Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Accent Color</h4>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full bg-theme-${accentColor}`} />
                  <Badge variant="outline" className="w-fit capitalize">
                    {accentColor}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">System Preference</h4>
                <Badge variant="outline" className="w-fit">
                  {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Accent Color Palette</CardTitle>
            <CardDescription>
              Available accent colors with accessibility-compliant contrast ratios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {colorPalette.map((color) => (
                <div
                  key={color.value}
                  className="space-y-3 p-4 border rounded-lg transition-colors hover:bg-muted/50"
                >
                  <div className={`w-full h-16 rounded ${color.class} shadow-sm`} />
                  <div className="text-center">
                    <h4 className="font-medium text-sm">{color.name}</h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {color.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>
              Button variants with theme-aware styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {componentVariants.map((variant) => (
              <div key={variant.name} className="space-y-2">
                <h4 className="text-sm font-medium">{variant.name} Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant={variant.variant} size="sm">
                    Small
                  </Button>
                  <Button variant={variant.variant}>
                    Default
                  </Button>
                  <Button variant={variant.variant} size="lg">
                    Large
                  </Button>
                  <Button variant={variant.variant} disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cards and Surfaces */}
        <Card>
          <CardHeader>
            <CardTitle>Surface Components</CardTitle>
            <CardDescription>
              Cards, backgrounds, and surface elements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Default Card</CardTitle>
                  <CardDescription>
                    Standard card with default styling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card demonstrates the default theme colors and typography.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Primary Card</CardTitle>
                  <CardDescription>
                    Card with primary color accent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card uses the primary color for emphasis.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-lg">Muted Card</CardTitle>
                  <CardDescription>
                    Card with muted background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card uses the muted background color.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>
              Text styles and hierarchy with theme-aware colors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <h3 className="text-2xl font-medium">Heading 3</h3>
              <h4 className="text-xl font-medium">Heading 4</h4>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-base">
                This is regular body text with proper contrast ratios for accessibility.
              </p>
              <p className="text-muted-foreground">
                This is muted text for secondary information.
              </p>
              <p className="text-primary font-medium">
                This is primary colored text for emphasis.
              </p>
              <p className="text-sm text-muted-foreground">
                Small text for captions and metadata.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>
              WCAG 2.1 AA compliant color contrasts and keyboard navigation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Color Contrast</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All text meets WCAG AA standards (4.5:1 ratio)</li>
                  <li>• Large text meets AAA standards (3:1 ratio)</li>
                  <li>• Interactive elements have proper focus indicators</li>
                  <li>• Color is not the only means of conveying information</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Keyboard Navigation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All interactive elements are keyboard accessible</li>
                  <li>• Tab order follows logical reading flow</li>
                  <li>• Focus indicators are clearly visible</li>
                  <li>• Proper ARIA labels and descriptions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Theme Toggle */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Test theme switching and persistence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Reload Page (Test Persistence)
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const event = new KeyboardEvent('keydown', {
                    key: 't',
                    ctrlKey: true,
                    metaKey: true,
                  });
                  document.dispatchEvent(event);
                }}
              >
                Trigger Keyboard Shortcut (Ctrl/Cmd + T)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            Theme system built with React Context API, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
