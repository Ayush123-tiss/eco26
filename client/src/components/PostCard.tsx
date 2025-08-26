import React from 'react';
import { useForum, Post } from '../contexts/ForumContext';
import CommentSection from './CommentSection';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { toggleUpvote } = useForum();

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#14B8A6] rounded-full flex items-center justify-center text-white font-semibold">
          {post.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{post.username}</div>
          <div className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {post.description}
        </p>

        {/* Image */}
        {post.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt="Post image"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          {/* Upvote Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleUpvote(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              post.isUpvoted
                ? 'bg-[#0F766E] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={post.isUpvoted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span className="font-medium">{post.upvotes}</span>
          </motion.button>

          {/* Comment Button */}
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">{post.comments.length}</span>
          </div>
        </div>

        {/* Share Button */}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-[#0F766E] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <CommentSection postId={post.id} comments={post.comments} />
    </motion.div>
  );
}
