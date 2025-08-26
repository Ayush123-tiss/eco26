// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// User types
export interface User extends BaseEntity {
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

// Community types
export interface Community extends BaseEntity {
  name: string;
  description: string;
  memberCount: number;
  icon?: string;
  color?: string;
  category: string;
}

export interface Thread extends BaseEntity {
  title: string;
  content: string;
  preview?: string;
  authorId: string;
  authorUsername: string;
  communityId?: string;
  communityName?: string;
  voteCount: number;
  commentCount: number;
  imageUrl?: string;
  category: string;
  section: 'community' | 'blog' | 'news';
}

export interface Comment extends BaseEntity {
  threadId: string;
  authorId: string;
  authorUsername: string;
  content: string;
  voteCount: number;
  parentId?: string; // For nested comments
}

export interface Vote extends BaseEntity {
  threadId?: string;
  commentId?: string;
  userId: string;
  voteType: 1 | -1; // upvote or downvote
}

// Product types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  imageUrl?: string;
  ecoPoints: number;
  ecoVerified: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  brand: string;
  tags: string[];
}

// API types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Form types
export interface CreateThreadForm {
  title: string;
  content: string;
  preview?: string;
  imageUrl?: string;
  category: string;
  section: 'community' | 'blog' | 'news';
}

export interface CreateCommentForm {
  content: string;
  threadId: string;
  parentId?: string;
}

// UI types
export type Theme = 'light' | 'dark' | 'system';
export type ViewMode = 'grid' | 'list';
export type SortOrder = 'newest' | 'oldest' | 'popular' | 'trending';
