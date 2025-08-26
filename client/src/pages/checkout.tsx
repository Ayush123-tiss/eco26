import React, { useState } from 'react';
import { useProduct, getCartTotal, getCartItemCount, createOrder } from '../contexts/ProductContext';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'cod' | 'card' | 'upi';
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  upiId: string;
}

export default function CheckoutPage() {
  const { state, dispatch } = useProduct();
  const { cart } = state;
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: ''
  });

  const subtotal = getCartTotal(cart);
  const shipping = 50; // Fixed shipping cost in ₹
  const total = subtotal + shipping;
  const itemCount = getCartItemCount(cart);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: CheckoutFormData['paymentMethod']) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
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

  const isFormValid = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'addressLine1', 'city', 'state', 'zipCode'];
    const basicFieldsValid = requiredFields.every(field => formData[field as keyof CheckoutFormData].trim() !== '');
    
    if (!basicFieldsValid) return false;

    if (formData.paymentMethod === 'card') {
      return formData.cardNumber.trim() !== '' && formData.cardExpiry.trim() !== '' && formData.cardCVV.trim() !== '';
    }

    if (formData.paymentMethod === 'upi') {
      return formData.upiId.trim() !== '';
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || cart.length === 0) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get payment method display name
      const paymentMethodNames = {
        cod: 'Cash on Delivery',
        card: 'Credit/Debit Card',
        upi: 'UPI/Wallet'
      };

      // Create order using helper function
      const newOrder = createOrder(
        cart,
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethodNames[formData.paymentMethod]
      );

      // Add order to context (this will also save to localStorage)
      dispatch({ type: 'ADD_ORDER', payload: newOrder });

      // Store order data for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(newOrder));

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });

      // Navigate to confirmation
      setLocation('/order-confirmation');
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M7 13H5.4m0 0L4 7M7 13h10m-8 8a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some eco-friendly products to proceed with checkout.</p>
          <button
            onClick={() => setLocation('/products')}
            className="px-6 py-3 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
        <p className="text-gray-600">
          Complete your eco-friendly purchase - {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for delivery
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="House/Flat number, Street name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="Landmark, Area (Optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="State"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    placeholder="123456"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                    required
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h2>

              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === 'cod' 
                    ? 'border-[#0F766E] bg-[#0F766E]/5' 
                    : 'border-gray-200 hover:border-[#14B8A6]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => handlePaymentMethodChange('cod')}
                    className="w-4 h-4 text-[#0F766E] focus:ring-[#0F766E]"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when your order arrives</div>
                  </div>
                </label>

                {/* Credit/Debit Card */}
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === 'card' 
                    ? 'border-[#0F766E] bg-[#0F766E]/5' 
                    : 'border-gray-200 hover:border-[#14B8A6]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => handlePaymentMethodChange('card')}
                    className="w-4 h-4 text-[#0F766E] focus:ring-[#0F766E] mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-3">Credit/Debit Card</div>
                    {formData.paymentMethod === 'card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0F766E] focus:border-transparent text-sm"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0F766E] focus:border-transparent text-sm"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0F766E] focus:border-transparent text-sm"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* UPI/Wallet */}
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === 'upi' 
                    ? 'border-[#0F766E] bg-[#0F766E]/5' 
                    : 'border-gray-200 hover:border-[#14B8A6]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => handlePaymentMethodChange('upi')}
                    className="w-4 h-4 text-[#0F766E] focus:ring-[#0F766E] mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-3">UPI/Wallet</div>
                    {formData.paymentMethod === 'upi' && (
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0F766E] focus:border-transparent text-sm"
                        placeholder="yourname@upi"
                      />
                    )}
                  </div>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const itemPrice = getItemPrice(item);
                  return (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(itemPrice * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-[#0F766E]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
                className="w-full mt-6 py-4 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Place Order</span>
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  );
}
