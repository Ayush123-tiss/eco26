import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Search, ShoppingCart, Star, Loader2, Eye } from 'lucide-react';
import Header from '@/shared/components/layout/header';
import { StaggeredGrid, AnimatedCard } from '@/shared/animations';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice?: number | null;
  category: string;
  subcategory?: string | null;
  imageUrl?: string | null;
  ecoPoints: number | null;
  ecoVerified: number;
  inStock: number;
  stockCount: number | null;
  rating: number | null;
  reviewCount: number | null;
  brand?: string | null;
  tags?: string[] | null;
}

export default function Products() {
  const [activeTab, setActiveTab] = useState<'people' | 'products' | 'demo' | 'accessibility'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  const categories = [
    { id: '', name: 'All Categories', count: products.length },
    {
      id: 'Home',
      name: 'Home',
      count: products.filter(p => p.category === 'Home').length,
    },
    {
      id: 'Beauty',
      name: 'Beauty',
      count: products.filter(p => p.category === 'Beauty').length,
    },
    {
      id: 'Food',
      name: 'Food',
      count: products.filter(p => p.category === 'Food').length,
    },
    {
      id: 'Clothing',
      name: 'Clothing',
      count: products.filter(p => p.category === 'Clothing').length,
    },
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
  ];

  const filteredAndSortedProducts = products
    .filter(
      product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  if (activeTab === 'people') {
    // Redirect to home page with people tab active
    window.location.href = '/';
    return null;
  }

  if (activeTab === 'demo') {
    // Redirect to demo page
    window.location.href = '/demo';
    return null;
  }

  if (activeTab === 'accessibility') {
    // Redirect to accessibility page
    window.location.href = '/accessibility';
    return null;
  }

  return (
    <div className='min-h-screen bg-eco-gray-50 text-eco-gray-700'>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <div className='w-full px-4 py-6'>
        <div className='flex'>
          {/* Left Sidebar - Filters */}
          <div className='mr-6 w-64 flex-shrink-0 space-y-6'>
            {/* Categories */}
            <Card>
              <CardContent className='p-4'>
                <h3 className='mb-4 text-lg font-semibold text-eco-gray-800'>
                  CATEGORIES
                </h3>
                <div className='space-y-3'>
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className='flex items-center space-x-3'
                    >
                      <Checkbox
                        id={category.id}
                        checked={selectedCategory === category.id}
                        onCheckedChange={checked => {
                          setSelectedCategory(checked ? category.id : '');
                        }}
                        data-testid={`checkbox-category-${category.id || 'all'}`}
                      />
                      <label
                        htmlFor={category.id}
                        className='flex-1 cursor-pointer text-sm font-medium text-eco-gray-700'
                      >
                        {category.name}
                      </label>
                      <span className='text-xs text-eco-gray-500'>
                        ({category.count})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sort By */}
            <Card>
              <CardContent className='p-4'>
                <h3 className='mb-4 text-lg font-semibold text-eco-gray-800'>
                  SORT BY
                </h3>
                <div className='space-y-3'>
                  {sortOptions.map(option => (
                    <div
                      key={option.id}
                      className='flex items-center space-x-3'
                    >
                      <Checkbox
                        id={option.id}
                        checked={sortBy === option.id}
                        onCheckedChange={checked => {
                          if (checked) setSortBy(option.id);
                        }}
                        data-testid={`checkbox-sort-${option.id}`}
                      />
                      <label
                        htmlFor={option.id}
                        className='cursor-pointer text-sm font-medium text-eco-gray-700'
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <main className='flex-1'>
            {/* Search Bar */}
            <div className='mb-6'>
              <div className='relative max-w-2xl'>
                <Search className='text-eco-gray-400 absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform' />
                <Input
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-full rounded-lg border-eco-gray-300 py-3 pl-11 pr-4 text-base focus:border-eco-green focus:ring-eco-green'
                  data-testid='input-product-search'
                />
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className='flex items-center justify-center py-12'>
                <Loader2 className='h-8 w-8 animate-spin text-eco-green' />
                <span className='ml-2 text-eco-gray-600'>
                  Loading products...
                </span>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className='py-12 text-center'>
                <h3 className='mb-2 text-xl font-semibold text-eco-gray-800'>
                  No products found
                </h3>
                <p className='text-eco-gray-600'>
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <StaggeredGrid className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredAndSortedProducts.map(product => (
                  <AnimatedCard
                    key={product.id}
                    className='group transition-shadow duration-200 hover:shadow-lg'
                    enableHover={true}
                  >
                    <Card className='h-full'>
                      <CardContent className='p-0'>
                      {/* Product Image */}
                      <div className='relative aspect-square overflow-hidden rounded-t-lg bg-eco-gray-100'>
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-eco-gray-100 to-eco-gray-200'>
                            <div className='text-center'>
                              <div className='mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-eco-gray-300'>
                                <ShoppingCart className='h-8 w-8 text-eco-gray-500' />
                              </div>
                              <span className='text-sm text-eco-gray-500'>
                                No Image
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Quick View Button */}
                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all duration-200 group-hover:bg-opacity-20 group-hover:opacity-100'>
                          <Button
                            variant='secondary'
                            size='sm'
                            className='bg-white text-eco-gray-800 hover:bg-eco-gray-50'
                            data-testid={`button-quick-view-${product.id}`}
                          >
                            <Eye className='mr-2 h-4 w-4' />
                            Quick View
                          </Button>
                        </div>

                        {/* Eco Verified Badge */}
                        {product.ecoVerified === 1 && (
                          <Badge
                            className='absolute right-2 top-2 bg-eco-green px-2 py-1 text-xs font-medium text-white'
                            data-testid={`badge-eco-verified-${product.id}`}
                          >
                            ECO VERIFIED
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className='p-4'>
                        <div className='mb-2'>
                          {product.brand && (
                            <p className='mb-1 text-xs uppercase tracking-wide text-eco-gray-500'>
                              {product.brand}
                            </p>
                          )}
                          <h3 className='line-clamp-2 text-sm font-semibold leading-tight text-eco-gray-800'>
                            {product.name}
                          </h3>
                        </div>

                        {/* Rating */}
                        {product.rating && product.reviewCount && (
                          <div className='mb-2 flex items-center'>
                            <div className='flex items-center'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < product.rating!
                                      ? 'fill-current text-yellow-400'
                                      : 'text-eco-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className='ml-1 text-xs text-eco-gray-500'>
                              ({product.reviewCount})
                            </span>
                          </div>
                        )}

                        {/* Price */}
                        <div className='mb-3 flex items-center justify-between'>
                          <div className='flex items-center space-x-1'>
                            <span className='text-lg font-bold text-eco-gray-800'>
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <span className='text-sm text-eco-gray-500 line-through'>
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                          </div>
                          {product.ecoPoints && product.ecoPoints > 0 && (
                            <Badge variant='outline' className='text-xs'>
                              {product.ecoPoints} Eco Points
                            </Badge>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className='w-full rounded-lg bg-eco-green py-2 font-medium text-white transition-colors hover:bg-eco-green-dark'
                          disabled={product.inStock === 0}
                          data-testid={`button-add-to-cart-${product.id}`}
                        >
                          {product.inStock === 0 ? (
                            'Out of Stock'
                          ) : (
                            <>
                              <ShoppingCart className='mr-2 h-4 w-4' />
                              ADD TO CART
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                    </Card>
                  </AnimatedCard>
                ))}
              </StaggeredGrid>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
