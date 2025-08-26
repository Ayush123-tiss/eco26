import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import type { Order } from '../contexts/ProductContext';

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        const order = JSON.parse(storedOrder);
        // Convert date strings back to Date objects
        order.date = new Date(order.date);
        order.estimatedDelivery = new Date(order.estimatedDelivery);
        setOrderData(order);
      } catch (error) {
        console.error('Failed to parse order data:', error);
        setLocation('/eco-products');
      }
    } else {
      setLocation('/eco-products');
    }
  }, [setLocation]);

  if (!orderData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="w-8 h-8 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getItemPrice = (item: typeof orderData.items[0]) => {
    return item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
  };

  const getEstimatedDeliveryDate = () => {
    return orderData.estimatedDelivery.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPaymentMethodText = (method: string) => {
    return method; // Already formatted from checkout
  };

  const handleContinueShopping = () => {
    // Clear the order data
    localStorage.removeItem('lastOrder');
    setLocation('/eco-products');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </motion.svg>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Order Confirmed! 🎉
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg"
        >
          Thank you for choosing eco-friendly products. Your order has been successfully placed!
        </motion.p>
      </motion.div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Details</h2>
            <p className="text-gray-600">Order ID: <span className="font-mono font-medium text-[#0F766E]">{orderData.orderId}</span></p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium text-gray-900">
              {orderData.date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50/50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-gray-900">Estimated Delivery</h3>
            </div>
            <p className="text-green-700 font-medium">{getEstimatedDeliveryDate()}</p>
            <p className="text-sm text-gray-600 mt-1">Standard shipping (5 business days)</p>
          </div>

          <div className="bg-blue-50/50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="font-medium text-gray-900">Payment Method</h3>
            </div>
            <p className="text-blue-700 font-medium">{getPaymentMethodText(orderData.paymentMethod)}</p>
            <p className="text-sm text-gray-600 mt-1">
              {orderData.paymentMethod === 'Cash on Delivery' 
                ? 'Pay when your order arrives'
                : 'Payment processed successfully'
              }
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 text-[#0F766E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Shipping Address
          </h3>
          <div className="bg-gray-50/50 rounded-lg p-4">
            <p className="font-medium text-gray-900">{orderData.deliveryAddress.fullName}</p>
            <p className="text-gray-700">{orderData.deliveryAddress.addressLine1}</p>
            {orderData.deliveryAddress.addressLine2 && (
              <p className="text-gray-700">{orderData.deliveryAddress.addressLine2}</p>
            )}
            <p className="text-gray-700">
              {orderData.deliveryAddress.city}, {orderData.deliveryAddress.state} {orderData.deliveryAddress.zipCode}
            </p>
            <p className="text-gray-700">{orderData.deliveryAddress.country}</p>
            <p className="text-gray-600 mt-2">
              📞 {orderData.deliveryAddress.phone} • 📧 {orderData.deliveryAddress.email}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-6 h-6 text-[#0F766E] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Ordered Items ({orderData.items.length})
        </h2>

        <div className="space-y-4">
          {orderData.items.map((item, index) => {
            const itemPrice = getItemPrice(item);
            return (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  {item.product.discount && (
                    <p className="text-sm text-green-600">
                      {item.product.discount}% discount applied
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatPrice(itemPrice * item.quantity)}
                  </p>
                  {item.product.discount && (
                    <p className="text-sm text-gray-500 line-through">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 mt-6 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-[#0F766E]">{formatPrice(orderData.totalAmount + 50)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Including ₹50 shipping charges</p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center space-y-4"
      >
        <motion.button
          onClick={handleContinueShopping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-4 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors font-medium space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Continue Shopping</span>
        </motion.button>

        <p className="text-sm text-gray-600">
          Need help? Contact our support at{' '}
          <a href="mailto:support@ecobingle.com" className="text-[#0F766E] hover:underline">
            support@ecobingle.com
          </a>
        </p>
      </motion.div>

      {/* Eco Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v6m0 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You for Choosing Eco-Friendly! 🌱</h3>
        <p className="text-gray-600">
          Your purchase helps support sustainable practices and makes a positive impact on our environment. 
          Together, we're building a greener future!
        </p>
      </motion.div>
    </div>
  );
}
