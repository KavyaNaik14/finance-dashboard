import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ icon, title, value, change, isPositive }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
          {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
            {change}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mt-4">{value}</h3>
      <p className="text-gray-400 text-sm mt-1">{title}</p>
    </div>
  );
};

export default StatsCard;