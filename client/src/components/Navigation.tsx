import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useProduct, getCartItemCount } from '../contexts/ProductContext';
import { getPeopleRoutes, getProductRoutes, getUserRoutes } from '../shared/config/navigation';
import { Search, Plus, ChevronDown, Menu, X, Users, ShoppingBag, Bug, Eye } from 'lucide-react';

export default function Navigation() {
  const [location] = useLocation();
  const { state, dispatch } = useProduct();
  const cartItemCount = getCartItemCount(state.cart);
  
  // Navigation state
  const [activeMainTab, setActiveMainTab] = useState<'people' | 'products'>('people');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsPeopleDropdownOpen(false);
    setIsProductsDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Get navigation items from centralized configuration
  const ecoPeopleItems = getPeopleRoutes().map(route => ({
    path: route.path,
    label: route.label,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
      </svg>
    )
  }));

  const ecoProductsItems = getProductRoutes().map(route => ({
    path: route.path,
    label: route.label,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  }));

  const userMenuItems = getUserRoutes().map(route => ({
    path: route.path,
    label: route.label,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }));

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">EcoBingle</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">

              {/* Eco People Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    setActiveMainTab('people');
                    setIsPeopleDropdownOpen(!isPeopleDropdownOpen);
                    setIsProductsDropdownOpen(false);
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeMainTab === 'people'
                      ? 'text-[#0F766E] bg-[#0F766E]/10'
                      : 'text-gray-700 hover:text-[#0F766E] hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>👥</span>
                  <span>Eco People</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isPeopleDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Eco People Dropdown Menu */}
                <AnimatePresence>
                  {isPeopleDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {ecoPeopleItems.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <motion.div
                            onClick={() => {
                              setIsPeopleDropdownOpen(false);
                              closeAllDropdowns();
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#0F766E]/10 hover:text-[#0F766E] transition-colors cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Eco Products Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    setActiveMainTab('products');
                    setIsProductsDropdownOpen(!isProductsDropdownOpen);
                    setIsPeopleDropdownOpen(false);
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeMainTab === 'products'
                      ? 'text-[#0F766E] bg-[#0F766E]/10'
                      : 'text-gray-700 hover:text-[#0F766E] hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🛍️</span>
                  <span>Eco Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Eco Products Dropdown Menu */}
                <AnimatePresence>
                  {isProductsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {ecoProductsItems.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <motion.div
                            onClick={() => {
                              setIsProductsDropdownOpen(false);
                              closeAllDropdowns();
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#0F766E]/10 hover:text-[#0F766E] transition-colors cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar */}
              <div className="hidden lg:flex flex-1 max-w-lg mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search EcoBingle..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                className="flex items-center space-x-1 px-4 py-2 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bug className="w-4 h-4" />
                <span>Demo</span>
              </motion.button>
              
              <motion.button
                className="flex items-center space-x-1 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                <span>A11y Demo</span>
              </motion.button>
              
              {/* Cart Icon */}
              <motion.button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M7 13H5.4m0 0L4 7M7 13h10m-8 8a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </motion.div>
                )}
              </motion.button>

              {/* User Profile */}
              <div className="relative">
                <motion.button
                  onClick={toggleUserDropdown}
                  className="w-8 h-8 bg-[#14B8A6] rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white text-sm font-semibold">U</span>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{state.currentUser}</p>
                        <p className="text-xs text-gray-500">Eco Enthusiast</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link key={item.path} href={item.path}>
                            <motion.div
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#14B8A6]/10 hover:text-[#0F766E] transition-colors cursor-pointer"
                              whileHover={{ x: 4 }}
                            >
                              {item.icon}
                              <span className="ml-3">{item.label}</span>
                            </motion.div>
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 py-1">
                        <motion.button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            // Add logout logic here
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="ml-3">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button className="text-gray-600 hover:text-gray-900 text-sm">
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-2 space-y-1">
                <div className="px-3 py-2 text-gray-900 font-medium">👥 Eco People</div>
                {ecoPeopleItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-50 rounded">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </div>
                  </Link>
                ))}
                <div className="px-3 py-2 text-gray-900 font-medium">🛍️ Eco Products</div>
                {ecoProductsItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-50 rounded">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>



      {/* Backdrop for dropdowns */}
      {(isPeopleDropdownOpen || isProductsDropdownOpen || isUserDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllDropdowns}
        />
      )}
    </>
  );
}
