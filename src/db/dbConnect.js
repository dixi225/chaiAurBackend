import mongoose from "mongoose";
import { dbName } from "../constants.js";

export const connectDb=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log('Database conected');
    }catch(error){
        // throw error
        console.log(error);
        process.exit(1)
    }
}

