import React from 'react';
import { Navbar } from '@/shared/components/navigation/navbar';
import { useSkipToContent } from '@/shared/hooks/use-accessibility';

interface ResponsiveHeaderProps {
  user?: {
    name: string;
    avatar?: string;
    isLoggedIn: boolean;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  user,
  onLogin,
  onLogout,
  onProfileClick
}) => {
  useSkipToContent();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
    { href: '/settings', label: 'Settings' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/code-splitting', label: 'Code Splitting' },
    { href: '/navigation', label: 'Navigation Demo' }
  ];

  const customLogo = (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-sm">EB</span>
      </div>
      <span className="text-xl font-bold text-gray-900">EcoBingle</span>
    </div>
  );

  return (
    <Navbar
      logo={customLogo}
      navLinks={navLinks}
      user={user}
      onLogin={onLogin}
      onLogout={onLogout}
      onProfileClick={onProfileClick}
      className="shadow-sm"
    />
  );
};

export default ResponsiveHeader;
