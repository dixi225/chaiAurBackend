import { asyncHandller } from "../utils/asyncHandller.js";
import { error,success } from "../utils/responseWrapper.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


export const registerUser=asyncHandller(async(req,res)=>{
    const{userName,fullName,email,password}=req.body    
    //validation
    if(!userName||!fullName||!email||!password){
        res.status(200).json(error(400,"Credentials are missing"))
    }      

    //if user already exists 

    const existingUser=User.findOne({
        $or:[ { userName },{ email }]
    })

    if(existingUser) res.status(200).json(error(400," User already exists"))

    const avatarLocalFilePath=req.files?.avatar[0].path
    if(avatarLocalFilePath) res.status(200).json(error(400,"Avatar file missing"))

    const coverImageLocalFilePath=req.files?.cover[0].path

    const avatar=await uploadOnCloudinary(avatarLocalFilePath)
    if(!avatar) res.status(200).json(error(400,"uploading of avatar file failed"))
    const cover= await uploadOnCloudinary(coverImageLocalFilePath)

    //creating user object

    const user=await User.create({
        fullName,
        avatar:avatar.url,
        cover:cover?.url||"",
        userName:userName.toLowerCase(),
        email,
        password,
    })

    const returnUser=User.findById(user._id).select("-password -refreshToken")

    if(!returnUser) res.status(200).json(error(500,"Server Error"))

    res.status(200).json(success(returnUser))
})