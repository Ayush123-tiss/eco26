import React, { useState, useMemo } from 'react';
import { useProduct, Product } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import CartDrawer from '../components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const { state, dispatch } = useProduct();
  const { products, searchQuery, selectedCategory, isAdmin } = state;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories: Product['category'][] = ['Clothing', 'Accessories', 'Gadgets', 'Others'];

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-[#0F766E] rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Eco Products</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover sustainable and eco-friendly products that help you live a greener lifestyle. 
          Every purchase supports environmental conservation and sustainable practices.
        </p>
      </motion.div>

      {/* Admin Actions */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-xl p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
                <p className="text-white/90">
                  Manage your eco-product inventory and add new sustainable items.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 bg-white text-[#0F766E] rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search eco-friendly products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === ''
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-[#0F766E] hover:text-[#134E4A] transition-colors font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Product Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-[#0F766E]">{products.length}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-[#3B82F6]">{filteredProducts.length}</div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-[#14B8A6]">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.stockQuantity > 0).length}
          </div>
          <div className="text-sm text-gray-600">In Stock</div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || selectedCategory 
                ? 'Try adjusting your search or filter criteria.'
                : 'No eco-friendly products available at the moment.'
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Modals and Drawers */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <CartDrawer />
    </div>
  );
}
