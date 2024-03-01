import { asyncHandller } from "../utils/asyncHandller.js";
import { error,success } from "../utils/responseWrapper.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const generateAccessTokenAndRefreshToken=asyncHandller(async(_id)=>{
    const user=await User.findById(_id)

    const accessToken=await user.generateAccessToken()
    const refreshToken=await user.generateRefreshToken()

    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return {
        accessToken,refreshToken
    }
})

export const registerUser=asyncHandller(async(req,res)=>{
    const{userName,fullName,email,password}=req.body    
    //validation
    if(!userName||!fullName||!email||!password){
        res.status(200).json(error(400,"Credentials are missing"))
    }      

    //if user already exists 

    const existingUser=await User.findOne({
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

    res.status(200).json(success(200,returnUser))
})

export const loginUser=asyncHandller(async(req,res)=>{
    const{email,userName,password}=req.body

    if(!email||!userName) res.status(200).json(error(400,"fill all the credentials"))

    const user=await User.findOne({
        $or:[{email} , {userName}]
    })

    if(!user) res.status(200).json(error(400,"User doesn't fonud"))

    const isPasswordValid=await user.isPasswordCorrect(password)

    if(!isPasswordValid) res.status(200).json(error(400,"Password invalid"))

    const{accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user._id)

    const loggedinUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }

    res.status(200)
    .cookies("accessToken",accessToken,options)
    .cookies("refreshToken",refreshToken,options)
    .json(success(200,loggedinUser))
})

export const logoutUser=async(req,res)=>{
    const{_id}=req.body
    await User.findByIdAndUpdate(_id,{
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    })
    const options={
        httpOnly:true,
        secure:true
    }
    res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(success(200,"User has been logged out."))
}