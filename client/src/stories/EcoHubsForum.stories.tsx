import type { Meta, StoryObj } from '@storybook/react';
import { ForumProvider } from '@/contexts/ForumContext';
import PostCard from '@/components/PostCard';
import NewPostForm from '@/components/NewPostForm';
import CommentSection from '@/components/CommentSection';

const meta: Meta = {
  title: 'EcoBingle/EcoHubs Forum',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'EcoHubs Community Forum components with upvoting, commenting, and image upload functionality.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ForumProvider>
        <div className="max-w-2xl mx-auto p-4 bg-gradient-to-br from-[#FEF3C7] via-white to-[#14B8A6]/10 min-h-screen">
          <Story />
        </div>
      </ForumProvider>
    )
  ]
};

export default meta;

// Sample post data for stories
const samplePost = {
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
};

const samplePostWithoutImage = {
  ...samplePost,
  id: '2',
  title: 'Tips for Reducing Plastic Waste',
  description: 'I\'ve been working on reducing plastic waste in my daily life. Here are some simple swaps that have made a big difference: using reusable bags, glass containers for food storage, and bamboo toothbrushes.',
  image: undefined,
  upvotes: 23,
  isUpvoted: true,
  comments: []
};

type Story = StoryObj;

export const PostCardWithImage: Story = {
  name: 'Post Card with Image',
  render: () => <PostCard post={samplePost} />,
  parameters: {
    docs: {
      description: {
        story: 'A forum post card with an image, showing upvote functionality and expandable comments section.'
      }
    }
  }
};

export const PostCardWithoutImage: Story = {
  name: 'Post Card without Image',
  render: () => <PostCard post={samplePostWithoutImage} />,
  parameters: {
    docs: {
      description: {
        story: 'A forum post card without an image, showing the upvoted state.'
      }
    }
  }
};

export const PostCardUpvoted: Story = {
  name: 'Post Card (Upvoted State)',
  render: () => <PostCard post={{ ...samplePost, isUpvoted: true, upvotes: 16 }} />,
  parameters: {
    docs: {
      description: {
        story: 'A post card showing the upvoted state with the eco-green styling.'
      }
    }
  }
};

export const NewPostFormStory: Story = {
  name: 'New Post Form',
  render: () => <NewPostForm />,
  parameters: {
    docs: {
      description: {
        story: 'Modal form for creating new posts with image upload via drag-and-drop or file picker.'
      }
    }
  }
};

export const CommentSectionStory: Story = {
  name: 'Comment Section',
  render: () => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <CommentSection postId="1" comments={samplePost.comments} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Expandable comment section with the ability to add new comments.'
      }
    }
  }
};

export const EmptyCommentSection: Story = {
  name: 'Empty Comment Section',
  render: () => (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <CommentSection postId="2" comments={[]} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comment section with no existing comments, showing just the add comment form.'
      }
    }
  }
};

export const ForumInteractionDemo: Story = {
  name: 'Full Forum Demo',
  render: () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">EcoHubs Community Forum</h2>
        <p className="text-gray-600">Interactive demo showing all forum components</p>
      </div>
      
      <NewPostForm />
      
      <div className="space-y-6">
        <PostCard post={samplePost} />
        <PostCard post={samplePostWithoutImage} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete forum interface showing the new post form and sample posts with full interactivity.'
      }
    }
  }
};

// Interactive playground for testing different states
export const InteractivePlayground: Story = {
  name: 'Interactive Playground',
  render: () => {
    const playgroundPosts = [
      {
        ...samplePost,
        id: 'playground-1'
      },
      {
        ...samplePostWithoutImage,
        id: 'playground-2',
        username: 'SolarSaver',
        title: 'My Solar Panel Installation Journey',
        description: 'Just got solar panels installed! Here\'s what I learned about the process, costs, and savings. Happy to answer any questions!',
        upvotes: 12,
        isUpvoted: false
      },
      {
        id: 'playground-3',
        username: 'ZeroWasteLife',
        title: 'DIY Compost Bin Tutorial',
        description: 'Sharing my simple method for creating a compost bin from recycled materials. It\'s been working great for 6 months now!',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        upvotes: 8,
        isUpvoted: false,
        comments: [],
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/50">
          <h3 className="font-semibold text-[#0F766E] mb-2">🧪 Interactive Playground</h3>
          <p className="text-sm text-gray-600">Test all forum features: create posts, upvote, comment, and upload images!</p>
        </div>
        
        <NewPostForm />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#0F766E]">{playgroundPosts.length}</div>
            <div className="text-sm text-gray-600">Sample Posts</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#3B82F6]">
              {playgroundPosts.reduce((total, post) => total + post.comments.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Comments</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#14B8A6]">
              {playgroundPosts.reduce((total, post) => total + post.upvotes, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Upvotes</div>
          </div>
        </div>
        
        <div className="space-y-6">
          {playgroundPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete interactive playground to test all forum functionality including post creation, upvoting, and commenting.'
      }
    }
  }
};
