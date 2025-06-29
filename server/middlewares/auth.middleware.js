import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting Bearer token

  if (!token) {
    return next(new ApiError(401, "Unauthorized: Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized: User not found"));
    }
    next();
  } catch (error) {
    return next(new ApiError(401, "Unauthorized: Invalid token"));
  }
};
