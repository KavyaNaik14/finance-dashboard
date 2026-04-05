// 

import React from 'react';
import SummaryCard from './SummaryCard';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingBreakdown from './SpendingBreakdown';
// import RecentTransactions from './RecentTransactions';
import Transactions from './Transactions';
import RoleSwitcher from './RoleSwitcher';
import { useRole } from '../contexts/RoleContext';


const Dashboard = () => {
  const summaryData = {
    balance: 12567.89,
    income: 8567.45,
    expenses: 2345.67,
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Finance Dashboard 
        </h1>
        <p className="text-xl text-gray-300">Manage your finances with real-time insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <SummaryCard
          title="Total Balance"
          value={`$${summaryData.balance.toLocaleString()}`}
          trend="+12.5%"
          icon="💰"
          color="from-emerald-500 to-emerald-600"
        />
        <SummaryCard
          title="Monthly Income"
          value={`$${summaryData.income.toLocaleString()}`}
          trend="+8.2%"
          icon="📈"
          color="from-blue-500 to-blue-600"
        />
        <SummaryCard
          title="Monthly Expenses"
          value={`$${summaryData.expenses.toLocaleString()}`}
          trend="-3.1%"
          icon="📉"
          color="from-red-500 to-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>

      {/* Recent Transactions
      <RecentTransactions /> */}


        {/* All Transactions */}
        <Transactions />

        


    </div>

    
  );
};

export default Dashboard;