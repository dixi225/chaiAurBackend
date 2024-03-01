import { error } from "../utils/responseWrapper.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const requireLogin=async(req,res,next)=>{
    try {
        const{accessToken,refreshToken}=req.cookies

        if(!accessToken){
            accessToken=req.header("Aurthorization").replace("Bearer","")
        }
    
        if(!accessToken) res.status(200).json(error(400,"access token missing"))
    
        const decoded= jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decoded?._id)
    
        if(!user) res.status(200).json(error(400,"Invalid Access Token"))
    
        req._id=decoded._id
    
        next();
    }catch (err) {
    res.status(200).json(error(400,"Something went wrong in database"))
    }

}