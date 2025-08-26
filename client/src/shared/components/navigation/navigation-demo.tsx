import React, { useState } from 'react';
import { Navbar } from '@/shared/components/navigation/navbar';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

interface User {
  name: string;
  avatar?: string;
  isLoggedIn: boolean;
}

const NavigationDemo: React.FC = () => {
  const [user, setUser] = useState<User | undefined>({
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isLoggedIn: true
  });

  const [showLoginUser, setShowLoginUser] = useState(true);

  const customNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: 'https://github.com', label: 'GitHub', isExternal: true }
  ];

  const handleLogin = () => {
    setUser({
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  const handleProfileClick = () => {
    alert('Profile clicked! In a real app, this would navigate to the profile page.');
  };

  const toggleUserState = () => {
    if (showLoginUser) {
      setUser(undefined);
    } else {
      handleLogin();
    }
    setShowLoginUser(!showLoginUser);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar
        navLinks={customNavLinks}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />

      {/* Demo Content */}
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📱 Responsive Navigation Demo
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              A fully responsive navbar with accessibility features
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                ✅ Mobile Responsive
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-lg">
                ♿ Accessible
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-lg">
                🎨 Animated
              </Badge>
            </div>
          </div>

          {/* Features Overview */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Navigation Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">📱 Responsive Design</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Desktop horizontal navbar</li>
                  <li>• Mobile hamburger menu</li>
                  <li>• Smooth slide-in animation</li>
                  <li>• Touch-friendly targets</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-600">♿ Accessibility</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ARIA labels and roles</li>
                  <li>• Keyboard navigation</li>
                  <li>• Focus management</li>
                  <li>• Screen reader support</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-600">🎨 User Experience</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Active link highlighting</li>
                  <li>• Smooth transitions</li>
                  <li>• Focus indicators</li>
                  <li>• User profile integration</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Interactive Controls */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Interactive Demo</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">User Authentication State</h3>
                  <p className="text-sm text-gray-600">
                    Toggle between logged in and logged out states
                  </p>
                </div>
                <Button onClick={toggleUserState}>
                  {showLoginUser ? 'Show Logged Out' : 'Show Logged In'}
                </Button>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Current State:</h3>
                <p className="text-sm text-blue-700">
                  {user?.isLoggedIn 
                    ? `Logged in as ${user.name}` 
                    : 'Not logged in - showing login button'
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Mobile Testing Instructions */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Testing Instructions</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🖥️ Desktop Testing</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Navigate using mouse clicks</li>
                    <li>• Test keyboard navigation with Tab key</li>
                    <li>• Verify focus indicators are visible</li>
                    <li>• Check active link highlighting</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📱 Mobile Testing</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Resize browser to mobile width (&lt;768px)</li>
                    <li>• Click hamburger menu to open sidebar</li>
                    <li>• Test touch interactions</li>
                    <li>• Verify smooth animations</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-1">Accessibility Testing</h4>
                <p className="text-sm text-yellow-700">
                  Try navigating with keyboard only: Use Tab to move between links, Enter/Space to activate, 
                  and Escape to close the mobile menu.
                </p>
              </div>
            </div>
          </Card>

          {/* Code Examples */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Basic Usage:</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`import { Navbar } from '@/shared/components/navigation/navbar';

<Navbar
  navLinks={[
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' }
  ]}
  user={user}
  onLogin={handleLogin}
  onLogout={handleLogout}
  onProfileClick={handleProfileClick}
/>`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Key Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <code className="bg-gray-200 px-1 rounded">useState</code> for mobile menu toggle</li>
                  <li>• <code className="bg-gray-200 px-1 rounded">useEffect</code> for accessibility and cleanup</li>
                  <li>• <code className="bg-gray-200 px-1 rounded">useRef</code> for focus management</li>
                  <li>• Tailwind CSS for responsive design and animations</li>
                  <li>• ARIA attributes for screen reader compatibility</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NavigationDemo;
