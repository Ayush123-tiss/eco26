import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Comment {
  id: string;
  postId: string;
  username: string;
  text: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  username: string;
  title: string;
  description: string;
  image?: string;
  upvotes: number;
  isUpvoted: boolean;
  comments: Comment[];
  timestamp: Date;
}

interface ForumState {
  posts: Post[];
}

type ForumAction = 
  | { type: 'ADD_POST'; payload: Omit<Post, 'id' | 'upvotes' | 'isUpvoted' | 'comments' | 'timestamp'> }
  | { type: 'TOGGLE_UPVOTE'; payload: string }
  | { type: 'ADD_COMMENT'; payload: { postId: string; comment: Omit<Comment, 'id' | 'postId' | 'timestamp'> } };

const initialState: ForumState = {
  posts: [
    {
      id: '1',
      username: 'EcoWarrior',
      title: 'Starting a Community Garden 🌱',
      description: 'Hi everyone! I\'m planning to start a community garden in my neighborhood. Looking for tips on how to get started and what crops work best for beginners.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      upvotes: 15,
      isUpvoted: false,
      comments: [
        {
          id: '1',
          postId: '1',
          username: 'GreenThumb',
          text: 'Start with herbs like basil and mint - they\'re very forgiving!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '2',
          postId: '1',
          username: 'UrbanFarmer',
          text: 'Make sure you test your soil first. Most hardware stores sell testing kits.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '2',
      username: 'SolarSaver',
      title: 'My Solar Panel Installation Journey',
      description: 'Just got solar panels installed! Here\'s what I learned about the process, costs, and savings. Happy to answer any questions!',
      upvotes: 23,
      isUpvoted: true,
      comments: [
        {
          id: '3',
          postId: '2',
          username: 'CuriousHomeowner',
          text: 'How long did the installation take?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000)
        }
      ],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '3',
      username: 'ZeroWasteLife',
      title: 'DIY Compost Bin Tutorial',
      description: 'Sharing my simple method for creating a compost bin from recycled materials. It\'s been working great for 6 months now!',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      upvotes: 8,
      isUpvoted: false,
      comments: [],
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
    }
  ]
};

function forumReducer(state: ForumState, action: ForumAction): ForumState {
  switch (action.type) {
    case 'ADD_POST':
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        upvotes: 0,
        isUpvoted: false,
        comments: [],
        timestamp: new Date()
      };
      return {
        ...state,
        posts: [newPost, ...state.posts]
      };

    case 'TOGGLE_UPVOTE':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload 
            ? {
                ...post,
                isUpvoted: !post.isUpvoted,
                upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1
              }
            : post
        )
      };

    case 'ADD_COMMENT':
      const newComment: Comment = {
        ...action.payload.comment,
        id: Date.now().toString(),
        postId: action.payload.postId,
        timestamp: new Date()
      };
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, newComment]
              }
            : post
        )
      };

    default:
      return state;
  }
}

interface ForumContextType {
  state: ForumState;
  addPost: (post: Omit<Post, 'id' | 'upvotes' | 'isUpvoted' | 'comments' | 'timestamp'>) => void;
  toggleUpvote: (postId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'postId' | 'timestamp'>) => void;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export function ForumProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(forumReducer, initialState);

  const addPost = (post: Omit<Post, 'id' | 'upvotes' | 'isUpvoted' | 'comments' | 'timestamp'>) => {
    dispatch({ type: 'ADD_POST', payload: post });
  };

  const toggleUpvote = (postId: string) => {
    dispatch({ type: 'TOGGLE_UPVOTE', payload: postId });
  };

  const addComment = (postId: string, comment: Omit<Comment, 'id' | 'postId' | 'timestamp'>) => {
    dispatch({ type: 'ADD_COMMENT', payload: { postId, comment } });
  };

  return (
    <ForumContext.Provider value={{ state, addPost, toggleUpvote, addComment }}>
      {children}
    </ForumContext.Provider>
  );
}

export function useForum() {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
}
