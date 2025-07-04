import { asyncHandler } from "../utils/asyncHandler.js";
import { Budget } from "../models/budget.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const createBudget = asyncHandler(async (req, res) => {
  const { category, amount, month } = req.body;
  const userId = req.user?._id || req.user?.userId;
  if (!userId) throw new ApiError(401, "User Id not found");
  const budget = await Budget.create({
    userId,
    category,
    amount,
    month,
  });
  if (!budget) throw new ApiError(400, "Failed to create budget");

  return res.status(200).json(new ApiResponse(201, budget, "Budget created"));
});

const getBudgets = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({
    userId: req.user._id || req.user.userId,
  });

  if (!budgets.length)
    throw new ApiError(404, "No budgets found for this user");

  return res
    .status(200)
    .json(new ApiResponse(200, budgets, "fetched budgets successfully"));
});

const getBudgetAlerts = asyncHandler(async (req, res) => {
  const { threshold = 5000 } = req.query;
  const budgets = await Budget.find({
    userId: req.user._id || req.user.userId,
  });

  if (!budgets.length)
    throw new ApiError(404, "No budgets found to analyze alerts");

  const alerts = budgets.filter((b) => b.amount > Number(threshold));
  return res
    .status(200)
    .json(new ApiResponse(200, alerts, "Budget alerts fetched successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (!users.length) throw new ApiError(404, "No users found");

  return res.status(200, users, "fetched all users successfully");
});

const getBudgetChartData = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({
    userId: req.user._id || req.user.userId,
  });
  if (!budgets.length)
    throw new ApiError(404, "No budget data found for this user");

  const monthMap = {};

  budgets.forEach((budget) => {
    const month = budget.month;
    if (!monthMap[month]) monthMap[month] = 0;
    monthMap[month] += budget.amount
  });

  const chartData = Object.keys(monthMap).map(month=>({
    month,
    total: monthMap[month],
  }))

  res.status(200).json(new ApiResponse(200, chartData, "Budget chart data fetched successfully"))

});

export { createBudget, getBudgets, getBudgetAlerts, getAllUsers, getBudgetChartData };
