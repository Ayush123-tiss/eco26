import React, { useState } from 'react';
import { ContentProvider } from '../contexts/ContentContext';
import CommunityList from '../components/CommunityList';
import CreateCommunityModal from '../components/CreateCommunityModal';
import { motion } from 'framer-motion';

function CommunityPageContent() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#0F766E] rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">EcoHub Communities</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join eco-friendly communities, share knowledge, and connect with like-minded individuals 
            who are passionate about sustainable living and environmental conservation.
          </p>
        </motion.div>

        {/* Create Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Start Your Own Community</h2>
                <p className="text-gray-600">
                  Create a space for passionate eco-warriors to share ideas, tips, and support each other.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors font-medium flex items-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Community</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Community Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 rounded-lg p-4 text-center border border-white/50 hover:bg-white/80 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#0F766E] rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-900">Gardening</div>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center border border-white/50 hover:bg-white/80 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-900">Energy</div>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center border border-white/50 hover:bg-white/80 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-900">Zero Waste</div>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center border border-white/50 hover:bg-white/80 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-[#FEF3C7] border-2 border-[#0F766E] rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-900">Education</div>
            </div>
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-[#0F766E]">3</div>
            <div className="text-sm text-gray-600">Active Communities</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-[#3B82F6]">12</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-[#14B8A6]">1</div>
            <div className="text-sm text-gray-600">Community Posts</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
            <div className="text-2xl font-bold text-[#0F766E]">100%</div>
            <div className="text-sm text-gray-600">Eco-Friendly</div>
          </div>
        </motion.div>

        {/* Communities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Communities</h2>
            <p className="text-gray-600">Find your tribe and start making a difference together</p>
          </div>
          <CommunityList />
        </motion.div>

        {/* Create Community Modal */}
        <CreateCommunityModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <ContentProvider>
      <CommunityPageContent />
    </ContentProvider>
  );
}
