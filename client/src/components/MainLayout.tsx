import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { ProductProvider } from '../contexts/ProductContext';
import { ContentProvider } from '../contexts/ContentContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ContentProvider>
      <ProductProvider>
        <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-white to-[#14B8A6]/10 flex flex-col">
          <Navigation />
          <main className="w-full flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </ProductProvider>
    </ContentProvider>
  );
}
