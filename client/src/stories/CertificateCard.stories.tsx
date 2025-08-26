import type { Meta, StoryObj } from '@storybook/react';
import CertificateCard from '@/shared/components/certificates/CertificateCard';

const meta: Meta<typeof CertificateCard> = {
  title: 'EcoBingle/CertificateCard',
  component: CertificateCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive 3D flip certificate cards with celebration effects. Used to showcase user achievements and eco-certifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Certificate title',
    },
    description: {
      control: 'text',
      description: 'Certificate description',
    },
    level: {
      control: { type: 'select' },
      options: ['bronze', 'silver', 'gold', 'platinum'],
      description: 'Certificate level determines styling and colors',
    },
    earnedDate: {
      control: 'text',
      description: 'Date when certificate was earned',
    },
    onCelebrate: {
      action: 'celebrated',
      description: 'Callback when celebration is triggered',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BronzeCertificate: Story = {
  args: {
    title: 'Eco Beginner',
    description: 'Completed your first 5 eco-friendly actions. Every journey starts with a single step!',
    level: 'bronze',
    issueDate: '2024-01-15',
    earned: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bronze level certificate for beginners, featuring warm bronze gradients and encouraging messaging.',
      },
    },
  },
};

export const SilverCertificate: Story = {
  args: {
    title: 'Sustainability Champion',
    description: 'Achieved 30 days of consistent eco-friendly practices. Your dedication is making a difference!',
    level: 'silver',
    issueDate: '2024-02-10',
    earned: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Silver level certificate for intermediate eco-warriors with silver metallic styling.',
      },
    },
  },
};

export const GoldCertificate: Story = {
  args: {
    title: 'Environmental Leader',
    description: 'Led 3 community initiatives and inspired 50+ people to adopt sustainable practices. Outstanding leadership!',
    level: 'gold',
    issueDate: '2024-03-05',
    earned: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Gold level certificate for environmental leaders with premium gold gradients.',
      },
    },
  },
};

export const PlatinumCertificate: Story = {
  args: {
    title: 'Planet Guardian',
    description: 'Achieved carbon neutrality and mentored 100+ eco-warriors. You are a true guardian of our planet!',
    level: 'platinum',
    issueDate: '2024-04-01',
    earned: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Platinum level certificate for the highest eco-achievements with exclusive platinum styling.',
      },
    },
  },
};

export const CertificateCollection: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <CertificateCard
        title="First Steps"
        description="Started your eco journey"
        level="bronze"
        issueDate="2024-01-01"
        earned={true}
      />
      <CertificateCard
        title="Waste Warrior"
        description="Reduced waste by 50%"
        level="silver"
        issueDate="2024-01-15"
        earned={true}
      />
      <CertificateCard
        title="Carbon Cutter"
        description="Achieved carbon neutrality"
        level="gold"
        issueDate="2024-02-01"
        earned={true}
      />
      <CertificateCard
        title="Eco Master"
        description="Ultimate sustainability achievement"
        level="platinum"
        issueDate="2024-03-01"
        earned={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of certificates showing the progression through different achievement levels.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};

export const InteractiveDemonstration: Story = {
  render: () => (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-semibold text-eco-gray-800 mb-4">
        🎯 Click any certificate to see the 3D flip effect and celebration!
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CertificateCard
          title="Water Saver"
          description="Conserved 1000L of water through smart practices"
          level="silver"
          issueDate="2024-01-20"
          earned={true}
        />
        <CertificateCard
          title="Solar Pioneer"
          description="Powered your home with 100% renewable energy"
          level="gold"
          issueDate="2024-02-15"
          earned={true}
        />
      </div>
      <p className="text-sm text-eco-gray-600 mt-4">
        Each certificate features unique animations, level-appropriate styling, and celebration effects.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration showing the flip animation and celebration effects.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};
