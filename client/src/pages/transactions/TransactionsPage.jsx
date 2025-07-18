import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiPlus } from "react-icons/fi";
import AddTransactionModal from "../../pages/transactions/AddTransactionModal";

const TransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dummyData = [
    { id: 1, date: "2025-06-01", category: "Food", amount: 1200, type: "Expense" },
    { id: 2, date: "2025-06-03", category: "Transport", amount: 600, type: "Expense" },
    { id: 3, date: "2025-06-05", category: "Freelance", amount: 8000, type: "Income" },
  ];

  const filtered = dummyData.filter((tx) =>
    tx.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div className="max-w-5xl mx-auto p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🧾 Transactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          <FiPlus /> Add Transaction
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by category"
          className="w-full focus:outline-none p-2"
        />
      </div>

      {/* Table UI as before... */}
      

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default TransactionsPage;
