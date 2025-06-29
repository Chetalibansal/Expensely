import Transaction from '../models/transaction.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';

export const createTransaction = asyncHandler(async (req, res) => {
  const { amount, type, category, description, date } = req.body;
  const userId = req.user._id;

  const transaction = await Transaction.create({
    userId, amount, type, category, description, date
  });

  res.status(201).json({ success: true, data: transaction });
});

export const getTransactions = asyncHandler(async (req, res) => {
  const { type, category, startDate, endDate } = req.query;
  const userId = req.user._id;

  const filter = { userId };

  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate && endDate) {
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const transactions = await Transaction.find(filter).sort({ date: -1 });

  res.status(200).json({ success: true, data: transactions });
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ success: true, data: updated });
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'Transaction deleted' });
});
