import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark,
  TrendingUp,
  Globe,
  Leaf,
  Recycle,
  Wind,
  Droplets,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  category: 'environment' | 'climate' | 'sustainability' | 'renewable' | 'conservation';
  imageUrl: string;
  tags: string[];
  featured: boolean;
}

const mockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Revolutionary Solar Panel Technology Reaches 50% Efficiency',
    excerpt: 'Scientists at MIT have developed a breakthrough solar panel technology that could revolutionize renewable energy adoption worldwide.',
    author: 'Dr. Sarah Chen',
    publishedAt: '2025-09-01T10:00:00Z',
    readTime: 5,
    views: 12500,
    likes: 834,
    category: 'renewable',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
    tags: ['Solar Energy', 'Innovation', 'MIT', 'Clean Tech'],
    featured: true
  },
  {
    id: '2',
    title: 'Ocean Cleanup Project Removes 100,000 Tons of Plastic',
    excerpt: 'The Ocean Cleanup foundation announces a major milestone in their mission to rid the oceans of plastic pollution.',
    author: 'Marina Rodriguez',
    publishedAt: '2025-08-30T14:30:00Z',
    readTime: 7,
    views: 8900,
    likes: 567,
    category: 'conservation',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    tags: ['Ocean Cleanup', 'Plastic Pollution', 'Marine Life'],
    featured: true
  },
  {
    id: '3',
    title: 'Cities Worldwide Adopt Zero-Waste Policies',
    excerpt: 'A growing number of cities are implementing comprehensive zero-waste policies to combat climate change.',
    author: 'James Wilson',
    publishedAt: '2025-08-28T09:15:00Z',
    readTime: 4,
    views: 6750,
    likes: 423,
    category: 'sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
    tags: ['Zero Waste', 'Urban Planning', 'Policy'],
    featured: false
  },
  {
    id: '4',
    title: 'New Study Shows Dramatic Arctic Ice Recovery',
    excerpt: 'Recent satellite data reveals unexpected recovery patterns in Arctic sea ice, offering hope for climate efforts.',
    author: 'Dr. Erik Larsen',
    publishedAt: '2025-08-25T16:45:00Z',
    readTime: 6,
    views: 15200,
    likes: 1205,
    category: 'climate',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    tags: ['Arctic', 'Climate Change', 'Ice Recovery', 'Research'],
    featured: false
  },
  {
    id: '5',
    title: 'Vertical Farms Produce 95% More Food with 90% Less Water',
    excerpt: 'Innovative vertical farming techniques are revolutionizing agriculture while addressing water scarcity concerns.',
    author: 'Lisa Park',
    publishedAt: '2025-08-22T11:20:00Z',
    readTime: 5,
    views: 9800,
    likes: 678,
    category: 'sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
    tags: ['Vertical Farming', 'Agriculture', 'Water Conservation'],
    featured: false
  },
  {
    id: '6',
    title: 'Wind Power Breaks New Global Records',
    excerpt: 'Wind energy generation reached historic highs this quarter, surpassing coal for the first time in many regions.',
    author: 'Alex Thompson',
    publishedAt: '2025-08-20T12:30:00Z',
    readTime: 4,
    views: 7200,
    likes: 512,
    category: 'renewable',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop',
    tags: ['Wind Energy', 'Renewable Power', 'Climate Action'],
    featured: false
  }
];

const categories = [
  { value: 'all', label: 'All News', icon: Globe },
  { value: 'environment', label: 'Environment', icon: Leaf },
  { value: 'climate', label: 'Climate', icon: Wind },
  { value: 'sustainability', label: 'Sustainability', icon: Recycle },
  { value: 'renewable', label: 'Renewable Energy', icon: TrendingUp },
  { value: 'conservation', label: 'Conservation', icon: Droplets }
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles = mockNewsData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🌍 EcoBingle News</h1>
            <p className="text-lg text-gray-600">Stay updated with the latest environmental and sustainability news</p>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured Articles - Horizontal Scroll */}
        {featuredArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-[#0F766E]" />
              Featured Stories
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer min-w-[400px] max-w-[400px] flex-shrink-0"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        article.category === 'environment' ? 'bg-green-100 text-green-800' :
                        article.category === 'climate' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'sustainability' ? 'bg-yellow-100 text-yellow-800' :
                        article.category === 'renewable' ? 'bg-purple-100 text-purple-800' :
                        'bg-cyan-100 text-cyan-800'
                      }`}>
                        {categories.find(c => c.value === article.category)?.label}
                      </span>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-[#0F766E] cursor-pointer transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} min</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(article.views)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(article.likes)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Articles - Grid Layout */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-[#0F766E]" />
              Latest News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      article.category === 'environment' ? 'bg-green-100 text-green-800' :
                      article.category === 'climate' ? 'bg-blue-100 text-blue-800' :
                      article.category === 'sustainability' ? 'bg-yellow-100 text-yellow-800' :
                      article.category === 'renewable' ? 'bg-purple-100 text-purple-800' :
                      'bg-cyan-100 text-cyan-800'
                    }`}>
                      {categories.find(c => c.value === article.category)?.label}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4 text-gray-400 hover:text-[#0F766E] cursor-pointer transition-colors" />
                      <Bookmark className="w-4 h-4 text-gray-400 hover:text-[#0F766E] cursor-pointer transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{article.author}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{article.readTime} min read</span>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(article.views)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{formatNumber(article.likes)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
