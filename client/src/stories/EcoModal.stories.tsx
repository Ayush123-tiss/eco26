import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { AnimatedButton } from '@/shared/animations/components/AnimatedButton';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';
import { Leaf, X, TreePine, Recycle, Sun } from 'lucide-react';
import { useState } from 'react';

// Create a reusable EcoModal component for Storybook
const EcoModal = ({ 
  trigger, 
  title, 
  description, 
  children, 
  footerActions,
  variant = 'default' 
}: {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'eco';
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'eco':
        return 'border-eco-green bg-eco-green bg-opacity-5';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${getVariantStyles()}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-eco-gray-800">
            {variant === 'eco' && <Leaf className="w-5 h-5 text-eco-green" />}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-eco-gray-600">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-4">
          {children}
        </div>
        {footerActions && (
          <DialogFooter>
            {footerActions}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

const meta: Meta<typeof EcoModal> = {
  title: 'EcoBingle/EcoModal',
  component: EcoModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eco-themed modal dialogs for various interactions including posts, actions, and confirmations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'eco'],
      description: 'Modal styling variant',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateEcoPost: Story = {
  args: {
    variant: 'eco',
    title: 'Share Your Eco Journey',
    description: 'Tell the community about your sustainable practices and inspire others!',
    trigger: (
      <AnimatedButton
        variant="eco"
        className="bg-eco-green text-white hover:bg-eco-green-dark px-6 py-3 rounded-lg font-medium"
      >
        <Leaf className="w-4 h-4 mr-2" />
        Create Post
      </AnimatedButton>
    ),
    children: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="post-title" className="text-eco-gray-700">
            What did you accomplish?
          </Label>
          <Input
            id="post-title"
            placeholder="e.g., Reduced plastic waste by 50%"
            className="mt-1 border-eco-gray-300 focus:border-eco-green"
          />
        </div>
        <div>
          <Label htmlFor="post-content" className="text-eco-gray-700">
            Share your story
          </Label>
          <Textarea
            id="post-content"
            placeholder="Tell us about your journey, challenges, and tips for others..."
            className="mt-1 min-h-[100px] border-eco-gray-300 focus:border-eco-green"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-eco-green bg-opacity-10 text-eco-green cursor-pointer">
            <TreePine className="w-3 h-3 mr-1" />
            Zero Waste
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 cursor-pointer">
            <Sun className="w-3 h-3 mr-1" />
            Solar Energy
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700 cursor-pointer">
            <Recycle className="w-3 h-3 mr-1" />
            Recycling
          </Badge>
        </div>
      </div>
    ),
    footerActions: (
      <>
        <Button variant="outline" className="border-eco-gray-300 text-eco-gray-700">
          Save Draft
        </Button>
        <AnimatedButton
          variant="eco"
          className="bg-eco-green text-white hover:bg-eco-green-dark px-6 py-2 rounded-lg"
        >
          Share Post
        </AnimatedButton>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal for creating new eco-themed community posts with categories and rich content.',
      },
    },
  },
};

export const EcoActionConfirmation: Story = {
  args: {
    variant: 'success',
    title: 'Complete Eco Action',
    description: 'Confirm that you\'ve completed this sustainable action to earn points!',
    trigger: (
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        Complete Action
      </Button>
    ),
    children: (
      <div className="space-y-4">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <TreePine className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-eco-gray-800 mb-2">
            Plant a Tree
          </h3>
          <p className="text-eco-gray-600 text-sm">
            You're about to earn <strong>50 EcoPoints</strong> for planting a tree! 
            This action helps offset approximately 22kg of CO₂ annually.
          </p>
        </div>
        <div className="bg-eco-green bg-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-eco-gray-700">EcoPoints earned:</span>
            <span className="font-bold text-eco-green">+50 points</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-eco-gray-700">CO₂ offset/year:</span>
            <span className="font-bold text-green-600">22kg</span>
          </div>
        </div>
      </div>
    ),
    footerActions: (
      <>
        <Button variant="outline" className="border-gray-300 text-gray-700">
          Cancel
        </Button>
        <AnimatedButton
          variant="eco"
          className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg"
        >
          Confirm Action
        </AnimatedButton>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmation modal for completing eco-friendly actions with points and impact information.',
      },
    },
  },
};

export const EcoWarning: Story = {
  args: {
    variant: 'warning',
    title: 'Environmental Impact Warning',
    description: 'This action may have negative environmental consequences.',
    trigger: (
      <Button variant="destructive">
        ⚠️ Risky Action
      </Button>
    ),
    children: (
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <X className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Consider the Impact</h3>
            <p className="text-sm text-gray-600 mb-3">
              This action might increase your carbon footprint. Here are some eco-friendly alternatives:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <Leaf className="w-3 h-3 text-green-500 mr-2" />
                Use public transportation instead
              </li>
              <li className="flex items-center">
                <Leaf className="w-3 h-3 text-green-500 mr-2" />
                Choose local alternatives
              </li>
              <li className="flex items-center">
                <Leaf className="w-3 h-3 text-green-500 mr-2" />
                Offset with tree planting
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    footerActions: (
      <>
        <Button variant="outline" className="border-green-300 text-green-700">
          Choose Alternative
        </Button>
        <Button variant="destructive">
          Continue Anyway
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning modal that educates users about environmental impact and suggests alternatives.',
      },
    },
  },
};

export const SimpleEcoModal: Story = {
  args: {
    variant: 'default',
    title: 'Simple Modal',
    description: 'A basic modal with eco-themed styling',
    trigger: (
      <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
        Open Modal
      </Button>
    ),
    children: (
      <p className="text-eco-gray-700">
        This is a simple modal with eco-themed colors and styling. Perfect for basic confirmations or information display.
      </p>
    ),
    footerActions: (
      <Button className="w-full bg-eco-green text-white hover:bg-eco-green-dark">
        Got it!
      </Button>
    ),
  },
};
