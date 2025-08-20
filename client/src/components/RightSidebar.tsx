import { Button } from "@/components/ui/button";
import { Sprout, Zap, Recycle, Battery, Leaf } from "lucide-react";
import type { Community } from "@shared/schema";

interface RightSidebarProps {
  communities: Community[];
}

export default function RightSidebar({ communities }: RightSidebarProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "seedling":
        return <Sprout className="text-white text-xs" />;
      case "solar-panel":
        return <Zap className="text-white text-xs" />;
      case "recycle":
        return <Recycle className="text-white text-xs" />;
      case "car-battery":
        return <Battery className="text-white text-xs" />;
      case "leaf":
        return <Leaf className="text-white text-xs" />;
      default:
        return <Sprout className="text-white text-xs" />;
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
    <aside className="w-80 space-y-6">
      {/* Popular Communities */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <h3 className="font-semibold text-eco-gray-800 mb-4">Popular Communities</h3>
        <div className="space-y-3">
          {communities.slice(0, 5).map((community) => (
            <div key={community.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: community.color || '#10B981' }}
                >
                  {getIcon(community.icon || 'seedling')}
                </div>
                <div>
                  <p className="font-medium text-sm text-eco-gray-800" data-testid={`text-community-${community.name}`}>
                    {community.name}
                  </p>
                  <p className="text-xs text-eco-gray-500" data-testid={`text-members-${community.name}`}>
                    {formatMemberCount(community.memberCount || 0)} members
                  </p>
                </div>
              </div>
              <Button 
                size="sm"
                className="px-3 py-1 bg-eco-green text-white text-xs rounded-full hover:bg-eco-green-dark transition-colors"
                data-testid={`button-join-${community.name}`}
              >
                Join
              </Button>
            </div>
          ))}
        </div>
        <Button 
          variant="ghost"
          className="w-full mt-4 text-sm text-eco-green hover:text-eco-green-dark font-medium"
          data-testid="button-view-all-communities"
        >
          View All Communities
        </Button>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-lg border border-eco-gray-200 p-4">
        <h3 className="font-semibold text-eco-gray-800 mb-4">Trending Topics</h3>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-eco-gray-600 hover:text-eco-green transition-colors" data-testid="link-climate-action">#ClimateAction</a>
          <a href="#" className="block text-sm text-eco-gray-600 hover:text-eco-green transition-colors" data-testid="link-solar-power">#SolarPower</a>
          <a href="#" className="block text-sm text-eco-gray-600 hover:text-eco-green transition-colors" data-testid="link-zero-waste">#ZeroWaste</a>
          <a href="#" className="block text-sm text-eco-gray-600 hover:text-eco-green transition-colors" data-testid="link-electric-vehicles">#ElectricVehicles</a>
          <a href="#" className="block text-sm text-eco-gray-600 hover:text-eco-green transition-colors" data-testid="link-urban-gardening">#UrbanGardening</a>
        </div>
      </div>

      {/* Eco Tips */}
      <div className="bg-gradient-to-br from-eco-green to-eco-green-light rounded-lg p-4 text-white">
        <h3 className="font-semibold mb-2">Daily Eco Tip</h3>
        <p className="text-sm text-green-50 mb-3">
          Replace disposable water bottles with a reusable one. You'll save money and reduce plastic waste!
        </p>
        <Button 
          size="sm"
          variant="ghost"
          className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors text-white"
          data-testid="button-share-tip"
        >
          Share Tip
        </Button>
      </div>
    </aside>
  );
}
