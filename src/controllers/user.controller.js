import { asyncHandller } from "../utils/asyncHandller.js";

export const registerUser=asyncHandller(async(req,res)=>{
    res.status(200).json({
        messege:"ok"
    })
})