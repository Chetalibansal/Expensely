import jwt from "jsonwebtoken";
import { ApiResponse } from "./ApiResponse.js";

const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  return res
  .status(200)
  .cookie("token", token, {
    httpOnly:true,
    sameSite: "strict",
    secure: true
  })
  .json(new ApiResponse(200, user, message))
};

export {generateToken}