import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({path:'.'});
import connectDb from './db/dbConnect.js'
dotenv.config({
    path: './.env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})  