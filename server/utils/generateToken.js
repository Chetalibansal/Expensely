import jwt from 'jsonwebtoken';
import { ApiResponse } from './ApiResponse.js';

export const generateToken = (res, user, message = "Login success") => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );

  // Optional: Set token in cookie (for browser-based clients)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  // Return token in response for Thunder Client or frontend use
  return res.status(200).json(new ApiResponse(200, {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    token: token
  }, message));
};
