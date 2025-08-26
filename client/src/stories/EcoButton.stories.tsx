import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedButton } from '@/shared/animations/components/AnimatedButton';
import { Leaf, Heart, Trash2, Share2 } from 'lucide-react';

const meta: Meta<typeof AnimatedButton> = {
  title: 'EcoBingle/EcoButton',
  component: AnimatedButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated button component with eco-themed styling and smooth hover effects. Supports scale animations and glow effects for primary actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'eco', 'glow'],
      description: 'Button animation variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base eco button styles
const baseEcoStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green-500";

export const EcoPrimary: Story = {
  args: {
    variant: 'eco',
    children: 'Join EcoBingle',
    className: `${baseEcoStyles} bg-eco-green text-white hover:bg-eco-green-dark shadow-md`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary eco button with green theme and scale + glow animation on hover.',
      },
    },
  },
};

export const EcoSecondary: Story = {
  args: {
    variant: 'default',
    children: 'Learn More',
    className: `${baseEcoStyles} border border-eco-green text-eco-green hover:bg-eco-green hover:text-white`,
  },
};

export const EcoGlow: Story = {
  args: {
    variant: 'glow',
    children: 'Save Planet',
    className: `${baseEcoStyles} bg-gradient-to-r from-green-600 to-blue-600 text-white`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Special glow effect button for highlighting important eco actions.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'eco',
    children: (
      <>
        <Leaf className="w-4 h-4 mr-2" />
        Plant a Tree
      </>
    ),
    className: `${baseEcoStyles} bg-eco-green text-white hover:bg-eco-green-dark shadow-md`,
  },
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <AnimatedButton
        variant="eco"
        className={`${baseEcoStyles} bg-red-500 text-white hover:bg-red-600`}
      >
        <Heart className="w-4 h-4 mr-2" />
        Like
      </AnimatedButton>
      <AnimatedButton
        variant="default"
        className={`${baseEcoStyles} bg-blue-500 text-white hover:bg-blue-600`}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </AnimatedButton>
      <AnimatedButton
        variant="default"
        className={`${baseEcoStyles} bg-gray-500 text-white hover:bg-gray-600`}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Remove
      </AnimatedButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of action buttons commonly used in the EcoBingle interface.',
      },
    },
  },
};

export const ButtonSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <AnimatedButton
        variant="eco"
        className={`px-3 py-1 text-sm rounded bg-eco-green text-white hover:bg-eco-green-dark`}
      >
        Small
      </AnimatedButton>
      <AnimatedButton
        variant="eco"
        className={`${baseEcoStyles} bg-eco-green text-white hover:bg-eco-green-dark`}
      >
        Medium
      </AnimatedButton>
      <AnimatedButton
        variant="eco"
        className={`px-8 py-4 text-lg rounded-lg font-medium bg-eco-green text-white hover:bg-eco-green-dark transition-all duration-200`}
      >
        Large
      </AnimatedButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes for various use cases.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    variant: 'eco',
    children: 'Disabled Button',
    disabled: true,
    className: `${baseEcoStyles} bg-gray-300 text-gray-500 cursor-not-allowed`,
  },
};
