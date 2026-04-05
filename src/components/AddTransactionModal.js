


import React, { useState, useEffect } from 'react';

const AddTransactionModal = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense'
  });


   useEffect(() => {
    if (editData) {
      setFormData({
        description: editData.description,
        amount: editData.amount,
        category: editData.category,
        type: editData.type,
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense'
      });
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) return;
onAdd({
  id: editData ? editData.id : Date.now(),
  description: formData.description,
  amount: Number(formData.amount),
  type: Number(formData.amount) > 0 ? 'income' : 'expense',
  category: formData.category,
  merchant: 'Manual Entry',
});
    // reset form
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 rounded-3xl p-8 w-full max-w-md shadow-2xl">
       <h3 className="text-2xl font-bold text-gray-900 mb-6">
  {editData ? 'Edit Transaction' : 'Add Transaction'}
</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            className="w-full p-4 border rounded-xl"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full p-4 border rounded-xl"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">
  {editData ? 'Update' : 'Add'}
</button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-gray-600 py-3 rounded-xl border"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;