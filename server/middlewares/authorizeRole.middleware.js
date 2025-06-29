import { ApiResponse } from "../utils/ApiResponse.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
      .status(403)
      .json(new ApiResponse(403, {}, `Access denied for role: ${req.user.role}`))
    }
    next();
  };
};
