import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProduct } from '../contexts/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { ArrowLeft, Package, Calendar, CreditCard, MapPin, Clock } from 'lucide-react';

export default function MyOrders() {
  const { state } = useProduct();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const selectedOrderData = selectedOrder 
    ? state.orders.find(order => order.orderId === selectedOrder)
    : null;

  if (selectedOrder && selectedOrderData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full px-4 py-8"
      >
        <div className="w-full">
          <Button
            variant="ghost"
            onClick={() => setSelectedOrder(null)}
            className="mb-6 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Orders
          </Button>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
                  <p className="text-teal-100 mt-2">Order ID: {selectedOrderData.orderId}</p>
                </div>
                <Badge className={`${getStatusColor(selectedOrderData.status)} text-sm px-3 py-1`}>
                  {selectedOrderData.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold">{formatDate(selectedOrderData.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold">{selectedOrderData.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-semibold">{formatDate(selectedOrderData.estimatedDelivery)}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Ordered Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Ordered Items</h3>
                <div className="space-y-4">
                  {selectedOrderData.items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-teal-600">
                          {formatCurrency(
                            item.product.discount
                              ? item.product.price * (1 - item.product.discount / 100) * item.quantity
                              : item.product.price * item.quantity
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                  Delivery Address
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="font-semibold">{selectedOrderData.deliveryAddress.fullName}</p>
                  <p className="text-gray-600">{selectedOrderData.deliveryAddress.email}</p>
                  <p className="text-gray-600">{selectedOrderData.deliveryAddress.phone}</p>
                  <div className="mt-2">
                    <p>{selectedOrderData.deliveryAddress.addressLine1}</p>
                    {selectedOrderData.deliveryAddress.addressLine2 && (
                      <p>{selectedOrderData.deliveryAddress.addressLine2}</p>
                    )}
                    <p>
                      {selectedOrderData.deliveryAddress.city}, {selectedOrderData.deliveryAddress.state} {selectedOrderData.deliveryAddress.zipCode}
                    </p>
                    <p>{selectedOrderData.deliveryAddress.country}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Order Total */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-lg border border-teal-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-teal-600">
                    {formatCurrency(selectedOrderData.totalAmount + 50)} {/* Including shipping */}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Including ₹50 shipping charges</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 py-8"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Orders</h1>
          <p className="text-lg text-gray-600">Track and manage your eco-friendly orders</p>
        </motion.div>

        {state.orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping for eco-friendly products!</p>
            <Button
              onClick={() => window.location.href = '/eco-products'}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg"
            >
              Shop Now
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {state.orders
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((order, index) => (
                  <motion.div
                    key={order.orderId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer"
                  >
                    <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                      <CardHeader className="bg-gradient-to-br from-teal-50 to-emerald-50 border-b border-teal-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-bold text-gray-800">
                              Order #{order.orderId}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(order.date)}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-1`}>
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Items</span>
                            <span className="font-semibold">
                              {order.items.reduce((total, item) => total + item.quantity, 0)} items
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Amount</span>
                            <span className="font-bold text-teal-600">
                              {formatCurrency(order.totalAmount + 50)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Payment</span>
                            <span className="text-sm font-medium">{order.paymentMethod}</span>
                          </div>

                          <Separator className="my-3" />

                          <Button
                            onClick={() => setSelectedOrder(order.orderId)}
                            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
