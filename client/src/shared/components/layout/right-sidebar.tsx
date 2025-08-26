import { Button } from '@/shared/components/ui/button';
import { Sprout, Zap, Recycle, Battery, Leaf } from 'lucide-react';
import type { Community } from '@shared/schema';

interface RightSidebarProps {
  communities: Community[];
}

export default function RightSidebar({ communities }: RightSidebarProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'seedling':
        return <Sprout className='text-xs text-white' />;
      case 'solar-panel':
        return <Zap className='text-xs text-white' />;
      case 'recycle':
        return <Recycle className='text-xs text-white' />;
      case 'car-battery':
        return <Battery className='text-xs text-white' />;
      case 'leaf':
        return <Leaf className='text-xs text-white' />;
      default:
        return <Sprout className='text-xs text-white' />;
    }
  };

  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <aside className='w-80 space-y-6'>
      {/* Popular Communities */}
      <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
        <h3 className='mb-4 font-semibold text-eco-gray-800'>
          Popular Communities
        </h3>
        <div className='space-y-3'>
          {communities.slice(0, 5).map(community => (
            <div
              key={community.id}
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-2'>
                <div
                  className='flex h-8 w-8 items-center justify-center rounded-full'
                  style={{ backgroundColor: community.color || '#10B981' }}
                >
                  {getIcon(community.icon || 'seedling')}
                </div>
                <div>
                  <p
                    className='text-sm font-medium text-eco-gray-800'
                    data-testid={`text-community-${community.name}`}
                  >
                    {community.name}
                  </p>
                  <p
                    className='text-xs text-eco-gray-500'
                    data-testid={`text-members-${community.name}`}
                  >
                    {formatMemberCount(community.memberCount || 0)} members
                  </p>
                </div>
              </div>
              <Button
                size='sm'
                className='rounded-full bg-eco-green px-3 py-1 text-xs text-white transition-colors hover:bg-eco-green-dark'
                data-testid={`button-join-${community.name}`}
              >
                Join
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant='ghost'
          className='mt-4 w-full text-sm font-medium text-eco-green hover:text-eco-green-dark'
          data-testid='button-view-all-communities'
        >
          View All Communities
        </Button>
      </div>

      {/* Trending Topics */}
      <div className='rounded-lg border border-eco-gray-200 bg-white p-4'>
        <h3 className='mb-4 font-semibold text-eco-gray-800'>
          Trending Topics
        </h3>
        <div className='space-y-2'>
          <a
            href='#'
            className='block text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
            data-testid='link-climate-action'
          >
            #ClimateAction
          </a>
          <a
            href='#'
            className='block text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
            data-testid='link-solar-power'
          >
            #SolarPower
          </a>
          <a
            href='#'
            className='block text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
            data-testid='link-zero-waste'
          >
            #ZeroWaste
          </a>
          <a
            href='#'
            className='block text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
            data-testid='link-electric-vehicles'
          >
            #ElectricVehicles
          </a>
          <a
            href='#'
            className='block text-sm text-eco-gray-600 transition-colors hover:text-eco-green'
            data-testid='link-urban-gardening'
          >
            #UrbanGardening
          </a>
        </div>
      </div>

      {/* Eco Tips */}
      <div className='rounded-lg bg-gradient-to-br from-eco-green to-eco-green-light p-4 text-white'>
        <h3 className='mb-2 font-semibold'>Daily Eco Tip</h3>
        <p className='mb-3 text-sm text-green-50'>
          Replace disposable water bottles with a reusable one. You'll save
          money and reduce plastic waste!
        </p>
        <Button
          size='sm'
          variant='ghost'
          className='rounded-full bg-white bg-opacity-20 px-3 py-1 text-xs text-white transition-colors hover:bg-opacity-30'
          data-testid='button-share-tip'
        >
          Share Tip
        </Button>
      </div>
    </aside>
  );
}
