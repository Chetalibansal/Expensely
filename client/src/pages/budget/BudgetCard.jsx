// src/pages/budget/BudgetCard.jsx

import { motion } from "framer-motion";

const BudgetCard = ({ budget }) => {
  const { category, limit, spent } = budget;
  const percent = Math.min((spent / limit) * 100, 100);
  const isOver = spent > limit;

  return (
    <motion.div
      className={`rounded-2xl p-5 shadow-lg border-l-4 ${
        isOver ? "border-red-500 bg-red-50" : "border-green-500 bg-white"
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">{category}</h2>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            isOver ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          ₹{spent} / ₹{limit}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            isOver ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {isOver && (
        <p className="text-red-600 text-sm mt-2">⚠️ You’ve exceeded your budget</p>
      )}
    </motion.div>
  );
};

export default BudgetCard;
