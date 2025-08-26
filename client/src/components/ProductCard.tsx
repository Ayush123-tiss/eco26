import React from 'react';
import { useProduct, Product } from '../contexts/ProductContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useProduct();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getCategoryColor = (category: Product['category']) => {
    switch (category) {
      case 'Clothing':
        return 'bg-[#3B82F6]/10 text-[#3B82F6]';
      case 'Accessories':
        return 'bg-[#14B8A6]/10 text-[#0F766E]';
      case 'Gadgets':
        return 'bg-[#134E4A]/10 text-[#134E4A]';
      case 'Others':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/50 overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {product.stockQuantity > 0 ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              In Stock
            </div>
          ) : (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
          <span className="text-xs text-gray-500">
            {product.stockQuantity} left
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#0F766E] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[#0F766E]">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0}
          className="w-full py-3 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M7 13H5.4m0 0L4 7M7 13h10m-8 8a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <span>{product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
