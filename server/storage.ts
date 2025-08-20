import { type User, type InsertUser, type Community, type InsertCommunity, type Thread, type InsertThread, type Vote, type InsertVote, type Comment, type InsertComment, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCommunities(): Promise<Community[]>;
  getCommunity(id: string): Promise<Community | undefined>;
  createCommunity(community: InsertCommunity): Promise<Community>;
  
  getThreads(section?: string): Promise<Thread[]>;
  getThread(id: string): Promise<Thread | undefined>;
  createThread(thread: InsertThread): Promise<Thread>;
  updateThread(id: string, updates: Partial<Thread>): Promise<Thread | undefined>;
  
  getVote(threadId: string, userId: string): Promise<Vote | undefined>;
  createVote(vote: InsertVote): Promise<Vote>;
  updateVote(threadId: string, userId: string, voteType: number): Promise<Vote>;
  deleteVote(threadId: string, userId: string): Promise<void>;
  
  getComments(threadId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  getProducts(category?: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private communities: Map<string, Community>;
  private threads: Map<string, Thread>;
  private votes: Map<string, Vote>;
  private comments: Map<string, Comment>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.communities = new Map();
    this.threads = new Map();
    this.votes = new Map();
    this.comments = new Map();
    this.products = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed communities
    const communityData: InsertCommunity[] = [
      {
        name: "r/sustainability",
        description: "A community for discussing sustainable living practices",
        memberCount: 1200000,
        icon: "seedling",
        color: "#10B981",
        category: "Environment"
      },
      {
        name: "r/renewableenergy",
        description: "Discussion about renewable energy sources",
        memberCount: 875000,
        icon: "solar-panel",
        color: "#34D399",
        category: "Energy"
      },
      {
        name: "r/zerowaste",
        description: "Zero waste living tips and discussions",
        memberCount: 650000,
        icon: "recycle",
        color: "#059669",
        category: "Waste Reduction"
      },
      {
        name: "r/electricvehicles",
        description: "Electric vehicle news and discussions",
        memberCount: 520000,
        icon: "car-battery",
        color: "#3B82F6",
        category: "Transportation"
      },
      {
        name: "r/gardening",
        description: "Gardening tips and community",
        memberCount: 2800000,
        icon: "leaf",
        color: "#F97316",
        category: "Gardening"
      }
    ];

    communityData.forEach(community => {
      const id = randomUUID();
      this.communities.set(id, { ...community, id });
    });

    // Seed threads
    const threadData: InsertThread[] = [
      {
        title: "How solar panels changed my carbon footprint - 6 month update with real data",
        content: "I installed solar panels 6 months ago and wanted to share the real numbers with the community. The results were better than expected...",
        preview: "I installed solar panels 6 months ago and wanted to share the real numbers with the community. The results were better than expected...",
        authorId: "user1",
        authorUsername: "EcoWarrior2023",
        communityName: "r/renewableenergy",
        voteCount: 127,
        commentCount: 43,
        imageUrl: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Climate Action",
        section: "community"
      },
      {
        title: "Started a vertical garden in my apartment - here's what I learned",
        content: "Living in the city doesn't mean you can't grow your own food! Here are some tips for starting a vertical garden in small spaces...",
        preview: "Living in the city doesn't mean you can't grow your own food! Here are some tips for starting a vertical garden in small spaces...",
        authorId: "user2",
        authorUsername: "GreenGardener",
        communityName: "r/gardening",
        voteCount: 89,
        commentCount: 27,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Urban Gardening",
        section: "community"
      },
      {
        title: "Complete guide to zero waste grocery shopping + free printable checklist",
        content: "After 2 years of zero waste shopping, I've created the ultimate guide to help others make the transition. Includes a free printable checklist!",
        preview: "After 2 years of zero waste shopping, I've created the ultimate guide to help others make the transition. Includes a free printable checklist!",
        authorId: "user3",
        authorUsername: "ZeroWasteLife",
        communityName: "r/zerowaste",
        voteCount: 156,
        commentCount: 72,
        category: "Waste Reduction",
        section: "community"
      },
      {
        title: "Electric vehicle vs hybrid: Real-world comparison after 50,000 miles",
        content: "I've been driving both an EV and hybrid for work. Here's the real comparison including costs, maintenance, and environmental impact...",
        preview: "I've been driving both an EV and hybrid for work. Here's the real comparison including costs, maintenance, and environmental impact...",
        authorId: "user4",
        authorUsername: "ElectricDrive",
        communityName: "r/electricvehicles",
        voteCount: 203,
        commentCount: 98,
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Green Tech",
        section: "community"
      },
      {
        title: "The Future of Renewable Energy: Latest Innovations",
        content: "Exploring the cutting-edge developments in renewable energy technology and their potential impact on our sustainable future.",
        preview: "Exploring the cutting-edge developments in renewable energy technology and their potential impact on our sustainable future.",
        authorId: "user5",
        authorUsername: "TechGuru",
        communityName: "r/renewableenergy",
        voteCount: 78,
        commentCount: 15,
        category: "Innovation",
        section: "blog"
      },
      {
        title: "Climate Summit 2024: Key Takeaways and Global Commitments",
        content: "Breaking down the most important announcements and commitments from the latest international climate summit.",
        preview: "Breaking down the most important announcements and commitments from the latest international climate summit.",
        authorId: "user6",
        authorUsername: "ClimateReporter",
        communityName: "r/sustainability",
        voteCount: 234,
        commentCount: 67,
        category: "Climate Policy",
        section: "news"
      }
    ];

    threadData.forEach(thread => {
      const id = randomUUID();
      this.threads.set(id, { ...thread, id, createdAt: new Date() });
    });
    
    // Seed products
    const productData: InsertProduct[] = [
      {
        name: "Bamboo Fiber Water Bottle",
        description: "Eco-friendly reusable water bottle made from sustainable bamboo fiber. BPA-free and dishwasher safe.",
        price: 2495, // $24.95
        category: "Home",
        subcategory: "Kitchen",
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 150,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 45,
        rating: 5,
        reviewCount: 128,
        brand: "EcoLife",
        tags: ["sustainable", "BPA-free", "bamboo"]
      },
      {
        name: "Organic Cotton Reusable Bags Set",
        description: "Set of 3 organic cotton mesh bags perfect for grocery shopping and storage.",
        price: 1899, // $18.99
        originalPrice: 2499,
        category: "Home",
        subcategory: "Storage",
        imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 120,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 32,
        rating: 4,
        reviewCount: 87,
        brand: "GreenBag Co",
        tags: ["organic", "cotton", "reusable"]
      },
      {
        name: "Natural Bamboo Toothbrush",
        description: "100% biodegradable bamboo toothbrush with soft bristles. Zero waste dental care.",
        price: 895, // $8.95
        category: "Beauty",
        subcategory: "Oral Care",
        imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 75,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 156,
        rating: 5,
        reviewCount: 234,
        brand: "BambooSmile",
        tags: ["bamboo", "biodegradable", "zero-waste"]
      },
      {
        name: "Organic Quinoa & Chia Superfood Mix",
        description: "Premium organic quinoa and chia seed blend packed with protein and omega-3.",
        price: 1599, // $15.99
        category: "Food",
        subcategory: "Superfoods",
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 100,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 23,
        rating: 4,
        reviewCount: 67,
        brand: "PureSeed",
        tags: ["organic", "superfood", "protein"]
      },
      {
        name: "Hemp Organic T-Shirt",
        description: "Comfortable and durable t-shirt made from 100% organic hemp fiber. Naturally antimicrobial.",
        price: 3995, // $39.95
        category: "Clothing",
        subcategory: "Shirts",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 200,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 28,
        rating: 4,
        reviewCount: 45,
        brand: "EcoThreads",
        tags: ["hemp", "organic", "antimicrobial"]
      },
      {
        name: "Solar Power Bank 20000mAh",
        description: "High capacity solar power bank with dual USB ports. Perfect for outdoor adventures.",
        price: 4599, // $45.99
        originalPrice: 5999,
        category: "Home",
        subcategory: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1609298882994-1e988cf4a7b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 250,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 15,
        rating: 5,
        reviewCount: 91,
        brand: "SolarTech",
        tags: ["solar", "renewable", "outdoor"]
      },
      {
        name: "Organic Coconut Oil Face Cream",
        description: "Nourishing face cream made with organic coconut oil and essential vitamins.",
        price: 2299, // $22.99
        category: "Beauty",
        subcategory: "Skincare",
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 130,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 42,
        rating: 5,
        reviewCount: 156,
        brand: "PureNature",
        tags: ["organic", "coconut", "natural"]
      },
      {
        name: "Recycled Aluminum Water Bottle",
        description: "Lightweight and durable water bottle made from 100% recycled aluminum.",
        price: 1995, // $19.95
        category: "Home",
        subcategory: "Kitchen",
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        ecoPoints: 110,
        ecoVerified: 1,
        inStock: 1,
        stockCount: 67,
        rating: 4,
        reviewCount: 73,
        brand: "RecycleLife"
        tags: ["recycled", "aluminum", "lightweight"]
      }
    ];
    
    productData.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { ...product, id, createdAt: new Date() });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCommunities(): Promise<Community[]> {
    return Array.from(this.communities.values());
  }

  async getCommunity(id: string): Promise<Community | undefined> {
    return this.communities.get(id);
  }

  async createCommunity(insertCommunity: InsertCommunity): Promise<Community> {
    const id = randomUUID();
    const community: Community = { ...insertCommunity, id };
    this.communities.set(id, community);
    return community;
  }

  async getThreads(section?: string): Promise<Thread[]> {
    const threads = Array.from(this.threads.values());
    if (section) {
      return threads.filter(thread => thread.section === section);
    }
    return threads.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getThread(id: string): Promise<Thread | undefined> {
    return this.threads.get(id);
  }

  async createThread(insertThread: InsertThread): Promise<Thread> {
    const id = randomUUID();
    const thread: Thread = { 
      ...insertThread, 
      id, 
      createdAt: new Date(),
      voteCount: 0,
      commentCount: 0
    };
    this.threads.set(id, thread);
    return thread;
  }

  async updateThread(id: string, updates: Partial<Thread>): Promise<Thread | undefined> {
    const thread = this.threads.get(id);
    if (!thread) return undefined;
    
    const updatedThread = { ...thread, ...updates };
    this.threads.set(id, updatedThread);
    return updatedThread;
  }

  async getVote(threadId: string, userId: string): Promise<Vote | undefined> {
    return Array.from(this.votes.values()).find(
      vote => vote.threadId === threadId && vote.userId === userId
    );
  }

  async createVote(insertVote: InsertVote): Promise<Vote> {
    const id = randomUUID();
    const vote: Vote = { ...insertVote, id };
    this.votes.set(id, vote);
    return vote;
  }

  async updateVote(threadId: string, userId: string, voteType: number): Promise<Vote> {
    const existingVote = await this.getVote(threadId, userId);
    if (existingVote) {
      existingVote.voteType = voteType;
      this.votes.set(existingVote.id, existingVote);
      return existingVote;
    }
    return this.createVote({ threadId, userId, voteType });
  }

  async deleteVote(threadId: string, userId: string): Promise<void> {
    const vote = await this.getVote(threadId, userId);
    if (vote) {
      this.votes.delete(vote.id);
    }
  }

  async getComments(threadId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.threadId === threadId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = { 
      ...insertComment, 
      id, 
      createdAt: new Date(),
      voteCount: 0
    };
    this.comments.set(id, comment);
    return comment;
  }
  
  async getProducts(category?: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    if (category) {
      return products.filter(product => product.category === category);
    }
    return products.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }
  
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
