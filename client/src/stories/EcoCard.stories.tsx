import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { AnimatedCard } from '@/shared/animations/components/AnimatedCard';
import { AnimatedButton } from '@/shared/animations/components/AnimatedButton';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/avatar';
import { Heart, MessageCircle, Share2, Leaf, Recycle, Wind } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'EcoBingle/EcoCard',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eco-themed card components for displaying environmental content, community posts, and product information.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EcoPostCard: Story = {
  render: () => (
    <AnimatedCard className="border border-eco-gray-200 shadow-md hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" alt="@ecowarrior" />
            <AvatarFallback className="bg-eco-green text-white">EW</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-semibold text-eco-gray-800">
              EcoWarrior
            </CardTitle>
            <CardDescription className="text-xs text-eco-gray-500">
              2 hours ago
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-eco-gray-700 text-sm leading-relaxed">
          Just completed my first week of zero-waste living! 🌱 It's amazing how much plastic we use without thinking. Sharing some tips that helped me reduce waste by 80%.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-eco-green bg-opacity-10 text-eco-green text-xs">
            <Leaf className="w-3 h-3 mr-1" />
            Zero Waste
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
            Sustainability
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-eco-gray-500 hover:text-red-500 transition-colors text-sm">
              <Heart className="w-4 h-4 mr-1" />
              24
            </button>
            <button className="flex items-center text-eco-gray-500 hover:text-eco-green transition-colors text-sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              8
            </button>
            <button className="flex items-center text-eco-gray-500 hover:text-blue-500 transition-colors text-sm">
              <Share2 className="w-4 h-4 mr-1" />
              3
            </button>
          </div>
        </div>
      </CardFooter>
    </AnimatedCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card for displaying community posts with user information, content, tags, and interaction buttons.',
      },
    },
  },
};

export const EcoProductCard: Story = {
  render: () => (
    <AnimatedCard className="border border-eco-gray-200 shadow-md hover:shadow-lg">
      <div className="aspect-square w-full bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg flex items-center justify-center">
        <Recycle className="w-16 h-16 text-eco-green" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-eco-gray-800">
          Bamboo Water Bottle
        </CardTitle>
        <CardDescription className="text-eco-gray-600">
          Sustainable hydration for eco-conscious individuals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-eco-green">$24.99</span>
            <Badge className="bg-eco-green text-white">Eco-Friendly</Badge>
          </div>
          <div className="flex items-center text-sm text-eco-gray-600">
            <Wind className="w-4 h-4 mr-2 text-eco-green" />
            Carbon neutral shipping
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AnimatedButton
          variant="eco"
          className="w-full bg-eco-green text-white hover:bg-eco-green-dark py-2 rounded-lg font-medium"
        >
          Add to Cart
        </AnimatedButton>
      </CardFooter>
    </AnimatedCard>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product card for eco-friendly products with pricing, features, and call-to-action.',
      },
    },
  },
};

export const EcoTipCard: Story = {
  render: () => (
    <Card className="border border-eco-gray-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-eco-green flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-eco-gray-800">
              Daily Eco Tip
            </CardTitle>
            <CardDescription className="text-eco-gray-600">
              Small changes, big impact
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-eco-gray-700 leading-relaxed">
          Replace single-use plastic bags with reusable cloth bags. One reusable bag can eliminate the use of 1,000+ plastic bags over its lifetime.
        </p>
      </CardContent>
      <CardFooter>
        <Badge variant="outline" className="border-eco-green text-eco-green">
          💡 Impact: High
        </Badge>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Educational card displaying eco-friendly tips and advice.',
      },
    },
  },
};

export const EcoStatsCard: Story = {
  render: () => (
    <Card className="border border-eco-gray-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-eco-gray-800">
          Your Eco Impact
        </CardTitle>
        <CardDescription>
          This month's environmental contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-eco-green">15kg</div>
            <div className="text-sm text-eco-gray-600">CO₂ Saved</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-600">89L</div>
            <div className="text-sm text-eco-gray-600">Water Conserved</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-eco-gray-600">Eco Actions</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-yellow-600">5★</div>
            <div className="text-sm text-eco-gray-600">Eco Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Statistics card showing user\'s environmental impact and achievements.',
      },
    },
  },
};

export const SimpleEcoCard: Story = {
  args: {
    className: "border border-eco-gray-200 p-6",
    children: (
      <>
        <CardTitle className="text-eco-gray-800 mb-2">Simple Eco Card</CardTitle>
        <CardDescription className="text-eco-gray-600">
          A basic card with eco-themed styling for any content.
        </CardDescription>
      </>
    ),
  },
};
