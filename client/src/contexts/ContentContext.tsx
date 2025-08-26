import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  timestamp: Date;
  communityId?: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  creator: string;
  members: string[];
  blogs: Blog[];
  timestamp: Date;
}

interface ContentState {
  blogs: Blog[];
  communities: Community[];
  currentUser: string;
}

type ContentAction = 
  | { type: 'ADD_BLOG'; payload: Omit<Blog, 'id' | 'timestamp'> }
  | { type: 'ADD_COMMUNITY'; payload: Omit<Community, 'id' | 'members' | 'blogs' | 'timestamp'> }
  | { type: 'JOIN_COMMUNITY'; payload: { communityId: string; userId: string } }
  | { type: 'ADD_COMMUNITY_BLOG'; payload: { communityId: string; blog: Omit<Blog, 'id' | 'timestamp' | 'communityId'> } };

const initialState: ContentState = {
  currentUser: 'EcoUser',
  blogs: [
    {
      id: '1',
      title: 'Getting Started with Solar Energy 🌞',
      content: 'Solar energy is one of the most accessible renewable energy sources for homeowners. In this post, I\'ll share my journey of installing solar panels and the benefits I\'ve experienced over the past year. The initial investment was significant, but the long-term savings and environmental impact make it worthwhile...',
      author: 'SolarSaver',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Zero Waste Kitchen Tips',
      content: 'Transitioning to a zero-waste kitchen doesn\'t have to be overwhelming. Here are 10 simple swaps that have made a huge difference in my household waste. Start with reusable containers, switch to bamboo utensils, and always bring your own bags to the grocery store...',
      author: 'ZeroWasteLife',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Building a Community Garden: Lessons Learned',
      content: 'After 6 months of running our neighborhood community garden, here are the key insights that can help you start your own. The most important factor is getting community buy-in and establishing clear guidelines from the beginning...',
      author: 'GreenThumb',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ],
  communities: [
    {
      id: '1',
      name: 'Urban Gardening Enthusiasts',
      description: 'A community for city dwellers passionate about growing their own food in small spaces. Share tips, tricks, and success stories!',
      creator: 'GreenThumb',
      members: ['GreenThumb', 'EcoWarrior', 'UrbanFarmer'],
      blogs: [
        {
          id: 'c1-b1',
          title: 'Vertical Gardening in Apartments',
          content: 'Living in a small apartment doesn\'t mean you can\'t grow your own food. Here\'s how I created a thriving vertical garden on my balcony...',
          author: 'UrbanFarmer',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          communityId: '1'
        }
      ],
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Renewable Energy Hub',
      description: 'Connect with others who are passionate about clean energy solutions. Discuss solar, wind, and other renewable technologies.',
      creator: 'SolarSaver',
      members: ['SolarSaver', 'WindPower', 'CleanTech'],
      blogs: [],
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Zero Waste Warriors',
      description: 'Join the movement towards zero waste living. Share strategies, products, and motivation to reduce our environmental footprint.',
      creator: 'ZeroWasteLife',
      members: ['ZeroWasteLife', 'MinimalImpact'],
      blogs: [],
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]
};

function contentReducer(state: ContentState, action: ContentAction): ContentState {
  switch (action.type) {
    case 'ADD_BLOG':
      const newBlog: Blog = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      return {
        ...state,
        blogs: [newBlog, ...state.blogs]
      };

    case 'ADD_COMMUNITY':
      const newCommunity: Community = {
        ...action.payload,
        id: Date.now().toString(),
        members: [state.currentUser],
        blogs: [],
        timestamp: new Date()
      };
      return {
        ...state,
        communities: [newCommunity, ...state.communities]
      };

    case 'JOIN_COMMUNITY':
      return {
        ...state,
        communities: state.communities.map(community =>
          community.id === action.payload.communityId
            ? {
                ...community,
                members: community.members.includes(action.payload.userId)
                  ? community.members
                  : [...community.members, action.payload.userId]
              }
            : community
        )
      };

    case 'ADD_COMMUNITY_BLOG':
      const newCommunityBlog: Blog = {
        ...action.payload.blog,
        id: Date.now().toString(),
        timestamp: new Date(),
        communityId: action.payload.communityId
      };
      return {
        ...state,
        communities: state.communities.map(community =>
          community.id === action.payload.communityId
            ? {
                ...community,
                blogs: [newCommunityBlog, ...community.blogs]
              }
            : community
        )
      };

    default:
      return state;
  }
}

interface ContentContextType {
  state: ContentState;
  addBlog: (blog: Omit<Blog, 'id' | 'timestamp'>) => void;
  addCommunity: (community: Omit<Community, 'id' | 'members' | 'blogs' | 'timestamp'>) => void;
  joinCommunity: (communityId: string) => void;
  addCommunityBlog: (communityId: string, blog: Omit<Blog, 'id' | 'timestamp' | 'communityId'>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(contentReducer, initialState);

  const addBlog = (blog: Omit<Blog, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_BLOG', payload: blog });
  };

  const addCommunity = (community: Omit<Community, 'id' | 'members' | 'blogs' | 'timestamp'>) => {
    dispatch({ type: 'ADD_COMMUNITY', payload: community });
  };

  const joinCommunity = (communityId: string) => {
    dispatch({ type: 'JOIN_COMMUNITY', payload: { communityId, userId: state.currentUser } });
  };

  const addCommunityBlog = (communityId: string, blog: Omit<Blog, 'id' | 'timestamp' | 'communityId'>) => {
    dispatch({ type: 'ADD_COMMUNITY_BLOG', payload: { communityId, blog } });
  };

  return (
    <ContentContext.Provider value={{ state, addBlog, addCommunity, joinCommunity, addCommunityBlog }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
