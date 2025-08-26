import React from 'react';

const ChartComponent: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">Sample Chart Component</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-20 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm">Series 1: 75%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Series 2: 60%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm">Series 3: 45%</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        📊 This component would typically include heavy charting libraries like Chart.js or D3.
      </p>
    </div>
  );
};

export default ChartComponent;
