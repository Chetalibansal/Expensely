// src/components/TransactionTable.jsx
import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="text-center">
              <td className="py-2 px-4 border-b">{tx.date}</td>
              <td className="py-2 px-4 border-b">{tx.type}</td>
              <td className="py-2 px-4 border-b">{tx.category}</td>
              <td
                className={`py-2 px-4 border-b ${
                  tx.type === 'Expense' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                ₹{tx.amount}
              </td>
              <td className="py-2 px-4 border-b">{tx.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
