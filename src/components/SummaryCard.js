import React from 'react';

const SummaryCard = ({ title, value, trend, icon, color }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 bg-gradient-to-r rounded-2xl text-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 ${
          isPositive 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {trend}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-white/90">
        {value}
      </h3>
      <p className="text-gray-300 text-lg">{title}</p>
    </div>
  );
};

export default SummaryCard;