import React, { useState } from 'react';
import { Search, ArrowUpDown, Calendar, DollarSign, Plus, Edit3, Trash2, Shield } from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';
import RoleSwitcher from './RoleSwitcher';
import ProtectedButton from './ProtectedButton';
import AddTransactionModal from './AddTransactionModal';

const Transactions = () => {
  // Sample transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2024-01-15',
      description: 'Groceries - Walmart',
      amount: -89.45,
      type: 'expense',
      category: 'Food',
      merchant: 'Walmart'
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Freelance Payment',
      amount: 2500.00,
      type: 'income',
      category: 'Work',
      merchant: 'Client XYZ'
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Netflix Subscription',
      amount: -12.99,
      type: 'expense',
      category: 'Entertainment',
      merchant: 'Netflix'
    },
    {
      id: 4,
      date: '2024-01-12',
      description: 'Gas Station',
      amount: -45.20,
      type: 'expense',
      category: 'Transport',
      merchant: 'Shell'
    },
    {
      id: 5,
      date: '2024-01-11',
      description: 'Dividend Income',
      amount: 450.75,
      type: 'income',
      category: 'Investments',
      merchant: 'Vanguard'
    },
    {
      id: 6,
      date: '2024-01-10',
      description: 'Coffee Shop',
      amount: -8.50,
      type: 'expense',
      category: 'Food',
      merchant: 'Starbucks'
    }
  ]);

  // Filter states
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Role-based modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const { can } = usePermissions();

  // Filtered & sorted transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'amount') {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });

  const categories = ['all', ...new Set(transactions.map(t => t.category))];
  const getTypeColor = (type) => type === 'income' ? 'text-emerald-400' : 'text-red-400';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

 const handleDelete = (id) => {
  // eslint-disable-next-line no-restricted-globals
  if (window.confirm('Delete this transaction?')) {
    setTransactions(transactions.filter(t => t.id !== id));
  }
};

  return (
    <div className="space-y-6">
      {/* 🔑 Role Switcher - Always Visible */}
      <RoleSwitcher />

      {/* 🛡️ Admin Banner - Admin Only */}
      {can('create') && (
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-400/30 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-emerald-300 text-lg">Admin Mode Active</p>
              <p className="text-emerald-200 text-sm">Full editing capabilities enabled</p>
            </div>
          </div>
          <ProtectedButton 
            permission="create"
            onClick={() => setShowAddModal(true)}
            icon={Plus}
          >
            Add New Transaction
          </ProtectedButton>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Recent Transactions</h3>
            <p className="text-gray-300">
              {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-white/5 rounded-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                {[
                  { label: 'Date', field: 'date', sortable: true },
                  { label: 'Description', sortable: false },
                  { label: 'Category', sortable: false },
                  { label: 'Amount', field: 'amount', sortable: true },
                  { label: can('edit') ? 'Actions' : '' }
                ].map((header, index) => (
                  header.label && (
                    <th key={index} className="pb-6 pr-8 text-gray-300 font-medium text-sm uppercase tracking-wider">
                      {header.sortable ? (
                        <button className="flex items-center gap-1 hover:text-white group" onClick={() => toggleSort(header.field)}>
                          {header.label}
                          <ArrowUpDown size={16} className={`transition-transform ${sortBy === header.field ? (sortOrder === 'desc' ? 'rotate-0' : 'rotate-180') : ''}`} />
                        </button>
                      ) : header.label}
                    </th>
                  )
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-white/5">
                    <td className="py-6 pr-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-xl">
                          <Calendar size={18} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{formatDate(transaction.date)}</p>
                          <p className="text-sm text-gray-400">{transaction.merchant}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 pr-8">
                      <div>
                        <p className="font-semibold text-white">{transaction.description}</p>
                        <p className={`text-sm ${getTypeColor(transaction.type)}`}>
                          {transaction.type.toUpperCase()}
                        </p>
                      </div>
                    </td>
                    <td className="py-6 pr-8">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-6 pr-8">
                      <span className={`text-2xl font-bold ${getTypeColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                    {can('edit') && (
                      <td className="py-6">
                        <div className="flex gap-2">
                          <ProtectedButton 
                            permission="edit" 
                            className="p-2"
                            icon={Edit3}
                            onClick={() => console.log('Edit:', transaction.id)}
                          />
                          <ProtectedButton 
                            permission="delete"
                            className="p-2"
                            icon={Trash2}
                            onClick={() => handleDelete(transaction.id)}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={can('edit') ? 5 : 4} className="py-20 text-center">
                    <DollarSign size={48} className="mx-auto text-gray-500 mb-4" />
                    <p className="text-xl text-gray-400">No transactions found</p>
                    <p className="text-gray-500">Try adjusting your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Admin Only */}
      <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default Transactions;