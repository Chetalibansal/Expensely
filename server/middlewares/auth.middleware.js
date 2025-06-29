import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";

const auth = asyncHandler(async(req, _, next)=>{
    try{
        const token = req.cookies?.token;
        
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
         const user = await User.findById(decode?._id).select("-password")

        if(!user)
        {
            throw new ApiError(401, "Invalid Token")
        }
        req.user = user
        next()
    }catch(err){
        throw new ApiError(401, err?.message || "Invalid Token")
    }
})

export default auth;