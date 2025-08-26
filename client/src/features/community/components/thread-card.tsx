import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share2,
  Bookmark,
  Award,
} from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';
import type { Thread } from '@shared/schema';
import { AnimatedCard, BounceAnimation } from '@/shared/animations';

interface ThreadCardProps {
  thread: Thread;
  onUpdate: () => void;
}

export default function ThreadCard({ thread, onUpdate }: ThreadCardProps) {
  const [userVote, setUserVote] = useState<number>(0); // -1, 0, 1
  const [voteAnimationTrigger, setVoteAnimationTrigger] = useState(false);
  const { toast } = useToast();

  const voteMutation = useMutation({
    mutationFn: async (voteType: number) => {
      const response = await fetch(`/api/threads/${thread.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType, userId: 'current-user' }),
      });
      if (!response.ok) throw new Error('Vote failed');
      return response.json();
    },
    onSuccess: () => {
      onUpdate();
      toast({
        title: 'Vote recorded',
        description: 'Your vote has been recorded successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Vote failed',
        description: 'Failed to record your vote. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleVote = (voteType: number) => {
    const newVote = userVote === voteType ? 0 : voteType;
    setUserVote(newVote);
    setVoteAnimationTrigger(true);
    setTimeout(() => setVoteAnimationTrigger(false), 400);
    voteMutation.mutate(newVote);
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'climate action':
        return 'bg-eco-green bg-opacity-10 text-eco-green';
      case 'urban gardening':
        return 'bg-green-100 text-green-700';
      case 'waste reduction':
        return 'bg-blue-100 text-blue-700';
      case 'green tech':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-eco-gray-100 text-eco-gray-700';
    }
  };

  return (
    <AnimatedCard
      className='thread-card rounded-lg border border-eco-gray-200 bg-white transition-all duration-200 hover:border-eco-green-light'
      data-testid={`thread-card-${thread.id}`}
      enableHover={true}
    >
      <div className='flex'>
        {/* Voting Section */}
        <div className='flex flex-col items-center border-r border-eco-gray-100 p-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleVote(1)}
            disabled={voteMutation.isPending}
            className={`vote-btn p-2 transition-all ${
              userVote === 1
                ? 'bg-eco-green bg-opacity-10 text-eco-green'
                : 'text-eco-gray-400 hover:bg-eco-green hover:bg-opacity-10 hover:text-eco-green'
            } rounded`}
            data-testid={`button-upvote-${thread.id}`}
          >
            <ChevronUp className='h-4 w-4' />
          </Button>
          <BounceAnimation trigger={voteAnimationTrigger}>
            <span
              className='my-1 font-medium text-eco-gray-700'
              data-testid={`text-vote-count-${thread.id}`}
            >
              {thread.voteCount || 0}
            </span>
          </BounceAnimation>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleVote(-1)}
            disabled={voteMutation.isPending}
            className={`vote-btn p-2 transition-all ${
              userVote === -1
                ? 'bg-red-50 text-red-500'
                : 'text-eco-gray-400 hover:bg-red-50 hover:text-red-500'
            } rounded`}
            data-testid={`button-downvote-${thread.id}`}
          >
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>

        {/* Content Section */}
        <div className='flex-1 p-4'>
          <div className='mb-2 flex items-center space-x-2'>
            <span className='text-xs text-eco-gray-500'>Posted by</span>
            <a
              href='#'
              className='text-xs font-medium text-eco-green hover:underline'
              data-testid={`link-author-${thread.id}`}
            >
              u/{thread.authorUsername}
            </a>
            <span
              className='text-xs text-eco-gray-500'
              data-testid={`text-timestamp-${thread.id}`}
            >
              {formatTimeAgo(thread.createdAt!)}
            </span>
            {thread.category && (
              <Badge
                className={`text-xs ${getCategoryColor(thread.category)}`}
                data-testid={`badge-category-${thread.id}`}
              >
                {thread.category}
              </Badge>
            )}
          </div>

          <h2
            className='mb-2 cursor-pointer text-lg font-semibold text-eco-gray-800 hover:text-eco-green'
            data-testid={`text-title-${thread.id}`}
          >
            {thread.title}
          </h2>

          {thread.preview && (
            <p
              className='mb-3 text-sm text-eco-gray-600'
              data-testid={`text-preview-${thread.id}`}
            >
              {thread.preview}
            </p>
          )}

          {thread.imageUrl && (
            <img
              src={thread.imageUrl}
              alt={thread.title}
              className='mb-3 h-48 w-full rounded-lg object-cover'
              data-testid={`img-thread-${thread.id}`}
            />
          )}

          <div className='flex items-center space-x-4 text-sm text-eco-gray-500'>
            <Button
              variant='ghost'
              size='sm'
              className='flex h-auto items-center space-x-1 p-0 transition-colors hover:text-eco-green'
              data-testid={`button-comments-${thread.id}`}
            >
              <MessageCircle className='h-4 w-4' />
              <span>{thread.commentCount || 0} comments</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex h-auto items-center space-x-1 p-0 transition-colors hover:text-eco-green'
              data-testid={`button-share-${thread.id}`}
            >
              <Share2 className='h-4 w-4' />
              <span>Share</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex h-auto items-center space-x-1 p-0 transition-colors hover:text-eco-green'
              data-testid={`button-save-${thread.id}`}
            >
              <Bookmark className='h-4 w-4' />
              <span>Save</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='flex h-auto items-center space-x-1 p-0 transition-colors hover:text-eco-green'
              data-testid={`button-award-${thread.id}`}
            >
              <Award className='h-4 w-4' />
              <span>Award</span>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}
