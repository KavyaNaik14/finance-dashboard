import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BalanceTrendChart = () => {
  const data = [
    { month: 'Jan', balance: 8500 },
    { month: 'Feb', balance: 9200 },
    { month: 'Mar', balance: 10500 },
    { month: 'Apr', balance: 11200 },
    { month: 'May', balance: 12567 },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-8">Balance Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.7)" 
              fontSize={14}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)" 
              fontSize={14}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
  cursor={{ stroke: '#aaa', strokeWidth: 1 }}
  wrapperStyle={{ outline: 'none' }}
  contentStyle={{
    background: 'rgba(0,0,0,0.8)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    color: '#fff'
  }}
  itemStyle={{ color: '#fff' }}
/>
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="url(#gradient)"
              strokeWidth={4}
              dot={{ fill: '#10b981', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={1} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrendChart;