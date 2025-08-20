import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

interface HeaderProps {
  activeTab: "people" | "products";
  onTabChange: (tab: "people" | "products") => void;
}

function handleTabChange(tab: "people" | "products") {
  if (tab === "people") {
    window.location.href = "/";
  } else {
    window.location.href = "/products";
  }
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-eco-gray-200 sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Leaf className="text-eco-green text-2xl mr-2" />
            <span className="text-2xl font-bold text-eco-gray-800">EcoBingle</span>
          </div>

          {/* Center - Main Navigation Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleTabChange("people")}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === "people"
                  ? "bg-eco-green text-white shadow-md hover:bg-eco-green-dark"
                  : "bg-white text-eco-gray-600 border border-eco-gray-300 hover:bg-eco-gray-50"
              }`}
              data-testid="button-eco-people"
            >
              Eco People
            </Button>
            <Button
              onClick={() => handleTabChange("products")}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === "products"
                  ? "bg-eco-blue text-white shadow-md hover:bg-blue-600"
                  : "bg-white text-eco-gray-600 border border-eco-gray-300 hover:bg-eco-gray-50"
              }`}
              data-testid="button-eco-products"
            >
              Eco Products
            </Button>
          </div>

          {/* Right Side - Sign In */}
          <Button
            variant="outline"
            className="px-6 py-2 border border-eco-gray-300 rounded-lg font-medium text-eco-gray-700 hover:bg-eco-gray-50"
            data-testid="button-sign-in"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
