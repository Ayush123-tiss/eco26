import React from 'react';
import { useContent, Community } from '../contexts/ContentContext';
import { motion } from 'framer-motion';

export default function CommunityList() {
  const { state, joinCommunity } = useContent();

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

  const isUserMember = (community: Community) => {
    return community.members.includes(state.currentUser);
  };

  const handleJoinCommunity = (communityId: string) => {
    joinCommunity(communityId);
  };

  if (state.communities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No communities yet</h3>
        <p className="text-gray-500">Create the first community and start building connections!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {state.communities.map((community, index) => (
        <motion.div
          key={community.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m11 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5" />
                </svg>
              </div>
              {isUserMember(community) && (
                <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                  Member
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform">
              {community.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <span>Created {formatTimeAgo(community.timestamp)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              {community.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
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

            {/* Creator */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 bg-[#14B8A6] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {community.creator.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{community.creator}</div>
                <div className="text-xs text-gray-500">Community Creator</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {isUserMember(community) ? (
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-[#FEF3C7] text-[#0F766E] rounded-lg font-medium hover:bg-[#FEF3C7]/80 transition-colors flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Member</span>
                  </button>
                  <button className="w-full px-4 py-2 bg-[#0F766E] text-white rounded-lg font-medium hover:bg-[#134E4A] transition-colors flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>View Community</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleJoinCommunity(community.id)}
                  className="w-full px-4 py-2 bg-[#0F766E] text-white rounded-lg font-medium hover:bg-[#134E4A] transition-colors flex items-center justify-center space-x-2 group/join"
                >
                  <svg className="w-4 h-4 group-hover/join:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Join Community</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
