import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
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

export default userRouter