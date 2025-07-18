// src/components/transactions/AddTransactionModal.jsx

import { useState } from "react";

const AddTransactionModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    type: "Expense",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" name="date" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required className="w-full p-2 border rounded" />
          <select name="type" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
