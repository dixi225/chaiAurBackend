import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, incomingRefreshToken, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { requireLogin } from "../middlewares/auth.middleware.js";

const userRouter=Router()

userRouter.post('/register',upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"cover",
        maxCount:1
    }
]),registerUser)

userRouter.post('/login',loginUser)
userRouter.get('/logout',requireLogin,logoutUser)
userRouter.post('/refreshToken',incomingRefreshToken)
userRouter.post('/password',requireLogin,changeCurrentPassword)
userRouter.get('/currentUser',requireLogin,getCurrentUser)
export default userRouter