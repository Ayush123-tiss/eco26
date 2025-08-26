// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { lightweightUtils } from '@/lib/bundle-optimization';

interface TableData {
  id: number;
  technique: string;
  sizeBefore: string;
  sizeAfter: string;
  savings: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const DataTable: React.FC = () => {
  const [sortField, setSortField] = useState<keyof TableData>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  const data: TableData[] = [
    {
      id: 1,
      technique: 'Tree Shaking',
      sizeBefore: '2.8 MB',
      sizeAfter: '1.9 MB',
      savings: '32%',
      impact: 'High',
      difficulty: 'Easy'
    },
    {
      id: 2,
      technique: 'Code Splitting',
      sizeBefore: '1.9 MB',
      sizeAfter: '1.4 MB',
      savings: '26%',
      impact: 'High',
      difficulty: 'Medium'
    },
    {
      id: 3,
      technique: 'Dynamic Imports',
      sizeBefore: '1.4 MB',
      sizeAfter: '0.8 MB',
      savings: '43%',
      impact: 'High',
      difficulty: 'Medium'
    },
    {
      id: 4,
      technique: 'Gzip Compression',
      sizeBefore: '0.8 MB',
      sizeAfter: '0.4 MB',
      savings: '50%',
      impact: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 5,
      technique: 'Library Replacement',
      sizeBefore: '2.2 MB',
      sizeAfter: '1.6 MB',
      savings: '27%',
      impact: 'Medium',
      difficulty: 'Hard'
    },
    {
      id: 6,
      technique: 'Image Optimization',
      sizeBefore: '1.5 MB',
      sizeAfter: '0.6 MB',
      savings: '60%',
      impact: 'High',
      difficulty: 'Easy'
    },
    {
      id: 7,
      technique: 'CSS Purging',
      sizeBefore: '250 KB',
      sizeAfter: '85 KB',
      savings: '66%',
      impact: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 8,
      technique: 'Font Optimization',
      sizeBefore: '180 KB',
      sizeAfter: '45 KB',
      savings: '75%',
      impact: 'Low',
      difficulty: 'Medium'
    }
  ];

  // Use our lightweight utility functions instead of lodash
  const { debounce } = lightweightUtils;

  const debouncedFilter = useMemo(
    () => debounce((value: string) => setFilter(value), 300),
    []
  );

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (filter) {
      result = result.filter(item =>
        item.technique.toLowerCase().includes(filter.toLowerCase()) ||
        item.impact.toLowerCase().includes(filter.toLowerCase()) ||
        item.difficulty.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, filter, sortField, sortDirection]);

  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      case 'Low': return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      case 'Hard': return 'text-red-600 bg-red-50 dark:bg-red-950';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
        <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
          📊 Data Table with Lightweight Utilities
        </h3>
        <p className="text-sm text-green-600 dark:text-green-400">
          This data table uses custom utility functions instead of heavy libraries like lodash (~150KB savings).
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Filter techniques..."
          onChange={(e) => debouncedFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg flex-1 max-w-md bg-background"
        />
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedData.length} of {data.length} techniques
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('technique')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Technique</span>
                    {sortField === 'technique' && (
                      <span className="text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('sizeBefore')}
                >
                  Size Before
                </th>
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('sizeAfter')}
                >
                  Size After
                </th>
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('savings')}
                >
                  Savings
                </th>
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('impact')}
                >
                  Impact
                </th>
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('difficulty')}
                >
                  Difficulty
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-t hover:bg-muted/30 ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{row.technique}</td>
                  <td className="px-4 py-3 font-mono text-sm">{row.sizeBefore}</td>
                  <td className="px-4 py-3 font-mono text-sm text-green-600">{row.sizeAfter}</td>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-green-600">
                    {row.savings}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(row.impact)}`}>
                      {row.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(row.difficulty)}`}>
                      {row.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {filteredAndSortedData.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Optimization Techniques
          </div>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(
              filteredAndSortedData.reduce((acc, item) => 
                acc + parseInt(item.savings.replace('%', '')), 0
              ) / filteredAndSortedData.length
            )}%
          </div>
          <div className="text-sm text-muted-foreground">
            Average Savings
          </div>
        </div>
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {filteredAndSortedData.filter(item => item.difficulty === 'Easy').length}
          </div>
          <div className="text-sm text-muted-foreground">
            Easy to Implement
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
