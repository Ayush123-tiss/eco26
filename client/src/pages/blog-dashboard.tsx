import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import BlogFeed from '../components/BlogFeed';
import PublishBlogModal from '../components/PublishBlogModal';
import { motion } from 'framer-motion';

export default function BlogDashboard() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-[#0F766E] rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EcoBingle Blog</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your eco-friendly journey, tips, and discoveries with the community. 
          Help others learn and be inspired by your sustainable living experiences.
        </p>
      </motion.div>

      {/* Publish Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Share?</h2>
              <p className="text-gray-600">
                Publish your eco-friendly insights and connect with like-minded individuals.
              </p>
            </div>
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="px-6 py-3 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors font-medium flex items-center space-x-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Publish Blog</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Blog Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-[#0F766E]">3</div>
          <div className="text-sm text-gray-600">Published Blogs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-[#3B82F6]">15</div>
          <div className="text-sm text-gray-600">Total Reads</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <div className="text-2xl font-bold text-[#14B8A6]">8</div>
          <div className="text-sm text-gray-600">Community Likes</div>
        </div>
      </motion.div>

      {/* Blog Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Blog Posts</h2>
          <p className="text-gray-600">Discover the latest eco-friendly content from our community</p>
        </div>
        <BlogFeed />
      </motion.div>

      {/* Publish Blog Modal */}
      <PublishBlogModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
}
