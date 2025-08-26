import React from 'react';
import { ForumProvider } from '../contexts/ForumContext';
import { useForum } from '../contexts/ForumContext';
import PostCard from '../components/PostCard';
import NewPostForm from '../components/NewPostForm';
import { motion } from 'framer-motion';

function ForumContent() {
  const { state } = useForum();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-white to-[#14B8A6]/10">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#0F766E] rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8V4l4 4z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">EcoHubs Community</h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Connect, share, and learn with fellow eco-warriors. Share your sustainability journey, tips, and discoveries!
          </p>
        </motion.div>

        {/* New Post Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <NewPostForm />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
        <div className="space-y-6">
          {state.posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something with the community!</p>
            </motion.div>
          ) : (
            state.posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 text-sm">
            🌱 Together we're building a more sustainable future
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function EcoHubsForum() {
  return (
    <ForumProvider>
      <ForumContent />
    </ForumProvider>
  );
}
