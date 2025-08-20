import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import ThreadCard from "@/components/ThreadCard";
import CreatePostDialog from "@/components/CreatePostDialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List, Plus, Menu, Search } from "lucide-react";
import type { Thread } from "@shared/schema";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"people" | "products">("people");
  const [activeSection, setActiveSection] = useState<"community" | "blog" | "news">("community");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState("best");
  const [timeFilter, setTimeFilter] = useState("today");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const { data: threads = [], isLoading, refetch } = useQuery<Thread[]>({
    queryKey: ["/api/threads", activeSection],
    queryFn: async () => {
      const response = await fetch(`/api/threads?section=${activeSection}`);
      if (!response.ok) throw new Error("Failed to fetch threads");
      return response.json();
    },
  });

  const { data: communities = [] } = useQuery({
    queryKey: ["/api/communities"],
  });

  return (
    <div className="min-h-screen bg-eco-gray-50 text-eco-gray-700">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Secondary Navigation */}
      <div className="bg-white border-b border-eco-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSection("community")}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === "community"
                    ? "bg-white text-eco-blue border-black hover:bg-blue-50"
                    : "bg-white text-eco-gray-600 border-black hover:bg-eco-gray-50"
                }`}
                data-testid="button-community"
              >
                Community
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSection("blog")}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === "blog"
                    ? "bg-white text-eco-blue border-black hover:bg-blue-50"
                    : "bg-white text-eco-gray-600 border-black hover:bg-eco-gray-50"
                }`}
                data-testid="button-blog"
              >
                Blog
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSection("news")}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === "news"
                    ? "bg-white text-eco-blue border-black hover:bg-blue-50"
                    : "bg-white text-eco-gray-600 border-black hover:bg-eco-gray-50"
                }`}
                data-testid="button-news"
              >
                News
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-28 h-8" data-testid="select-sort-top">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best">Best</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                className="px-6 py-2 border-black text-eco-gray-600 hover:bg-eco-gray-50 rounded-lg font-medium"
                data-testid="button-search"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              
              <Button
                onClick={() => setShowCreatePost(true)}
                className="bg-eco-green text-white hover:bg-eco-green-dark px-6 py-2 rounded-lg font-medium"
                data-testid="button-create-post-header"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Community
              </Button>
            </div>
          </div>
          
        </div>
      </div>

      <div className="w-full px-4">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="relative flex-shrink-0">
            <LeftSidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              onCreatePost={() => setShowCreatePost(true)}
            />
            {/* Resize Handle */}
            {!sidebarCollapsed && (
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-eco-gray-200 hover:bg-eco-gray-300 cursor-col-resize transition-colors group">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-eco-gray-400 group-hover:bg-eco-gray-500 transition-colors"></div>
              </div>
            )}
          </div>

          {/* Main Content - Expanded */}
          <main className="flex-1 max-w-4xl mx-auto px-6 space-y-4">


            {/* Thread List */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-eco-gray-200 p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-eco-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-eco-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-eco-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : threads.length === 0 ? (
              <div className="bg-white rounded-lg border border-eco-gray-200 p-12 text-center">
                <h3 className="text-lg font-semibold text-eco-gray-800 mb-2">No posts yet</h3>
                <p className="text-eco-gray-600 mb-4">Be the first to share something with the community!</p>
                <Button
                  onClick={() => setShowCreatePost(true)}
                  className="bg-eco-green text-white hover:bg-eco-green-dark"
                  data-testid="button-create-first-post"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {threads.map((thread) => (
                  <ThreadCard key={thread.id} thread={thread} onUpdate={refetch} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {threads.length > 0 && (
              <div className="text-center py-8">
                <Button
                  className="px-8 py-3 bg-eco-green text-white hover:bg-eco-green-dark"
                  data-testid="button-load-more"
                >
                  Load More Posts
                </Button>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <div className="flex-shrink-0">
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
