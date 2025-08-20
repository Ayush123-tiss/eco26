import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ShoppingCart, Star, Loader2, Eye } from "lucide-react";
import Header from "@/components/Header";

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
  const [activeTab, setActiveTab] = useState<"people" | "products">("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) {
        params.append("category", selectedCategory);
      }
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  const categories = [
    { id: "", name: "All Categories", count: products.length },
    { id: "Home", name: "Home", count: products.filter(p => p.category === "Home").length },
    { id: "Beauty", name: "Beauty", count: products.filter(p => p.category === "Beauty").length },
    { id: "Food", name: "Food", count: products.filter(p => p.category === "Food").length },
    { id: "Clothing", name: "Clothing", count: products.filter(p => p.category === "Clothing").length },
  ];

  const sortOptions = [
    { id: "newest", name: "Newest" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "popularity", name: "Most Popular" },
    { id: "rating", name: "Highest Rated" },
  ];

  const filteredAndSortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case "rating":
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
    console.log("Add to cart:", productId);
  };

  if (activeTab === "people") {
    // Redirect to home page with people tab active
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen bg-eco-gray-50 text-eco-gray-700">
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="w-full px-4 py-6">
        <div className="flex">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0 mr-6 space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4 text-eco-gray-800">CATEGORIES</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategory === category.id}
                        onCheckedChange={(checked) => {
                          setSelectedCategory(checked ? category.id : "");
                        }}
                        data-testid={`checkbox-category-${category.id || 'all'}`}
                      />
                      <label
                        htmlFor={category.id}
                        className="flex-1 text-sm font-medium text-eco-gray-700 cursor-pointer"
                      >
                        {category.name}
                      </label>
                      <span className="text-xs text-eco-gray-500">({category.count})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sort By */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4 text-eco-gray-800">SORT BY</h3>
                <div className="space-y-3">
                  {sortOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={option.id}
                        checked={sortBy === option.id}
                        onCheckedChange={(checked) => {
                          if (checked) setSortBy(option.id);
                        }}
                        data-testid={`checkbox-sort-${option.id}`}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-medium text-eco-gray-700 cursor-pointer"
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
          <main className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-eco-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-3 w-full border-eco-gray-300 rounded-lg text-base focus:border-eco-green focus:ring-eco-green"
                  data-testid="input-product-search"
                />
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-eco-green" />
                <span className="ml-2 text-eco-gray-600">Loading products...</span>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-eco-gray-800 mb-2">No products found</h3>
                <p className="text-eco-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <div className="relative aspect-square bg-eco-gray-100 rounded-t-lg overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-eco-gray-100 to-eco-gray-200">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-2 bg-eco-gray-300 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="h-8 w-8 text-eco-gray-500" />
                              </div>
                              <span className="text-sm text-eco-gray-500">No Image</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Quick View Button */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white hover:bg-eco-gray-50 text-eco-gray-800"
                            data-testid={`button-quick-view-${product.id}`}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Quick View
                          </Button>
                        </div>

                        {/* Eco Verified Badge */}
                        {product.ecoVerified === 1 && (
                          <Badge 
                            className="absolute top-2 right-2 bg-eco-green text-white text-xs font-medium px-2 py-1"
                            data-testid={`badge-eco-verified-${product.id}`}
                          >
                            ECO VERIFIED
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="mb-2">
                          {product.brand && (
                            <p className="text-xs text-eco-gray-500 uppercase tracking-wide mb-1">
                              {product.brand}
                            </p>
                          )}
                          <h3 className="font-semibold text-eco-gray-800 text-sm leading-tight line-clamp-2">
                            {product.name}
                          </h3>
                        </div>

                        {/* Rating */}
                        {product.rating && product.reviewCount && (
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < product.rating! ? 'text-yellow-400 fill-current' : 'text-eco-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-eco-gray-500 ml-1">({product.reviewCount})</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            <span className="font-bold text-lg text-eco-gray-800">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm text-eco-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          {product.ecoPoints && product.ecoPoints > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {product.ecoPoints} Eco Points
                            </Badge>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-full bg-eco-green text-white hover:bg-eco-green-dark py-2 rounded-lg font-medium transition-colors"
                          disabled={product.inStock === 0}
                          data-testid={`button-add-to-cart-${product.id}`}
                        >
                          {product.inStock === 0 ? (
                            "Out of Stock"
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              ADD TO CART
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}