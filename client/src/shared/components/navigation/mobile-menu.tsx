import React, { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/shared/components/ui/button';
import { ThemeToggle } from '@/shared/components/theme/theme-toggle';
import { Separator } from '@/shared/components/ui/separator';

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  user?: {
    name: string;
    avatar?: string;
    isLoggedIn: boolean;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  currentPath: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  user,
  onLogin,
  onLogout,
  onProfileClick,
  currentPath
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement>(null);
  const lastFocusableRef = useRef<HTMLElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the first focusable element when menu opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Trap focus within the mobile menu
  useEffect(() => {
    const handleTabKey = (event: KeyboardEvent) => {
      if (!isOpen || event.key !== 'Tab') return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-sm bg-background border-l border-border shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-heading"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 id="mobile-menu-heading" className="text-lg font-semibold text-foreground">
              Navigation Menu
            </h2>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User section (if logged in) */}
          {user?.isLoggedIn && (
            <div className="p-4 border-b border-border bg-muted/50">
              <button
                onClick={() => {
                  onProfileClick?.();
                  onClose();
                }}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
                aria-label={`View profile for ${user.name}`}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">View Profile</p>
                </div>
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-4" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-2">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);
                
                if (link.isExternal) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:text-primary hover:bg-accent'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{link.label}</span>
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:text-primary hover:bg-accent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border bg-muted/50 space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Theme</span>
              <ThemeToggle variant="advanced" />
            </div>
            
            <Separator />
            
            {/* Login/Logout */}
            {user?.isLoggedIn ? (
              <Button
                ref={lastFocusableRef}
                variant="outline"
                onClick={() => {
                  onLogout?.();
                  onClose();
                }}
                className="w-full"
              >
                Logout
              </Button>
            ) : (
              <Button
                ref={lastFocusableRef}
                onClick={() => {
                  onLogin?.();
                  onClose();
                }}
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
