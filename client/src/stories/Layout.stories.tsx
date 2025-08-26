import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/shared/components/layout/header';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { AnimatedCard } from '@/shared/animations/components/AnimatedCard';
import { Heart, MessageCircle, Share2, Leaf, Users, TrendingUp } from 'lucide-react';

// Mock layout component for demonstration
const EcoLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-eco-gray-50">
    <Header 
      activeTab="people" 
      onTabChange={() => {}} 
    />
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  </div>
);

// Sample feed component
const EcoFeed = () => (
  <div className="max-w-2xl mx-auto space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="border-eco-gray-200">
        <CardContent className="p-4 text-center">
          <Users className="w-8 h-8 text-eco-green mx-auto mb-2" />
          <div className="text-2xl font-bold text-eco-gray-800">1,247</div>
          <div className="text-sm text-eco-gray-600">Eco Warriors</div>
        </CardContent>
      </Card>
      
      <Card className="border-eco-gray-200">
        <CardContent className="p-4 text-center">
          <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-eco-gray-800">89.5k</div>
          <div className="text-sm text-eco-gray-600">CO₂ Saved (kg)</div>
        </CardContent>
      </Card>
      
      <Card className="border-eco-gray-200">
        <CardContent className="p-4 text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-eco-gray-800">342</div>
          <div className="text-sm text-eco-gray-600">Actions Today</div>
        </CardContent>
      </Card>
    </div>

    {/* Sample Posts */}
    {[
      {
        id: 1,
        user: 'EcoWarrior',
        avatar: 'EW',
        time: '2 hours ago',
        content: 'Just completed my first week of zero-waste living! 🌱 Amazing how much plastic we avoid.',
        tags: ['Zero Waste', 'Sustainability'],
        likes: 24,
        comments: 8,
        shares: 3,
      },
      {
        id: 2,
        user: 'GreenLiving',
        avatar: 'GL',
        time: '4 hours ago',
        content: 'Installed solar panels on my roof today! Expected to reduce electricity costs by 70%.',
        tags: ['Solar Energy', 'Renewable'],
        likes: 42,
        comments: 15,
        shares: 7,
      },
      {
        id: 3,
        user: 'PlantMom',
        avatar: 'PM',
        time: '6 hours ago',
        content: 'My urban garden produced 15kg of vegetables this month! Home-grown tastes so much better.',
        tags: ['Urban Farming', 'Organic'],
        likes: 67,
        comments: 23,
        shares: 12,
      },
    ].map((post) => (
      <AnimatedCard key={post.id} className="border border-eco-gray-200 shadow-sm hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-eco-green text-white flex items-center justify-center font-bold">
              {post.avatar}
            </div>
            <div>
              <div className="font-semibold text-eco-gray-800">{post.user}</div>
              <div className="text-xs text-eco-gray-500">{post.time}</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-eco-gray-700 mb-3">{post.content}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-eco-green bg-opacity-10 text-eco-green text-xs"
              >
                <Leaf className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-eco-gray-100">
            <button className="flex items-center text-eco-gray-500 hover:text-red-500 transition-colors text-sm">
              <Heart className="w-4 h-4 mr-1" />
              {post.likes}
            </button>
            <button className="flex items-center text-eco-gray-500 hover:text-eco-green transition-colors text-sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </button>
            <button className="flex items-center text-eco-gray-500 hover:text-blue-500 transition-colors text-sm">
              <Share2 className="w-4 h-4 mr-1" />
              {post.shares}
            </button>
          </div>
        </CardContent>
      </AnimatedCard>
    ))}
  </div>
);

const meta: Meta<typeof EcoLayout> = {
  title: 'EcoBingle/Layout',
  component: EcoLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete page layouts showcasing the EcoBingle design system with headers, navigation, and content areas.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  args: {
    children: <EcoFeed />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Main homepage layout with eco-themed header, stats cards, and community feed.',
      },
    },
  },
};

export const HeaderOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-white">
      <Header activeTab="people" onTabChange={() => {}} />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-eco-gray-800 mb-4">
            EcoBingle Header Component
          </h1>
          <p className="text-eco-gray-600 mb-6">
            The header features animated navigation, eco-themed styling, and responsive design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-eco-gray-200">
              <CardHeader>
                <CardTitle className="text-eco-gray-800">Navigation Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Animated navigation buttons
                </div>
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Active state indicators
                </div>
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Responsive design
                </div>
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Accessibility support
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-eco-gray-200">
              <CardHeader>
                <CardTitle className="text-eco-gray-800">Styling Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Eco-green color scheme
                </div>
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Smooth hover transitions
                </div>
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Shadow and elevation
                </div>
                <div className="flex items-center text-eco-gray-600">
                  <Leaf className="w-4 h-4 text-eco-green mr-2" />
                  Consistent typography
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Isolated header component demonstration with feature explanations.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    children: (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-24 h-24 bg-eco-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-12 h-12 text-eco-green" />
        </div>
        <h2 className="text-2xl font-bold text-eco-gray-800 mb-4">
          Welcome to EcoBingle!
        </h2>
        <p className="text-eco-gray-600 mb-8 leading-relaxed">
          Join our community of eco-warriors making a positive impact on the planet. 
          Share your sustainable journey, discover eco-friendly products, and connect with like-minded individuals.
        </p>
        <div className="space-x-4">
          <Button className="bg-eco-green hover:bg-eco-green-dark text-white px-8 py-3">
            Get Started
          </Button>
          <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-8 py-3">
            Learn More
          </Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state layout for new users or when no content is available.',
      },
    },
  },
};

export const ProductsPage: Story = {
  args: {
    children: (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eco-gray-800 mb-2">Eco Products</h1>
          <p className="text-eco-gray-600">Discover sustainable products that make a difference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: 'Bamboo Water Bottle',
              price: '$24.99',
              description: 'Sustainable hydration solution',
              category: 'Kitchen',
            },
            {
              id: 2,
              title: 'Solar Power Bank',
              price: '$89.99',
              description: 'Portable renewable energy',
              category: 'Electronics',
            },
            {
              id: 3,
              title: 'Organic Cotton Tote',
              price: '$15.99',
              description: 'Reusable shopping bag',
              category: 'Fashion',
            },
            {
              id: 4,
              title: 'Compost Bin Kit',
              price: '$45.99',
              description: 'Turn waste into nutrients',
              category: 'Garden',
            },
            {
              id: 5,
              title: 'LED Smart Bulbs',
              price: '$12.99',
              description: 'Energy-efficient lighting',
              category: 'Home',
            },
            {
              id: 6,
              title: 'Recycled Notebook',
              price: '$8.99',
              description: 'Eco-friendly stationery',
              category: 'Office',
            },
          ].map((product) => (
            <AnimatedCard key={product.id} className="border border-eco-gray-200 shadow-sm hover:shadow-lg">
              <div className="aspect-square w-full bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                <Leaf className="w-16 h-16 text-eco-green" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold text-eco-gray-800">
                    {product.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-eco-green bg-opacity-10 text-eco-green text-xs">
                    {product.category}
                  </Badge>
                </div>
                <p className="text-eco-gray-600 text-sm">{product.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-eco-green">{product.price}</span>
                  <Button className="bg-eco-green hover:bg-eco-green-dark text-white px-4 py-2">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Products page layout with grid of eco-friendly product cards.',
      },
    },
  },
};
