import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateToken.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const existedUser = await User.findOne({ email });
  if (existedUser)
    throw new ApiError(409, "User already exists with this name or email");

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  generateToken(res, user, `Welcome back, ${user.name}`);
});

const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, sameSite: "strict", secure: true })
    .json(new ApiResponse(200, {}, "Logged out Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

export { register, login, logout, getCurrentUser };
