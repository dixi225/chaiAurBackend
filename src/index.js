import dotenv from 'dotenv';
dotenv.config({path:'.'});
import { connectDb } from './db/dbConnect.js'
dotenv.config({
    path: './env'
})


connectDb()