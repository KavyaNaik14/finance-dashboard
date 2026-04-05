import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SpendingBreakdown = () => {
  const data = [
    { name: 'Food', value: 650, color: '#ef4444' },
    { name: 'Transport', value: 420, color: '#f59e0b' },
    { name: 'Entertainment', value: 380, color: '#10b981' },
    { name: 'Shopping', value: 520, color: '#3b82f6' },
    { name: 'Utilities', value: 375, color: '#8b5cf6' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-8">Spending Breakdown</h3>
      <div className="h-80 flex flex-col justify-center items-center">
        <div className="w-48 h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">${total.toLocaleString()}</div>
          <div className="text-gray-300">Total Expenses</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-white font-medium">{item.name}</span>
            <span className="ml-auto text-gray-300">${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingBreakdown;