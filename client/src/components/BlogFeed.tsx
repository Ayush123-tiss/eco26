import React from 'react';
import { useContent, Blog } from '../contexts/ContentContext';
import { motion } from 'framer-motion';

interface BlogFeedProps {
  communityId?: string;
}

export default function BlogFeed({ communityId }: BlogFeedProps) {
  const { state } = useContent();

  const blogs = communityId
    ? state.communities.find(c => c.id === communityId)?.blogs || []
    : state.blogs;

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const isExternalLink = (content: string) => {
    return content.startsWith('http://') || content.startsWith('https://');
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
        <p className="text-gray-500">
          {communityId ? 'Be the first to share content in this community!' : 'Start sharing your eco-friendly journey by publishing your first blog!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog, index) => (
        <motion.article
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
          {/* Blog Image */}
          {blog.image && (
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#14B8A6] rounded-full flex items-center justify-center text-white font-semibold">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{blog.author}</div>
                <div className="text-sm text-gray-500">{formatTimeAgo(blog.timestamp)}</div>
              </div>
              {communityId && (
                <div className="px-3 py-1 bg-[#FEF3C7] text-[#0F766E] text-xs font-medium rounded-full">
                  Community Post
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#0F766E] transition-colors">
              {blog.title}
            </h2>

            {/* Content Preview */}
            <div className="text-gray-700 mb-4 leading-relaxed">
              {isExternalLink(blog.content) ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">External content:</p>
                  <a
                    href={blog.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#134E4A] transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View External Content</span>
                  </a>
                </div>
              ) : (
                <p>{truncateContent(blog.content)}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                {/* Like Button */}
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#0F766E] transition-colors group/like">
                  <svg className="w-5 h-5 group-hover/like:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">Like</span>
                </button>

                {/* Comment Button */}
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3B82F6] transition-colors group/comment">
                  <svg className="w-5 h-5 group-hover/comment:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">Comment</span>
                </button>

                {/* Share Button */}
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#14B8A6] transition-colors group/share">
                  <svg className="w-5 h-5 group-hover/share:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>

              {/* Read More */}
              {!isExternalLink(blog.content) && blog.content.length > 200 && (
                <button className="text-[#0F766E] hover:text-[#134E4A] text-sm font-medium transition-colors">
                  Read More →
                </button>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
