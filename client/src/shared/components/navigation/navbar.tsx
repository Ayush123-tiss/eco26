import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/shared/components/ui/button';
import { ThemeToggle } from '@/shared/components/theme/theme-toggle';
import { MobileMenu } from './mobile-menu';
import { getMainRoutes, getPeopleRoutes, getProductRoutes } from '@/shared/config/navigation';

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  navLinks?: NavLink[];
  user?: {
    name: string;
    avatar?: string;
    isLoggedIn: boolean;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navLinks = [
    ...getMainRoutes().map(route => ({ 
      href: route.path, 
      label: route.label,
      isExternal: route.isExternal || false
    })),
    ...getPeopleRoutes().map(route => ({ 
      href: route.path, 
      label: route.label,
      isExternal: route.isExternal || false
    })),
    ...getProductRoutes().map(route => ({ 
      href: route.path, 
      label: route.label,
      isExternal: route.isExternal || false
    }))
  ].filter((link, index, self) => 
    self.findIndex(l => l.href === link.href) === index // Remove duplicates
  ),
  user,
  onLogin,
  onLogout,
  onProfileClick,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location === '/';
    }
    return location.startsWith(href);
  };

  const defaultLogo = (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">EB</span>
      </div>
      <span className="text-xl font-bold text-foreground">EcoBingle</span>
    </div>
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`bg-background border-b border-border sticky top-0 z-40 transition-colors ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
                {logo || defaultLogo}
                <span className="sr-only">Go to homepage</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4" role="menubar">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link.href);
                  
                  if (link.isExternal) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        }`}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-3">
                <ThemeToggle />
                {user?.isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={onProfileClick}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                      aria-label={`View profile for ${user.name}`}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                          aria-hidden="true"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                      className="text-sm"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={onLogin}
                    size="sm"
                    className="text-sm"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={mobileButtonRef}
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                </span>
                {/* Hamburger icon */}
                <svg
                  className={`h-6 w-6 transition-transform duration-200 ${
                    isMobileMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
        onProfileClick={onProfileClick}
        currentPath={location}
      />
    </>
  );
};
