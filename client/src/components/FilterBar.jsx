// src/components/FilterBar.jsx
import React, { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [type, setType] = useState('All');
  const [category, setCategory] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-4 mb-4"
    >
      <select
        className="border p-2 rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="All">All Types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterBar;
