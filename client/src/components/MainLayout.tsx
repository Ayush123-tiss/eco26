import React from 'react';
import Navigation from './Navigation';
import CartDrawer from './CartDrawer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-white to-[#14B8A6]/10">
      <Navigation />
      <main>
        {children}
      </main>
      <CartDrawer />
    </div>
  );
}
