import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,

    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    RefreshToken:{
        type:String
    },
    Otp:{
        type:String
    },
    OtpExpire:{
        type:String
    }
},{timestamps:true})

const model = mongoose.model("User",userschema)

export default model