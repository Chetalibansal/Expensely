// src/pages/reports/ReportsPage.jsx

import { useState } from "react";
import ExpenseChart from "./ExpenseChart";
import DownloadReport from "./DownloadReport";
import { motion } from "framer-motion";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const [transactions] = useState([
    { id: 1, category: "Food", amount: 1200 },
    { id: 2, category: "Transport", amount: 800 },
    { id: 3, category: "Entertainment", amount: 4000 },
    { id: 4, category: "Food", amount: 1800 },
    { id: 5, category: "Bills", amount: 3000 },
  ]);

  const handleChange = (e) => {
    setDateRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filtered = transactions; // Optional: filter by date range

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📈 Financial Report
      </h1>

      {/* 🔍 Date Filter + Download */}
      <div className="bg-white shadow-md p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <DownloadReport data={filtered} />
      </div>

      <div className="bg-white shadow-lg rounded-xl p-4">
        <ExpenseChart transactions={filtered} />
      </div>
    </motion.div>
  );
};

export default ReportsPage;
