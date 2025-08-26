import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
  Menu,
  Plus,
  Sprout,
  Zap,
  Globe,
  Recycle,
  ShoppingCart,
  Star,
  Book,
  GraduationCap,
  Award,
  Trophy,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface LeftSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onCreatePost: () => void;
}

export default function LeftSidebar({
  collapsed,
  onToggle,
  onCreatePost,
}: LeftSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    ecoTopics: true,
    joinedCommunities: true,
    marketplace: false,
    learning: false,
    certificate: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sidebarContent = (
    <aside 
      className='sidebar-transition w-80 space-y-6'
      role="complementary"
      aria-label="Community navigation and actions"
    >
      {/* Sidebar Toggle */}
      <Button
        onClick={onToggle}
        variant='outline'
        size='icon'
        className='mb-4 border-eco-gray-200 bg-white hover:bg-eco-gray-50 lg:hidden'
        data-testid='button-sidebar-toggle'
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
      >
        <Menu className='h-4 w-4 text-eco-gray-600' aria-hidden="true" />
      </Button>

      {/* Create Post Button */}
      <Button
        onClick={onCreatePost}
        className='w-full rounded-lg bg-eco-green px-4 py-3 font-medium text-white transition-colors hover:bg-eco-green-dark focus-visible:ring-2 focus-visible:ring-green-500'
        data-testid='button-create-post'
        aria-label="Create a new community post"
      >
        <Plus className='mr-2 h-4 w-4' aria-hidden="true" />
        Create Community Post
      </Button>

      {/* Eco Topics */}
      <nav aria-label="Eco topics navigation">
        <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
          <Collapsible
            open={expandedSections.ecoTopics}
            onOpenChange={() => toggleSection('ecoTopics')}
          >
            <CollapsibleTrigger
              className='mb-3 flex w-full cursor-pointer items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded-md p-1'
              data-testid='trigger-eco-topics'
              aria-expanded={expandedSections.ecoTopics}
              aria-controls="eco-topics-content"
            >
              <h3 className='font-semibold text-eco-gray-800'>ECO TOPICS</h3>
              {expandedSections.ecoTopics ? (
                <ChevronDown 
                  className='h-4 w-4 text-eco-gray-500 transition-transform' 
                  aria-hidden="true"
                />
              ) : (
                <ChevronRight 
                  className='h-4 w-4 text-eco-gray-500 transition-transform' 
                  aria-hidden="true"
                />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent 
              id="eco-topics-content"
              className='space-y-2'
            >
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-sustainability'
            >
              <Sprout className='mr-2 h-4 w-4 text-eco-green' />
              Sustainability
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-green-tech'
            >
              <Zap className='mr-2 h-4 w-4 text-eco-green' />
              Green Tech
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-climate-action'
            >
              <Globe className='mr-2 h-4 w-4 text-eco-green' />
              Climate Action
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-waste-reduction'
            >
              <Recycle className='mr-2 h-4 w-4 text-eco-green' />
              Waste Reduction
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>
      </nav>

      {/* Joined Communities */}
      <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
        <Collapsible
          open={expandedSections.joinedCommunities}
          onOpenChange={() => toggleSection('joinedCommunities')}
        >
          <CollapsibleTrigger
            className='mb-3 flex w-full cursor-pointer items-center justify-between'
            data-testid='trigger-joined-communities'
          >
            <h3 className='font-semibold text-eco-gray-800'>
              JOINED COMMUNITIES
            </h3>
            {expandedSections.joinedCommunities ? (
              <ChevronDown className='h-4 w-4 text-eco-gray-500 transition-transform' />
            ) : (
              <ChevronRight className='h-4 w-4 text-eco-gray-500 transition-transform' />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className='space-y-2'>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-zerowaste'
            >
              <div className='mr-2 h-4 w-4 rounded-full bg-eco-green'></div>
              r/ZeroWaste
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-solarpower'
            >
              <div className='mr-2 h-4 w-4 rounded-full bg-eco-green-light'></div>
              r/SolarPower
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-urbangardening'
            >
              <div className='mr-2 h-4 w-4 rounded-full bg-green-400'></div>
              r/UrbanGardening
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Green Marketplace */}
      <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
        <Collapsible
          open={expandedSections.marketplace}
          onOpenChange={() => toggleSection('marketplace')}
        >
          <CollapsibleTrigger
            className='mb-3 flex w-full cursor-pointer items-center justify-between'
            data-testid='trigger-marketplace'
          >
            <h3 className='font-semibold text-eco-gray-800'>
              GREEN MARKETPLACE
            </h3>
            {expandedSections.marketplace ? (
              <ChevronDown className='h-4 w-4 text-eco-gray-500 transition-transform' />
            ) : (
              <ChevronRight className='h-4 w-4 text-eco-gray-500 transition-transform' />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className='space-y-2'>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-eco-products'
            >
              <ShoppingCart className='mr-2 h-4 w-4 text-eco-green' />
              Eco Products
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-recommendations'
            >
              <Star className='mr-2 h-4 w-4 text-eco-green' />
              Recommendations
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Eco Learning */}
      <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
        <Collapsible
          open={expandedSections.learning}
          onOpenChange={() => toggleSection('learning')}
        >
          <CollapsibleTrigger
            className='mb-3 flex w-full cursor-pointer items-center justify-between'
            data-testid='trigger-learning'
          >
            <h3 className='font-semibold text-eco-gray-800'>ECO LEARNING</h3>
            {expandedSections.learning ? (
              <ChevronDown className='h-4 w-4 text-eco-gray-500 transition-transform' />
            ) : (
              <ChevronRight className='h-4 w-4 text-eco-gray-500 transition-transform' />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className='space-y-2'>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-guides'
            >
              <Book className='mr-2 h-4 w-4 text-eco-green' />
              How-to Guides
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-courses'
            >
              <GraduationCap className='mr-2 h-4 w-4 text-eco-green' />
              Sustainability Courses
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Get Certificate */}
      <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
        <Collapsible
          open={expandedSections.certificate}
          onOpenChange={() => toggleSection('certificate')}
        >
          <CollapsibleTrigger
            className='mb-3 flex w-full cursor-pointer items-center justify-between'
            data-testid='trigger-certificate'
          >
            <h3 className='font-semibold text-eco-gray-800'>GET CERTIFICATE</h3>
            {expandedSections.certificate ? (
              <ChevronDown className='h-4 w-4 text-eco-gray-500 transition-transform' />
            ) : (
              <ChevronRight className='h-4 w-4 text-eco-gray-500 transition-transform' />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className='space-y-2'>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-certification'
            >
              <Award className='mr-2 h-4 w-4 text-eco-green' />
              Eco Certification
            </a>
            <a
              href='#'
              className='flex items-center py-1 text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
              data-testid='link-badges'
            >
              <Trophy className='mr-2 h-4 w-4 text-eco-green' />
              Achievement Badges
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );

  return collapsed ? null : sidebarContent;
}
