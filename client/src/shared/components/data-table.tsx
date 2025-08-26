import React from 'react';

const DataTable: React.FC = () => {
  const sampleData = [
    { id: 1, name: 'Solar Panel A', efficiency: '22.5%', price: '$299' },
    { id: 2, name: 'Wind Turbine B', efficiency: '18.2%', price: '$1,299' },
    { id: 3, name: 'Battery Pack C', efficiency: '95.8%', price: '$599' }
  ];

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">Sample Data Table</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Efficiency</th>
              <th className="text-left p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.efficiency}</td>
                <td className="p-2 font-medium">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        📋 This component would typically include heavy table libraries with sorting, filtering, and pagination.
      </p>
    </div>
  );
};

export default DataTable;
