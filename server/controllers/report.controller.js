import Transaction from '../models/transaction.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';



const detectAnomalies = (transactions) => {
  const categoryMap = {};

  transactions.forEach(tx => {
    if (!categoryMap[tx.category]) categoryMap[tx.category] = [];
    categoryMap[tx.category].push(tx.amount);
  });

  const anomalies = [];

  for (const category in categoryMap) {
    const amounts = categoryMap[category];
    const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;

    transactions.forEach(tx => {
      if (tx.category === category && tx.amount >= 4 * avg) {
        anomalies.push({ ...tx._doc, reason: `4x ${category} average` });
      }
    });
  }

  return anomalies;
};



export const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const transactions = await Transaction.find({ userId });

  let income = 0, expense = 0;
  const categoryBreakdown = {};

  transactions.forEach(tx => {
    if (tx.type === 'income') income += tx.amount;
    else expense += tx.amount;

    if (!categoryBreakdown[tx.category]) categoryBreakdown[tx.category] = 0;
    categoryBreakdown[tx.category] += tx.amount;
  });

  res.status(200).json({
    totalIncome: income,
    totalExpense: expense,
    totalSavings: income - expense,
    breakdown: categoryBreakdown
  });
});



export const downloadReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const transactions = await Transaction.find({ userId });

  const fields = ['_id', 'type', 'category', 'amount', 'note', 'date'];
  const parser = new Parser({ fields });
  const csv = parser.parse(transactions);

  const filePath = path.join('downloads', `transactions-${userId}.csv`);
  fs.writeFileSync(filePath, csv);

  res.download(filePath, () => {
    fs.unlinkSync(filePath); // Clean up after download
  });
});



export const getChartData = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const transactions = await Transaction.find({ userId });

  const chartMap = {}; // { Jan: { income: X, expense: Y }, ... }

  transactions.forEach(tx => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });

    if (!chartMap[month]) chartMap[month] = { income: 0, expense: 0 };

    chartMap[month][tx.type] += tx.amount;
  });

  const chartData = Object.keys(chartMap).map(month => ({
    month,
    income: chartMap[month].income,
    expense: chartMap[month].expense,
  }));

  res.status(200).json(chartData);
});



export const getAnomalies = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const transactions = await Transaction.find({ userId });

  const anomalies = detectAnomalies(transactions);

  res.status(200).json({
    count: anomalies.length,
    anomalies
  });
});
