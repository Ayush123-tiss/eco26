import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">Simple Overview</h4>
      <div className="p-3 bg-white rounded border">
        <div className="text-sm text-gray-500">Total Users</div>
        <div className="text-lg font-bold">2,345</div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        � Simplified dashboard view
      </p>
    </div>
  );
};

export default Analytics;
