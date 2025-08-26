import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useToast } from '@/shared/hooks/use-toast';
import { useFocusTrap, useAnnouncer } from '@/shared/hooks/use-accessibility';
import type { InsertThread } from '@shared/schema';
import { AnimatedInput, AnimatedButton } from '@/shared/animations';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: 'community' | 'blog' | 'news';
  onSuccess: () => void;
}

export default function CreatePostDialog({
  open,
  onOpenChange,
  section,
  onSuccess,
}: CreatePostDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { toast } = useToast();
  const announce = useAnnouncer();
  const { containerRef, restoreFocus } = useFocusTrap(open);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (open && titleInputRef.current) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPostMutation = useMutation({
    mutationFn: async (post: InsertThread) => {
      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Post created',
        description: 'Your post has been created successfully.',
      });
      announce('Post created successfully', 'polite');
      resetForm();
      onSuccess();
      restoreFocus();
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast({
        title: 'Failed to create post',
        description: errorMessage,
        variant: 'destructive',
      });
      announce(`Error creating post: ${errorMessage}`, 'assertive');
    },
  });

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPreview('');
    setImageUrl('');
    setCategory('');
    setCommunityName('');
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      announce('Please fix the errors in the form', 'assertive');
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField === 'title') {
        titleInputRef.current?.focus();
      }
      return;
    }

    const post: InsertThread = {
      title: title.trim(),
      content: content.trim(),
      preview: preview.trim() || content.trim().substring(0, 150) + '...',
      authorId: 'current-user',
      authorUsername: 'CurrentUser',
      communityName: communityName || 'r/sustainability',
      imageUrl: imageUrl.trim() || undefined,
      category: category || undefined,
      section,
    };

    createPostMutation.mutate(post);
  };

  const categories = {
    community: [
      'Climate Action',
      'Urban Gardening',
      'Waste Reduction',
      'Green Tech',
      'Sustainability',
    ],
    blog: ['Innovation', 'Research', 'Opinion', 'Tutorial', 'Review'],
    news: [
      'Climate Policy',
      'Environmental News',
      'Technology',
      'Events',
      'Updates',
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className='max-h-[80vh] max-w-2xl overflow-y-auto'
        data-testid='dialog-create-post'
        role="dialog"
        aria-labelledby="create-post-title"
        aria-describedby="create-post-description"
      >
        <DialogHeader>
          <DialogTitle id="create-post-title">
            Create New {section.charAt(0).toUpperCase() + section.slice(1)} Post
          </DialogTitle>
          <p id="create-post-description" className="text-sm text-gray-600">
            Fill out the form below to create a new post in the {section} section.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4' noValidate>
          <div>
            <Label htmlFor='post-title'>
              Title <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              ref={titleInputRef}
              id='post-title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors(prev => ({ ...prev, title: '' }));
                }
              }}
              placeholder='Enter your post title...'
              className='mt-1'
              data-testid='input-title'
              aria-required="true"
              aria-invalid={errors.title ? 'true' : 'false'}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='post-content'>
              Content <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Textarea
              id='post-content'
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) {
                  setErrors(prev => ({ ...prev, content: '' }));
                }
              }}
              placeholder='Write your post content...'
              className='mt-1 min-h-[120px]'
              data-testid='textarea-content'
              aria-required="true"
              aria-invalid={errors.content ? 'true' : 'false'}
              aria-describedby={errors.content ? 'content-error' : undefined}
            />
            {errors.content && (
              <p id="content-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.content}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='post-preview'>Preview Text (Optional)</Label>
            <Textarea
              id='post-preview'
              value={preview}
              onChange={e => setPreview(e.target.value)}
              placeholder='Optional: Add a custom preview text...'
              className='mt-1 h-20'
              data-testid='textarea-preview'
              aria-describedby="preview-description"
            />
            <p id="preview-description" className="mt-1 text-xs text-gray-500">
              This text will be shown as a preview of your post
            </p>
          </div>

          <div>
            <Label htmlFor='post-image-url'>Image URL (Optional)</Label>
            <Input
              id='post-image-url'
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder='https://example.com/image.jpg'
              className='mt-1'
              data-testid='input-image-url'
              type="url"
              aria-describedby="image-url-description"
            />
            <p id="image-url-description" className="mt-1 text-xs text-gray-500">
              Enter a valid URL for an image to include with your post
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='post-category'>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger 
                  className='mt-1' 
                  data-testid='select-category'
                  aria-label="Select post category"
                >
                  <SelectValue placeholder='Select category...' />
                </SelectTrigger>
                <SelectContent>
                  {categories[section].map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='post-community'>Community</Label>
              <Select value={communityName} onValueChange={setCommunityName}>
                <SelectTrigger 
                  className='mt-1' 
                  data-testid='select-community'
                  aria-label="Select community"
                >
                  <SelectValue placeholder='Select community...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='r/sustainability'>
                    r/sustainability
                  </SelectItem>
                  <SelectItem value='r/renewableenergy'>
                    r/renewableenergy
                  </SelectItem>
                  <SelectItem value='r/zerowaste'>r/zerowaste</SelectItem>
                  <SelectItem value='r/electricvehicles'>
                    r/electricvehicles
                  </SelectItem>
                  <SelectItem value='r/gardening'>r/gardening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex justify-end space-x-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                onOpenChange(false);
                restoreFocus();
              }}
              data-testid='button-cancel'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={createPostMutation.isPending}
              className='bg-eco-green text-white hover:bg-eco-green-dark focus-visible:ring-2 focus-visible:ring-green-500'
              data-testid='button-submit'
              aria-describedby={createPostMutation.isPending ? 'submit-status' : undefined}
            >
              {createPostMutation.isPending ? (
                <>
                  <span aria-hidden="true">Creating...</span>
                  <span id="submit-status" className="sr-only">
                    Creating post, please wait
                  </span>
                </>
              ) : (
                'Create Post'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
