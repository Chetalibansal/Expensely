import {asyncHandler} from "../utils/asyncHandler.js"
import {Budget} from "../models/budget.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"

const createBudget = asyncHandler(async(req,res)=>{
    const {category, amount, month} = req.body
    const userId = req.user.userId
    const budget = await Budget.create({
        userId,
        category,
        amount,
        month
    })
    if(!budget) throw new ApiError(400, "Failed to create budget")

    return res.status(200)
    .json(new ApiResponse(201, budget, "Budget created"))
})

const getBudgets = asyncHandler(async(req,res)=>{
    const budgets = await Budget.find({userId: req.user.userId})

    if(!budgets.length) throw new ApiError(404, "No budgets found for this user")
    
    return res
    .status(200)
    .json(new ApiResponse(200, budgets, "fetched budgets successfully"))
})

const getBudgetAlerts = asyncHandler(async(req,res)=>{
    const {threshold = 5000}  = req.query 
    const budgets = await Budget.find({userId:req.user.userId})

    if(!budgets.length) throw new ApiError(404, "No budgets found to analyze alerts")

    const alerts = budgets.filter(b=>b.amount>threshold);
    return res.status(200).json(200, alerts, "budget alerts")
})

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find().select("-password")

    if(!users.length) throw new ApiError(404, "No users found")

        return res.status(200, users, "fetched all users successfully")
})



export {createBudget, getBudgets, getBudgetAlerts, getAllUsers}