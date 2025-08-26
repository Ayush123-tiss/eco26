import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/shared/components/layout/header';
import LeftSidebar from '@/shared/components/layout/left-sidebar';
import RightSidebar from '@/shared/components/layout/right-sidebar';
import ThreadCard from '@/features/community/components/thread-card';
import CreatePostDialog from '@/features/community/components/create-post-dialog';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Grid3X3, List, Plus, Menu, Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import type { Thread, Community } from '@shared/schema';
import { StaggeredGrid, AnimatedButton } from '@/shared/animations';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'people' | 'products' | 'demo' | 'accessibility'>('people');
  const [activeSection, setActiveSection] = useState<
    'community' | 'blog' | 'news'
  >('community');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState('best');
  const [timeFilter, setTimeFilter] = useState('today');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const {
    data: threads = [],
    isLoading,
    refetch,
  } = useQuery<Thread[]>({
    queryKey: ['/api/threads', activeSection],
    queryFn: async () => {
      const response = await fetch(`/api/threads?section=${activeSection}`);
      if (!response.ok) throw new Error('Failed to fetch threads');
      return response.json();
    },
  });

  const { data: communities = [] } = useQuery<Community[]>({
    queryKey: ['/api/communities'],
    queryFn: async () => {
      const response = await fetch('/api/communities');
      if (!response.ok) throw new Error('Failed to fetch communities');
      return response.json();
    },
  });

  return (
    <div className='min-h-screen bg-eco-gray-50 text-eco-gray-700'>
      {/* Header */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Secondary Navigation */}
      <div className='border-b border-eco-gray-100 bg-white'>
        <div className='w-full px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setActiveSection('community')}
                className={`rounded-lg px-6 py-2 font-medium transition-all duration-200 ${
                  activeSection === 'community'
                    ? 'border-black bg-white text-eco-blue hover:bg-blue-50'
                    : 'border-black bg-white text-eco-gray-600 hover:bg-eco-gray-50'
                }`}
                data-testid='button-community'
              >
                Community
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setActiveSection('blog')}
                className={`rounded-lg px-6 py-2 font-medium transition-all duration-200 ${
                  activeSection === 'blog'
                    ? 'border-black bg-white text-eco-blue hover:bg-blue-50'
                    : 'border-black bg-white text-eco-gray-600 hover:bg-eco-gray-50'
                }`}
                data-testid='button-blog'
              >
                Blog
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setActiveSection('news')}
                className={`rounded-lg px-6 py-2 font-medium transition-all duration-200 ${
                  activeSection === 'news'
                    ? 'border-black bg-white text-eco-blue hover:bg-blue-50'
                    : 'border-black bg-white text-eco-gray-600 hover:bg-eco-gray-50'
                }`}
                data-testid='button-news'
              >
                News
              </Button>
            </div>

            {/* Center Search */}
            <div className='mx-8 max-w-2xl flex-1'>
              <div className='relative'>
                <Search 
                  className='text-eco-gray-400 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform' 
                  aria-hidden="true"
                />
                <Input
                  placeholder='Search EcoBingle for communities, posts, and more...'
                  className='w-full rounded-lg border-eco-gray-300 py-3 pl-10 pr-4 text-sm focus:border-eco-green focus:ring-eco-green'
                  data-testid='input-search'
                  aria-label="Search EcoBingle for communities, posts, and more"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className='flex items-center space-x-3'>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className='h-8 w-28'
                  data-testid='select-sort-top'
                  aria-label="Sort posts by"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='best'>Best</SelectItem>
                  <SelectItem value='new'>New</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => setShowCreatePost(true)}
                className='rounded-lg bg-eco-green px-6 py-2 font-medium text-white hover:bg-eco-green-dark focus-visible:ring-2 focus-visible:ring-green-500'
                data-testid='button-create-post-header'
                aria-label="Create a new community post"
              >
                <Plus className='mr-2 h-4 w-4' aria-hidden="true" />
                Create Community
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full px-4'>
        <div className='flex'>
          {/* Left Sidebar */}
          <div className='relative flex-shrink-0'>
            <LeftSidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              onCreatePost={() => setShowCreatePost(true)}
            />
            {/* Resize Handle */}
            {!sidebarCollapsed && (
              <div className='group absolute bottom-0 right-0 top-0 w-1 cursor-col-resize bg-eco-gray-200 transition-colors hover:bg-eco-gray-300'>
                <div className='bg-eco-gray-400 absolute right-0 top-1/2 h-12 w-1 -translate-y-1/2 transform transition-colors group-hover:bg-eco-gray-500'></div>
              </div>
            )}
          </div>

          {/* Main Content - Expanded */}
                    {/* Main Content Area */}
          <main 
            id="main-content"
            className='flex-1 space-y-4 px-6'
            role="main"
            aria-label="Community posts and discussions"
          >
            {/* Thread List */}
            {isLoading ? (
              <div className='space-y-4'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='rounded-lg border border-eco-gray-200 bg-white p-6'
                  >
                    <div className='animate-pulse'>
                      <div className='mb-2 h-4 w-3/4 rounded bg-eco-gray-200'></div>
                      <div className='mb-4 h-3 w-1/2 rounded bg-eco-gray-200'></div>
                      <div className='h-3 w-full rounded bg-eco-gray-200'></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : threads.length === 0 ? (
              <div className='rounded-lg border border-eco-gray-200 bg-white p-12 text-center'>
                <h3 className='mb-2 text-lg font-semibold text-eco-gray-800'>
                  No posts yet
                </h3>
                <p className='mb-4 text-eco-gray-600'>
                  Be the first to share something with the community!
                </p>
                <Button
                  onClick={() => setShowCreatePost(true)}
                  className='bg-eco-green text-white hover:bg-eco-green-dark'
                  data-testid='button-create-first-post'
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Create Post
                </Button>
              </div>
            ) : (
              <StaggeredGrid className='space-y-4'>
                {threads.map(thread => (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    onUpdate={refetch}
                  />
                ))}
              </StaggeredGrid>
            )}

            {/* Load More Button */}
            {threads.length > 0 && (
              <div className='py-8 text-center'>
                <Button
                  className='bg-eco-green px-8 py-3 text-white hover:bg-eco-green-dark'
                  data-testid='button-load-more'
                >
                  Load More Posts
                </Button>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <div className='flex-shrink-0'>
            <RightSidebar communities={communities} />
          </div>
        </div>
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog
        open={showCreatePost}
        onOpenChange={setShowCreatePost}
        section={activeSection}
        onSuccess={() => {
          setShowCreatePost(false);
          refetch();
        }}
      />
    </div>
  );
}
