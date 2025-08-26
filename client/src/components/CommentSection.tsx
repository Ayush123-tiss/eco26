import React, { useState } from 'react';
import { useForum, Comment } from '../contexts/ForumContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const { addComment } = useForum();
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && username.trim()) {
      addComment(postId, {
        username: username.trim(),
        text: newComment.trim()
      });
      setNewComment('');
    }
  };

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
    <div className="space-y-4">
      {/* Comments Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-[#0F766E] transition-colors"
      >
        <svg 
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span>
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Existing Comments */}
            {comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-[#14B8A6] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 text-sm">
                          {comment.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                  required
                />
                <textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                  rows={2}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || !username.trim()}
                  className="px-4 py-2 bg-[#0F766E] text-white text-sm font-medium rounded-lg hover:bg-[#134E4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
