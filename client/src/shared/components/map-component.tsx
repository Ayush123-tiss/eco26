import React from 'react';

const MapComponent: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">Sample Map Component</h4>
      <div className="h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center relative">
        <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="absolute bottom-3 left-1/3 w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-600">🗺️ Interactive Map</span>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        📍 This component would typically include heavy mapping libraries like Leaflet or Google Maps.
      </p>
    </div>
  );
};

export default MapComponent;
