import mongoose from "mongoose";
import { dbName } from "../constants.js";

 const connectDb=async()=>{

        mongoose.connection.once('open',()=>console.log("Database connected"))
        mongoose.connection.on('error',(err)=>console.log(`Database err: ${err}`))

        await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
}

export default connectDb