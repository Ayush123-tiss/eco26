import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

// Simple in-memory data structures for the demo
export const ThreadSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  username: z.string(),
  timestamp: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  comments: z.number(),
  category: z.enum(['community', 'blog', 'news']),
});

export const CommentSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  content: z.string(),
  username: z.string(),
  timestamp: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
});

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  members: z.number(),
  description: z.string(),
});

// Insert schemas
export const insertThreadSchema = ThreadSchema.omit({ id: true, timestamp: true });
export const insertCommentSchema = CommentSchema.omit({ id: true, timestamp: true });

// Types
export type Thread = z.infer<typeof ThreadSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Community = z.infer<typeof CommunitySchema>;
export type InsertThread = z.infer<typeof insertThreadSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;