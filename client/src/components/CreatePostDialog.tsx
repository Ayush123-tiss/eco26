import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { InsertThread } from "@shared/schema";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: "community" | "blog" | "news";
  onSuccess: () => void;
}

export default function CreatePostDialog({ open, onOpenChange, section, onSuccess }: CreatePostDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [communityName, setCommunityName] = useState("");
  const { toast } = useToast();

  const createPostMutation = useMutation({
    mutationFn: async (post: InsertThread) => {
      const response = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "Your post has been created successfully.",
      });
      resetForm();
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Failed to create post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPreview("");
    setImageUrl("");
    setCategory("");
    setCommunityName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    const post: InsertThread = {
      title: title.trim(),
      content: content.trim(),
      preview: preview.trim() || content.trim().substring(0, 150) + "...",
      authorId: "current-user",
      authorUsername: "CurrentUser",
      communityName: communityName || "r/sustainability",
      imageUrl: imageUrl.trim() || undefined,
      category: category || undefined,
      section,
    };

    createPostMutation.mutate(post);
  };

  const categories = {
    community: ["Climate Action", "Urban Gardening", "Waste Reduction", "Green Tech", "Sustainability"],
    blog: ["Innovation", "Research", "Opinion", "Tutorial", "Review"],
    news: ["Climate Policy", "Environmental News", "Technology", "Events", "Updates"],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="dialog-create-post">
        <DialogHeader>
          <DialogTitle>Create New {section.charAt(0).toUpperCase() + section.slice(1)} Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="mt-1"
              data-testid="input-title"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              className="mt-1 min-h-[120px]"
              data-testid="textarea-content"
            />
          </div>

          <div>
            <Label htmlFor="preview">Preview Text (Optional)</Label>
            <Textarea
              id="preview"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="Optional: Add a custom preview text..."
              className="mt-1 h-20"
              data-testid="textarea-preview"
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-1"
              data-testid="input-image-url"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1" data-testid="select-category">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories[section].map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="community">Community</Label>
              <Select value={communityName} onValueChange={setCommunityName}>
                <SelectTrigger className="mt-1" data-testid="select-community">
                  <SelectValue placeholder="Select community..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r/sustainability">r/sustainability</SelectItem>
                  <SelectItem value="r/renewableenergy">r/renewableenergy</SelectItem>
                  <SelectItem value="r/zerowaste">r/zerowaste</SelectItem>
                  <SelectItem value="r/electricvehicles">r/electricvehicles</SelectItem>
                  <SelectItem value="r/gardening">r/gardening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPostMutation.isPending}
              className="bg-eco-green text-white hover:bg-eco-green-dark"
              data-testid="button-submit"
            >
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
