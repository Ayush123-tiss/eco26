import React from 'react';
import { useProduct, getCartTotal, getCartItemCount } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

export default function CartDrawer() {
  const { state, dispatch } = useProduct();
  const { cart, isCartOpen } = state;
  const [, setLocation] = useLocation();

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const handleCheckout = () => {
    closeCart();
    setLocation('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getItemPrice = (item: typeof cart[0]) => {
    return item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
  };

  const subtotal = getCartTotal(cart);
  const itemCount = getCartItemCount(cart);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M7 13H5.4m0 0L4 7M7 13h10m-8 8a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <p className="text-white/80 text-sm">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M7 13H5.4m0 0L4 7M7 13h10m-8 8a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Add some eco-friendly products to get started!</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {/* Clear All Button */}
                  {cart.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                      <button
                        onClick={clearCart}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  )}

                  {/* Cart Items List */}
                  <AnimatePresence>
                    {cart.map((item) => {
                      const itemPrice = getItemPrice(item);
                      return (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-gray-50 rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-start space-x-3">
                            {/* Product Image */}
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 line-clamp-2">
                                {item.product.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {item.product.category}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-[#0F766E]">
                                  {formatPrice(itemPrice)}
                                </span>
                                {item.product.discount && (
                                  <span className="text-xs text-gray-400 line-through">
                                    {formatPrice(item.product.price)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stockQuantity}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>
                            <span className="font-medium text-gray-900">
                              {formatPrice(itemPrice * item.quantity)}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span className="text-[#0F766E]">{formatPrice(subtotal)}</span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Proceed to Checkout</span>
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-2 text-[#0F766E] hover:text-[#134E4A] transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
