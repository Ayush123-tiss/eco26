# Backend Integration Plan for EcoBingle

## Phase 1: Authentication System (CRITICAL - Week 1)

### 1.1 Create Authentication Context
```typescript
// client/src/contexts/AuthContext.tsx
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

### 1.2 Authentication Pages & Components
- `pages/auth/login.tsx`
- `pages/auth/signup.tsx`
- `components/auth/ProtectedRoute.tsx`
- `components/auth/LoginForm.tsx`
- `components/auth/SignupForm.tsx`

### 1.3 Token Management
- Local storage token persistence
- Automatic token refresh
- Request interceptors for authentication headers

## Phase 2: API Service Layer (Week 2)

### 2.1 Core API Services
```typescript
// services/api/auth.ts
export const authAPI = {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>,
  signup: (userData: SignupData) => Promise<AuthResponse>,
  logout: () => Promise<void>,
  refreshToken: () => Promise<TokenResponse>,
  getCurrentUser: () => Promise<User>
};

// services/api/products.ts
export const productsAPI = {
  getProducts: (filters?: ProductFilters) => Promise<Product[]>,
  getProduct: (id: string) => Promise<Product>,
  createProduct: (data: CreateProductData) => Promise<Product>,
  updateProduct: (id: string, data: UpdateProductData) => Promise<Product>,
  deleteProduct: (id: string) => Promise<void>
};

// services/api/community.ts
export const communityAPI = {
  getCommunities: () => Promise<Community[]>,
  createPost: (data: CreatePostData) => Promise<Post>,
  getPosts: (filters?: PostFilters) => Promise<Post[]>,
  voteOnPost: (postId: string, voteType: VoteType) => Promise<Vote>
};
```

### 2.2 React Query Integration
```typescript
// hooks/api/useAuth.ts
export const useAuth = () => {
  const login = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Handle successful login
    }
  });
  
  const user = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getCurrentUser,
    enabled: !!token
  });
  
  return { login, user, ... };
};

// hooks/api/useProducts.ts
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsAPI.getProducts(filters)
  });
};
```

## Phase 3: Form Validation & Error Handling (Week 3)

### 3.1 Zod Schema Validation
```typescript
// schemas/auth.ts
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// schemas/product.ts
export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  category: z.enum(['Clothing', 'Accessories', 'Gadgets', 'Others'])
});
```

### 3.2 Enhanced Form Components
```typescript
// components/forms/ValidatedInput.tsx
interface ValidatedInputProps {
  name: string;
  validation: ZodSchema;
  error?: string;
  // ... other props
}

// hooks/useFormValidation.ts
export const useFormValidation = <T>(schema: ZodSchema<T>) => {
  // Form validation logic with Zod
};
```

## Phase 4: File Upload & Media Management (Week 4)

### 4.1 File Upload Service
```typescript
// services/api/upload.ts
export const uploadAPI = {
  uploadImage: (file: File, type: 'product' | 'avatar' | 'blog') => Promise<UploadResponse>,
  deleteImage: (imageId: string) => Promise<void>
};
```

### 4.2 Image Upload Components
- Drag & drop functionality
- Image preview and cropping
- Progress indicators
- Error handling for large files

## Phase 5: Real-time Features (Week 5)

### 5.1 WebSocket Integration
```typescript
// services/websocket.ts
export class WebSocketService {
  connect(): void;
  disconnect(): void;
  subscribe(channel: string, callback: Function): void;
  emit(event: string, data: any): void;
}

// hooks/useWebSocket.ts
export const useWebSocket = (channel: string) => {
  // WebSocket hook for real-time updates
};
```

## Current Gaps Analysis

### ❌ Missing Components:
1. **Authentication forms** - Login/Signup pages don't exist
2. **Protected route wrapper** - No auth guards implemented
3. **API error handling** - Limited error boundary coverage
4. **Loading states** - Inconsistent loading UI across components
5. **Validation feedback** - Form validation is basic HTML only

### ⚠️ Partially Implemented:
1. **Navigation** - Has auth flags but no actual auth logic
2. **State management** - Contexts exist but not connected to backend
3. **Error boundaries** - Present but not comprehensive
4. **Form handling** - Basic forms exist but lack validation

### ✅ Well Implemented:
1. **Component architecture** - Good separation of concerns
2. **Routing system** - Comprehensive with lazy loading
3. **UI components** - Complete design system
4. **Build system** - Optimized Vite configuration

## Recommendations

### Immediate Actions (Week 1):
1. **Create authentication system** - Highest priority
2. **Implement protected routes** - Secure user-specific pages
3. **Add form validation** - Prevent invalid data submission
4. **Setup API error handling** - Graceful failure management

### Short-term (Weeks 2-3):
1. **Connect existing contexts to backend APIs**
2. **Implement file upload for product images**
3. **Add loading states for all async operations**
4. **Create proper error pages and fallbacks**

### Medium-term (Weeks 4-5):
1. **Add real-time features for community interactions**
2. **Implement advanced search and filtering**
3. **Add notification system**
4. **Performance optimization for large datasets**

## Backend Integration Checklist

### Authentication:
- [ ] Login/signup forms with validation
- [ ] JWT token management
- [ ] Protected route components
- [ ] User session persistence
- [ ] Password reset functionality

### API Integration:
- [ ] Products CRUD operations
- [ ] Community posts and comments
- [ ] Blog publishing and management
- [ ] User profile management
- [ ] File upload endpoints

### State Management:
- [ ] Connect ProductContext to backend
- [ ] Connect ForumContext to backend
- [ ] Implement user state management
- [ ] Add optimistic updates

### Error Handling:
- [ ] API error interceptors
- [ ] Form validation with Zod
- [ ] Network error recovery
- [ ] User-friendly error messages

### Performance:
- [ ] Implement data pagination
- [ ] Add search debouncing
- [ ] Image optimization
- [ ] Caching strategies

This plan provides a structured approach to prepare the frontend for backend integration while maintaining the existing functionality and user experience.
