// src/pages/budget/BudgetPage.jsx

import { useState } from "react";
import BudgetCard from "./BudgetCard";
import { motion } from "framer-motion";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food", limit: 5000, spent: 2700 },
    { id: 2, category: "Transport", limit: 2000, spent: 1500 },
  ]);

  const [formData, setFormData] = useState({ category: "", limit: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = {
      id: Date.now(),
      category: formData.category,
      limit: parseFloat(formData.limit),
      spent: 0,
    };
    setBudgets((prev) => [...prev, newBudget]);
    setFormData({ category: "", limit: "" });
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">💰 Budget Manager</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-md mb-8"
      >
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none"
          required
        />
        <input
          type="number"
          name="limit"
          value={formData.limit}
          onChange={handleChange}
          placeholder="Limit (₹)"
          className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Budget
        </button>
      </form>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetPage;
