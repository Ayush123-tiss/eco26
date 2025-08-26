import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: 'Clothing' | 'Accessories' | 'Gadgets' | 'Others';
  stockQuantity: number;
  imageUrl: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderId: string;
  date: Date;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: string;
  deliveryAddress: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  estimatedDelivery: Date;
}

export interface ProductState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  searchQuery: string;
  selectedCategory: string;
  currentUser: string;
  isAdmin: boolean;
}

// Action Types
type ProductAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'LOAD_ORDERS'; payload: Order[] };

// Initial State
const initialState: ProductState = {
  products: [
    {
      id: '1',
      name: 'Organic Cotton T-Shirt',
      description: 'Made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear while being environmentally conscious.',
      price: 29.99,
      discount: 10,
      category: 'Clothing',
      stockQuantity: 50,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      createdAt: new Date('2024-08-01')
    },
    {
      id: '2',
      name: 'Bamboo Water Bottle',
      description: 'Sustainable bamboo water bottle with stainless steel interior. Perfect for staying hydrated while reducing plastic waste.',
      price: 24.99,
      category: 'Gadgets',
      stockQuantity: 30,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      createdAt: new Date('2024-08-02')
    },
    {
      id: '3',
      name: 'Recycled Plastic Backpack',
      description: 'Durable backpack made from recycled plastic bottles. Spacious and perfect for daily commutes or outdoor adventures.',
      price: 59.99,
      discount: 15,
      category: 'Accessories',
      stockQuantity: 25,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      createdAt: new Date('2024-08-03')
    },
    {
      id: '4',
      name: 'Solar Phone Charger',
      description: 'Portable solar-powered phone charger. Never run out of battery while reducing your carbon footprint.',
      price: 39.99,
      category: 'Gadgets',
      stockQuantity: 20,
      imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400',
      createdAt: new Date('2024-08-04')
    },
    {
      id: '5',
      name: 'Hemp Tote Bag',
      description: 'Stylish and durable hemp tote bag. Perfect for shopping and daily use, completely biodegradable.',
      price: 19.99,
      category: 'Accessories',
      stockQuantity: 40,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      createdAt: new Date('2024-08-05')
    },
    {
      id: '6',
      name: 'Eco-Friendly Sneakers',
      description: 'Sustainable sneakers made from recycled materials and organic cotton. Comfortable and stylish.',
      price: 89.99,
      discount: 20,
      category: 'Clothing',
      stockQuantity: 15,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      createdAt: new Date('2024-08-06')
    }
  ],
  cart: [],
  orders: [],
  isCartOpen: false,
  searchQuery: '',
  selectedCategory: '',
  currentUser: 'EcoUser',
  isAdmin: true
};

// Reducer
function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };

    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== action.payload.productId)
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload
      };

    case 'ADD_ORDER':
      const newOrders = [...state.orders, action.payload];
      // Save to localStorage
      localStorage.setItem('ecoOrders', JSON.stringify(newOrders));
      return {
        ...state,
        orders: newOrders
      };

    case 'UPDATE_ORDER_STATUS':
      const updatedOrders = state.orders.map(order =>
        order.orderId === action.payload.orderId
          ? { ...order, status: action.payload.status }
          : order
      );
      // Save to localStorage
      localStorage.setItem('ecoOrders', JSON.stringify(updatedOrders));
      return {
        ...state,
        orders: updatedOrders
      };

    case 'LOAD_ORDERS':
      return {
        ...state,
        orders: action.payload
      };

    default:
      return state;
  }
}

// Context
const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
} | null>(null);

// Provider
interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Load orders from localStorage on mount
  React.useEffect(() => {
    const savedOrders = localStorage.getItem('ecoOrders');
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          date: new Date(order.date),
          estimatedDelivery: new Date(order.estimatedDelivery)
        }));
        dispatch({ type: 'LOAD_ORDERS', payload: orders });
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

// Hook
export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

// Helper functions
export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

export const getCartItemCount = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const generateProductId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const generateOrderId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ECO';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createOrder = (
  cart: CartItem[],
  deliveryAddress: Order['deliveryAddress'],
  paymentMethod: string
): Order => {
  const totalAmount = getCartTotal(cart);
  const orderId = generateOrderId();
  const currentDate = new Date();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(currentDate.getDate() + 5); // 5 days from now

  return {
    orderId,
    date: currentDate,
    items: [...cart],
    totalAmount,
    paymentMethod,
    deliveryAddress,
    status: 'Processing',
    estimatedDelivery
  };
};
