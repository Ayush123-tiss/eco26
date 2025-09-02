import React, { useState } from 'react';
import { ContentProvider } from '../contexts/ContentContext';
import { ForumProvider, useForum } from '../contexts/ForumContext';
import CommunityList from '../components/CommunityList';
import CreateCommunityModal from '../components/CreateCommunityModal';
import PostCard from '../components/PostCard';
import NewPostForm from '../components/NewPostForm';
import { motion } from 'framer-motion';

function CommunityPageContent() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'communities' | 'discussions'>('communities');
  const { state } = useForum();

  return (
    <div className="w-full px-4 py-8">
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
          <h1 className="text-3xl font-bold text-gray-900">EcoHub Community</h1>
        </div>
        <p className="text-gray-600 text-lg px-4">
          Join eco-friendly communities, share knowledge, and connect with like-minded individuals 
          who are passionate about sustainable living and environmental conservation.
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setActiveTab('communities')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'communities'
                  ? 'bg-[#0F766E] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
                </svg>
                <span>Communities</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'discussions'
                  ? 'bg-[#0F766E] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8V4l4 4z" />
                </svg>
                <span>Discussions</span>
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Communities Tab Content */}
      {activeTab === 'communities' && (
        <>
          {/* Create Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.4 }}
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
              <div className="text-2xl font-bold text-[#14B8A6]">{state.posts.length}</div>
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
            transition={{ delay: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Communities</h2>
              <p className="text-gray-600">Find your tribe and start making a difference together</p>
            </div>
            <CommunityList />
          </motion.div>
        </>
      )}

      {/* Discussions Tab Content */}
      {activeTab === 'discussions' && (
        <div className="w-full">
          {/* New Post Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 max-w-4xl mx-auto"
          >
            <NewPostForm />
          </motion.div>

          {/* Discussion Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
              <div className="text-2xl font-bold text-[#0F766E]">{state.posts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
              <div className="text-2xl font-bold text-[#3B82F6]">
                {state.posts.reduce((total, post) => total + post.comments.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
              <div className="text-2xl font-bold text-[#14B8A6]">
                {state.posts.reduce((total, post) => total + post.upvotes, 0)}
              </div>
              <div className="text-sm text-gray-600">Upvotes</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
              <div className="text-2xl font-bold text-[#0F766E]">
                {new Set(state.posts.map(post => post.username)).size}
              </div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
          </motion.div>

          {/* Posts */}
          <div className="space-y-6 max-w-6xl mx-auto">
            {state.posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">Be the first to start a discussion with the community!</p>
              </motion.div>
            ) : (
              state.posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Create Community Modal */}
      <CreateCommunityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12 pt-8 border-t border-gray-200"
      >
        <p className="text-gray-500 text-sm">
          🌱 Together we're building a more sustainable future
        </p>
      </motion.div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <ContentProvider>
      <ForumProvider>
        <CommunityPageContent />
      </ForumProvider>
    </ContentProvider>
  );
}
