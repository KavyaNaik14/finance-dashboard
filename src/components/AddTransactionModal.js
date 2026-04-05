import React, { useState } from 'react';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food', type: 'expense' });
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New transaction:', formData);
    onClose();
    setFormData({ description: '', amount: '', category: 'Food', type: 'expense' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Transaction</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Description" className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <input type="number" placeholder="Amount" className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">Add</button>
          <button type="button" onClick={onClose} className="w-full text-gray-600 py-3 rounded-xl border">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;