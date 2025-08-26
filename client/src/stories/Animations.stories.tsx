import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedButton } from '@/shared/animations/components/AnimatedButton';
import { AnimatedCard } from '@/shared/animations/components/AnimatedCard';
import { BounceAnimation } from '@/shared/animations/components/BounceAnimation';
import { FlipCard } from '@/shared/animations/components/FlipCard';
import { CelebrationEffect } from '@/shared/animations/components/CelebrationEffect';
import { AnimatedInput } from '@/shared/animations/components/AnimatedInput';
import { StaggeredGrid } from '@/shared/animations/components/StaggeredGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Heart, Star, Gift, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Demo component that showcases all animations
const AnimationShowcase = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleBounce = () => {
    setLikeCount(prev => prev + 1);
    setShouldBounce(true);
    setTimeout(() => setShouldBounce(false), 300);
  };

  const sampleCards = [
    { id: 1, title: 'Eco Tip 1', content: 'Use reusable bags' },
    { id: 2, title: 'Eco Tip 2', content: 'Save water' },
    { id: 3, title: 'Eco Tip 3', content: 'Reduce plastic' },
    { id: 4, title: 'Eco Tip 4', content: 'Plant trees' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Animated Buttons */}
      <section>
        <h3 className="text-xl font-bold text-eco-gray-800 mb-4">Animated Buttons</h3>
        <div className="flex gap-4 flex-wrap">
          <AnimatedButton
            variant="eco"
            className="bg-eco-green text-white hover:bg-eco-green-dark px-6 py-3 rounded-lg font-medium"
          >
            Eco Button
          </AnimatedButton>
          <AnimatedButton
            variant="glow"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Glow Effect
          </AnimatedButton>
          <AnimatedButton
            variant="default"
            className="border border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-6 py-3 rounded-lg font-medium"
          >
            Scale Effect
          </AnimatedButton>
        </div>
      </section>

      {/* Bounce Animation */}
      <section>
        <h3 className="text-xl font-bold text-eco-gray-800 mb-4">Bounce Animation</h3>
        <div className="flex items-center gap-4">
          <BounceAnimation trigger={shouldBounce}>
            <button
              onClick={handleBounce}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <Heart className="w-4 h-4" />
              Like ({likeCount})
            </button>
          </BounceAnimation>
          <p className="text-sm text-gray-600">Click the like button to see bounce effect!</p>
        </div>
      </section>

      {/* Flip Card */}
      <section>
        <h3 className="text-xl font-bold text-eco-gray-800 mb-4">3D Flip Card</h3>
        <div className="max-w-sm">
          <FlipCard
            frontContent={
              <div className="h-48 w-full rounded-lg bg-gradient-to-br from-green-500 to-blue-500 p-6 text-white shadow-lg flex flex-col justify-center items-center">
                <Star className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold">Achievement</h3>
                <p className="text-sm opacity-90">Click to flip!</p>
              </div>
            }
            backContent={
              <Card className="h-48 w-full">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-semibold mb-2">Details</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    This is the back of the card with detailed information about the achievement.
                  </p>
                  <Button size="sm">Learn More</Button>
                </CardContent>
              </Card>
            }
          />
        </div>
      </section>

      {/* Animated Input */}
      <section>
        <h3 className="text-xl font-bold text-eco-gray-800 mb-4">Animated Input</h3>
        <div className="max-w-md">
          <AnimatedInput
            className="w-full"
            isFocused={false}
            hasError={false}
          >
            <input
              placeholder="Type something eco-friendly..."
              className="w-full border border-eco-gray-300 focus:border-eco-green rounded-lg px-3 py-2"
            />
          </AnimatedInput>
        </div>
      </section>

      {/* Celebration Effect */}
      <section>
        <h3 className="text-xl font-bold text-eco-gray-800 mb-4">Celebration Effects</h3>
        <div className="flex gap-4">
          <Button
            onClick={triggerCelebration}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            <Gift className="w-4 h-4 mr-2" />
            Trigger Celebration
          </Button>
        </div>
        <CelebrationEffect 
          trigger={showCelebration} 
          type="leaves" 
          duration={3000}
        />
      </section>

      {/* Staggered Grid */}
      <section>
        <h3 className="text-xl font-bold text-eco-gray-800 mb-4">Staggered Grid Animation</h3>
        <StaggeredGrid items={sampleCards} className="grid grid-cols-2 gap-4">
          {(item: { id: number; title: string; content: string }) => (
            <AnimatedCard key={item.id} className="border border-eco-gray-200 shadow-sm hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-eco-gray-800">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-eco-gray-600">{item.content}</p>
              </CardContent>
            </AnimatedCard>
          )}
        </StaggeredGrid>
      </section>
    </div>
  );
};

const meta: Meta<typeof AnimationShowcase> = {
  title: 'EcoBingle/Animations',
  component: AnimationShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of all animation components used in the EcoBingle app. Includes buttons, cards, inputs, celebrations, and layout animations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllAnimations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive showcase of all animation components with their unique effects and behaviors.',
      },
    },
  },
};

export const AnimatedButtonShowcase: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-eco-gray-800">Animated Buttons</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Eco Variant</h3>
          <div className="flex gap-4 flex-wrap">
            <AnimatedButton
              variant="eco"
              className="bg-eco-green text-white hover:bg-eco-green-dark px-6 py-3 rounded-lg"
            >
              Primary Action
            </AnimatedButton>
            <AnimatedButton
              variant="eco"
              className="border border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-6 py-3 rounded-lg"
            >
              Secondary Action
            </AnimatedButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Glow Variant</h3>
          <div className="flex gap-4 flex-wrap">
            <AnimatedButton
              variant="glow"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Special Action
            </AnimatedButton>
            <AnimatedButton
              variant="glow"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg"
            >
              Achievement
            </AnimatedButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Default Variant</h3>
          <div className="flex gap-4 flex-wrap">
            <AnimatedButton
              variant="default"
              className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-6 py-3 rounded-lg"
            >
              Neutral Action
            </AnimatedButton>
            <AnimatedButton
              variant="default"
              className="bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-lg"
            >
              Delete Action
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of animated buttons with different variants and use cases.',
      },
    },
  },
};

export const CardAnimations: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-eco-gray-800">Card Animations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedCard className="border border-eco-gray-200 shadow-sm hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-eco-gray-800">Animated Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-eco-gray-600 text-sm">
              This card has hover animations and smooth transitions.
            </p>
          </CardContent>
        </AnimatedCard>

        <FlipCard
          frontContent={
            <div className="h-32 w-full rounded-lg bg-gradient-to-br from-eco-green to-green-400 p-4 text-white flex flex-col justify-center items-center">
              <Sparkles className="w-8 h-8 mb-2" />
              <span className="font-bold">Flip Me!</span>
            </div>
          }
          backContent={
            <div className="h-32 w-full rounded-lg bg-white border border-gray-200 p-4 flex flex-col justify-center items-center">
              <span className="text-gray-800 text-sm text-center">
                This is the back side with detailed information.
              </span>
            </div>
          }
        />

        <BounceAnimation trigger={false}>
          <Card className="border border-eco-gray-200 shadow-sm cursor-pointer">
            <CardHeader>
              <CardTitle className="text-eco-gray-800 text-sm">Bounce Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-eco-gray-600 text-xs">
                This card bounces when triggered.
              </p>
            </CardContent>
          </Card>
        </BounceAnimation>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different types of card animations including hover effects, flip animations, and bounce effects.',
      },
    },
  },
};
