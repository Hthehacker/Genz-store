import "dotenv/config";
import express from "express"
const app = express();
import mongoose from "mongoose";
import authroutes from "./routes/auth.routes.js"
import userroutes from "./routes/user.routes.js"
import {authmiddleware} from "./middleware/auth.middleware.js"
import cookieParser from "cookie-parser";
import connectdb from "./config/database.config.js"


connectdb()


app.use(express.json());
app.use(cookieParser())


app.use("/api/auth/",authroutes)
app.use("/api/user",authmiddleware,userroutes)


app.listen(process.env.PORT,()=>{
    console.log("app is running on port 3001");
    
})






