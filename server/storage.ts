import { Thread, Comment, Community, InsertThread, InsertComment } from '../shared/schema';

export interface IStorage {
  // Threads
  getThreads(category?: string): Promise<Thread[]>;
  getThread(id: string): Promise<Thread | null>;
  createThread(thread: InsertThread): Promise<Thread>;
  updateThreadVotes(id: string, upvotes: number, downvotes: number): Promise<void>;
  
  // Comments
  getComments(threadId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Communities
  getCommunities(): Promise<Community[]>;
}

class MemStorage implements IStorage {
  private threads: Thread[] = [
    {
      id: '1',
      title: 'How to reduce plastic waste in your daily life',
      content: 'Looking for practical tips to minimize plastic consumption...',
      username: 'EcoWarrior',
      timestamp: '2 hours ago',
      upvotes: 24,
      downvotes: 2,
      comments: 8,
      category: 'community'
    },
    {
      id: '2', 
      title: 'Solar panel installation experience',
      content: 'Just installed solar panels on my roof. Here\'s what I learned...',
      username: 'SolarSam',
      timestamp: '4 hours ago',
      upvotes: 15,
      downvotes: 1,
      comments: 12,
      category: 'community'
    },
    {
      id: '3',
      title: 'New study shows benefits of urban green spaces',
      content: 'Research reveals significant environmental and health benefits...',
      username: 'GreenResearcher',
      timestamp: '6 hours ago',
      upvotes: 32,
      downvotes: 0,
      comments: 5,
      category: 'news'
    }
  ];

  private comments: Comment[] = [];

  private communities: Community[] = [
    { id: '1', name: 'Sustainability', members: 45017, description: 'Sustainable living tips' },
    { id: '2', name: 'Zero Waste', members: 28456, description: 'Zero waste lifestyle' },
    { id: '3', name: 'Green Energy', members: 19823, description: 'Renewable energy discussion' },
    { id: '4', name: 'Climate Action', members: 62341, description: 'Climate change solutions' },
    { id: '5', name: 'Eco Products', members: 35782, description: 'Sustainable product reviews' }
  ];

  async getThreads(category?: string): Promise<Thread[]> {
    if (category) {
      return this.threads.filter(t => t.category === category);
    }
    return this.threads;
  }

  async getThread(id: string): Promise<Thread | null> {
    return this.threads.find(t => t.id === id) || null;
  }

  async createThread(thread: InsertThread): Promise<Thread> {
    const newThread: Thread = {
      ...thread,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: 'just now',
    };
    this.threads.unshift(newThread);
    return newThread;
  }

  async updateThreadVotes(id: string, upvotes: number, downvotes: number): Promise<void> {
    const thread = this.threads.find(t => t.id === id);
    if (thread) {
      thread.upvotes = upvotes;
      thread.downvotes = downvotes;
    }
  }

  async getComments(threadId: string): Promise<Comment[]> {
    return this.comments.filter(c => c.threadId === threadId);
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = {
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: 'just now',
    };
    this.comments.push(newComment);
    return newComment;
  }

  async getCommunities(): Promise<Community[]> {
    return this.communities;
  }
}

export const storage = new MemStorage();