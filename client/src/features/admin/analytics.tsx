import React from 'react';

const Analytics: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,345', change: '+12%' },
    { label: 'Active Sessions', value: '1,234', change: '+5%' },
    { label: 'Page Views', value: '45,678', change: '+18%' },
    { label: 'Conversion Rate', value: '3.2%', change: '-2%' }
  ];

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">Analytics Dashboard</h4>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="p-3 bg-white rounded border">
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-lg font-bold">{stat.value}</div>
            <div className={`text-xs ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
        <span className="text-sm text-gray-600">📊 Analytics Charts</span>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        📈 Heavy analytics dashboard with complex data visualization.
      </p>
    </div>
  );
};

export default Analytics;
