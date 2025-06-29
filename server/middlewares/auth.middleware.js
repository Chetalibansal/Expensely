import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";

const auth = asyncHandler(async (req, _, next) => {
  try {
    let token;

    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode?.id || decode?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid Token");
  }
});
export default auth;