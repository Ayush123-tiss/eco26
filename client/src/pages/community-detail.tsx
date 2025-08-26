import React, { useState } from 'react';
import { useContent, Community } from '../contexts/ContentContext';
import BlogFeed from '../components/BlogFeed';
import PublishBlogModal from '../components/PublishBlogModal';
import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';

export default function CommunityDetailPage() {
  const { state } = useContent();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const params = useParams();
  const communityId = params.id;

  const community = state.communities.find(c => c.id === communityId);

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-white to-[#14B8A6]/10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Not Found</h2>
          <p className="text-gray-600 mb-6">The community you're looking for doesn't exist.</p>
          <Link href="/communities">
            <button className="px-6 py-3 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors">
              Back to Communities
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isUserMember = community.members.includes(state.currentUser);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return '1 week ago';
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/communities" className="text-[#0F766E] hover:text-[#134E4A] transition-colors">
            ← Back to Communities
          </Link>
        </nav>

        {/* Community Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-xl p-8 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{community.name}</h1>
                  <p className="text-white/80">Created {formatTimeAgo(community.timestamp)} by {community.creator}</p>
                </div>
              </div>
              <p className="text-lg text-white/90 mb-4">{community.description}</p>
              <div className="flex items-center space-x-6 text-sm text-white/80">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>{community.members.length} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{community.blogs.length} posts</span>
                </div>
              </div>
            </div>
            
            {isUserMember && (
              <div className="flex flex-col space-y-3">
                <div className="px-4 py-2 bg-white/20 rounded-lg text-center">
                  <span className="text-sm font-medium">✓ Member</span>
                </div>
                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="px-6 py-3 bg-white text-[#0F766E] rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Share Post</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Community Guidelines */}
        {isUserMember && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 mb-8"
          >
            <h3 className="font-semibold text-[#0F766E] mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Community Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-[#14B8A6]">•</span>
                <span>Keep discussions eco-friendly and respectful</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#14B8A6]">•</span>
                <span>Share valuable insights and resources</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#14B8A6]">•</span>
                <span>Welcome newcomers and encourage participation</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#14B8A6]">•</span>
                <span>Stay on topic and avoid spam</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Community Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Posts</h2>
            <p className="text-gray-600">Latest content shared by community members</p>
          </div>
          <BlogFeed communityId={communityId} />
        </motion.div>

        {/* Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Members</h3>
            <div className="flex flex-wrap gap-3">
              {community.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2 bg-[#FEF3C7] px-3 py-2 rounded-lg">
                  <div className="w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {member.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{member}</span>
                  {member === community.creator && (
                    <span className="px-2 py-1 bg-[#0F766E] text-white text-xs rounded-full">Creator</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Publish Blog Modal */}
        <PublishBlogModal
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          communityId={communityId}
        />
      </div>
    );
}
