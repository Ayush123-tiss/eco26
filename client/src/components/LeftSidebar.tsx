import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  ChevronRight
} from "lucide-react";

interface LeftSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onCreatePost: () => void;
}

export default function LeftSidebar({ collapsed, onToggle, onCreatePost }: LeftSidebarProps) {
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
      [section]: !prev[section]
    }));
  };

  const sidebarContent = (
    <aside className="w-80 space-y-6 sidebar-transition">
      {/* Sidebar Toggle */}
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="lg:hidden mb-4 bg-white border-eco-gray-200 hover:bg-eco-gray-50"
        data-testid="button-sidebar-toggle"
      >
        <Menu className="h-4 w-4 text-eco-gray-600" />
      </Button>

      {/* Create Post Button */}
      <Button
        onClick={onCreatePost}
        className="w-full bg-eco-green text-white py-3 px-4 rounded-lg font-medium hover:bg-eco-green-dark transition-colors"
        data-testid="button-create-post"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Community Post
      </Button>

      {/* Eco Topics */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <Collapsible
          open={expandedSections.ecoTopics}
          onOpenChange={() => toggleSection('ecoTopics')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 cursor-pointer" data-testid="trigger-eco-topics">
            <h3 className="font-semibold text-eco-gray-800">ECO TOPICS</h3>
            {expandedSections.ecoTopics ? (
              <ChevronDown className="h-4 w-4 text-eco-gray-500 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-eco-gray-500 transition-transform" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-sustainability">
              <Sprout className="h-4 w-4 mr-2 text-eco-green" />
              Sustainability
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-green-tech">
              <Zap className="h-4 w-4 mr-2 text-eco-green" />
              Green Tech
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-climate-action">
              <Globe className="h-4 w-4 mr-2 text-eco-green" />
              Climate Action
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-waste-reduction">
              <Recycle className="h-4 w-4 mr-2 text-eco-green" />
              Waste Reduction
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Joined Communities */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <Collapsible
          open={expandedSections.joinedCommunities}
          onOpenChange={() => toggleSection('joinedCommunities')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 cursor-pointer" data-testid="trigger-joined-communities">
            <h3 className="font-semibold text-eco-gray-800">JOINED COMMUNITIES</h3>
            {expandedSections.joinedCommunities ? (
              <ChevronDown className="h-4 w-4 text-eco-gray-500 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-eco-gray-500 transition-transform" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-zerowaste">
              <div className="w-4 h-4 bg-eco-green rounded-full mr-2"></div>
              r/ZeroWaste
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-solarpower">
              <div className="w-4 h-4 bg-eco-green-light rounded-full mr-2"></div>
              r/SolarPower
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-urbangardening">
              <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
              r/UrbanGardening
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Green Marketplace */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <Collapsible
          open={expandedSections.marketplace}
          onOpenChange={() => toggleSection('marketplace')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 cursor-pointer" data-testid="trigger-marketplace">
            <h3 className="font-semibold text-eco-gray-800">GREEN MARKETPLACE</h3>
            {expandedSections.marketplace ? (
              <ChevronDown className="h-4 w-4 text-eco-gray-500 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-eco-gray-500 transition-transform" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-eco-products">
              <ShoppingCart className="h-4 w-4 mr-2 text-eco-green" />
              Eco Products
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-recommendations">
              <Star className="h-4 w-4 mr-2 text-eco-green" />
              Recommendations
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Eco Learning */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <Collapsible
          open={expandedSections.learning}
          onOpenChange={() => toggleSection('learning')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 cursor-pointer" data-testid="trigger-learning">
            <h3 className="font-semibold text-eco-gray-800">ECO LEARNING</h3>
            {expandedSections.learning ? (
              <ChevronDown className="h-4 w-4 text-eco-gray-500 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-eco-gray-500 transition-transform" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-guides">
              <Book className="h-4 w-4 mr-2 text-eco-green" />
              How-to Guides
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-courses">
              <GraduationCap className="h-4 w-4 mr-2 text-eco-green" />
              Sustainability Courses
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Get Certificate */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <Collapsible
          open={expandedSections.certificate}
          onOpenChange={() => toggleSection('certificate')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 cursor-pointer" data-testid="trigger-certificate">
            <h3 className="font-semibold text-eco-gray-800">GET CERTIFICATE</h3>
            {expandedSections.certificate ? (
              <ChevronDown className="h-4 w-4 text-eco-gray-500 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-eco-gray-500 transition-transform" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-certification">
              <Award className="h-4 w-4 mr-2 text-eco-green" />
              Eco Certification
            </a>
            <a href="#" className="flex items-center text-sm text-eco-gray-600 hover:text-eco-green py-1 transition-colors" data-testid="link-badges">
              <Trophy className="h-4 w-4 mr-2 text-eco-green" />
              Achievement Badges
            </a>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );

  return collapsed ? null : sidebarContent;
}
