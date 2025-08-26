import { Button } from '@/shared/components/ui/button';
import { Leaf, Bug, Eye } from 'lucide-react';
import { useSkipToContent } from '@/shared/hooks/use-accessibility';
import { motion } from 'framer-motion';
import { navbarVariants, AnimatedButton } from '@/shared/animations';

interface HeaderProps {
  activeTab: 'people' | 'products' | 'demo' | 'accessibility';
  onTabChange: (tab: 'people' | 'products' | 'demo' | 'accessibility') => void;
}

function handleTabChange(tab: 'people' | 'products' | 'demo' | 'accessibility') {
  if (tab === 'people') {
    window.location.href = '/';
  } else if (tab === 'products') {
    window.location.href = '/products';
  } else if (tab === 'demo') {
    window.location.href = '/demo';
  } else if (tab === 'accessibility') {
    window.location.href = '/accessibility';
  }
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  useSkipToContent();

  return (
    <motion.header 
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className='sticky top-0 z-50 border-b border-eco-gray-200 bg-white'
      role="banner"
    >
      <div className='w-full px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left Side - Logo */}
          <div className='flex items-center'>
            <Leaf 
              className='mr-2 text-2xl text-eco-green' 
              aria-hidden="true"
            />
            <h1 className='text-2xl font-bold text-eco-gray-800'>
              EcoBingle
            </h1>
          </div>

          {/* Center - Main Navigation */}
          <nav role="navigation" aria-label="Main navigation">
            <div className='flex items-center space-x-2'>
              <AnimatedButton
                variant="eco"
                onClick={() => handleTabChange('people')}
                className={`rounded-full px-8 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'people'
                    ? 'bg-eco-green text-white shadow-md hover:bg-eco-green-dark'
                    : 'border border-eco-gray-300 bg-white text-eco-gray-600 hover:bg-eco-gray-50'
                }`}
                data-testid='button-eco-people'
                aria-current={activeTab === 'people' ? 'page' : undefined}
                aria-label="Navigate to Eco People section"
              >
                Eco People
              </AnimatedButton>
              <Button
                onClick={() => handleTabChange('products')}
                className={`rounded-full px-8 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'products'
                    ? 'bg-eco-blue text-white shadow-md hover:bg-blue-600'
                    : 'border border-eco-gray-300 bg-white text-eco-gray-600 hover:bg-eco-gray-50'
                }`}
                data-testid='button-eco-products'
                aria-current={activeTab === 'products' ? 'page' : undefined}
                aria-label="Navigate to Eco Products section"
              >
                Eco Products
              </Button>
              <Button
                onClick={() => handleTabChange('demo')}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'demo'
                    ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700'
                    : 'border border-purple-300 bg-white text-purple-600 hover:bg-purple-50'
                }`}
                data-testid='button-demo'
                aria-current={activeTab === 'demo' ? 'page' : undefined}
                aria-label="Navigate to Demo section - Test error boundaries and loading states"
              >
                <Bug className='mr-2 h-4 w-4' aria-hidden="true" />
                Demo
              </Button>
              <Button
                onClick={() => handleTabChange('accessibility')}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-200 ${
                  activeTab === 'accessibility'
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'border border-blue-300 bg-white text-blue-600 hover:bg-blue-50'
                }`}
                data-testid='button-accessibility'
                aria-current={activeTab === 'accessibility' ? 'page' : undefined}
                aria-label="Navigate to Accessibility section - Learn about and test accessibility features"
              >
                <Eye className='mr-2 h-4 w-4' aria-hidden="true" />
                A11y Demo
              </Button>
            </div>
          </nav>

          {/* Right Side - Sign In */}
          <Button
            variant='outline'
            className='rounded-lg border border-eco-gray-300 px-6 py-2 font-medium text-eco-gray-700 hover:bg-eco-gray-50 focus-visible:ring-2 focus-visible:ring-green-500'
            data-testid='button-sign-in'
            aria-label="Sign in to your account"
          >
            Sign In
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
