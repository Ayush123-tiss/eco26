import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Renewable Energy Breakthrough: Solar Efficiency Reaches 30%',
      excerpt: 'Scientists have developed new solar panel technology that achieves unprecedented efficiency levels.',
      category: 'renewable',
      date: '2024-12-20',
      author: 'Dr. Sarah Green',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Ocean Cleanup Project Removes 100,000 Pounds of Plastic',
      excerpt: 'The latest ocean cleanup mission has successfully removed massive amounts of plastic waste.',
      category: 'environment',
      date: '2024-12-19',
      author: 'Mike Ocean',
      readTime: '4 min read'
    },
    {
      id: '3',
      title: 'Sustainable Agriculture: Vertical Farms Show Promise',
      excerpt: 'New vertical farming techniques could revolutionize food production while using less water.',
      category: 'sustainability',
      date: '2024-12-18',
      author: 'Elena Rodriguez',
      readTime: '6 min read'
    }
  ];

  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Environmental News
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest environmental and sustainability news
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-6xl">📰</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {article.author}</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
