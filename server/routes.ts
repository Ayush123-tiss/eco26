import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertThreadSchema, insertVoteSchema, insertCommentSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all communities
  app.get("/api/communities", async (req, res) => {
    try {
      const communities = await storage.getCommunities();
      res.json(communities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch communities" });
    }
  });

  // Get threads with optional section filter
  app.get("/api/threads", async (req, res) => {
    try {
      const section = req.query.section as string;
      const threads = await storage.getThreads(section);
      res.json(threads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch threads" });
    }
  });

  // Get single thread
  app.get("/api/threads/:id", async (req, res) => {
    try {
      const thread = await storage.getThread(req.params.id);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }
      res.json(thread);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch thread" });
    }
  });

  // Create new thread
  app.post("/api/threads", async (req, res) => {
    try {
      const validatedData = insertThreadSchema.parse(req.body);
      const thread = await storage.createThread(validatedData);
      res.status(201).json(thread);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid thread data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create thread" });
    }
  });

  // Vote on thread
  app.post("/api/threads/:id/vote", async (req, res) => {
    try {
      const { voteType, userId } = req.body;
      const threadId = req.params.id;

      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }

      const thread = await storage.getThread(threadId);
      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }

      const existingVote = await storage.getVote(threadId, userId);
      let newVoteCount = thread.voteCount || 0;

      if (existingVote) {
        // Update existing vote
        const oldVoteType = existingVote.voteType;
        if (voteType === 0) {
          // Remove vote
          await storage.deleteVote(threadId, userId);
          newVoteCount -= oldVoteType;
        } else if (oldVoteType !== voteType) {
          // Change vote direction
          await storage.updateVote(threadId, userId, voteType);
          newVoteCount = newVoteCount - oldVoteType + voteType;
        }
      } else if (voteType !== 0) {
        // Create new vote
        await storage.createVote({ threadId, userId, voteType });
        newVoteCount += voteType;
      }

      const updatedThread = await storage.updateThread(threadId, { voteCount: newVoteCount });
      res.json(updatedThread);
    } catch (error) {
      res.status(500).json({ message: "Failed to process vote" });
    }
  });

  // Get comments for thread
  app.get("/api/threads/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getComments(req.params.id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  // Create comment
  app.post("/api/threads/:id/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        threadId: req.params.id
      });
      const comment = await storage.createComment(validatedData);
      
      // Update thread comment count
      const thread = await storage.getThread(req.params.id);
      if (thread) {
        await storage.updateThread(req.params.id, { 
          commentCount: (thread.commentCount || 0) + 1 
        });
      }
      
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Products API routes
  // Get all products with optional category filter
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string;
      const products = await storage.getProducts(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create new product
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
