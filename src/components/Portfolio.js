import React from 'react';

const Portfolio = () => {
  const portfolio = [
    { name: 'Tesla (TSLA)', value: 12500, change: 5.2, color: 'bg-blue-500/20' },
    { name: 'Apple (AAPL)', value: 9800, change: -1.8, color: 'bg-gray-500/20' },
    { name: 'Bitcoin (BTC)', value: 23400, change: 8.7, color: 'bg-orange-500/20' },
    { name: 'Ethereum (ETH)', value: 15600, change: 3.4, color: 'bg-purple-500/20' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-6">Portfolio</h3>
      <div className="space-y-3">
        {portfolio.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                <span className="text-xs font-bold text-white">{item.name.split(' ')[0]}</span>
              </div>
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-gray-400">${item.value.toLocaleString()}</p>
              </div>
            </div>
            <span className={`font-medium ${
              item.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {item.change >= 0 ? '+' : ''}{item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;