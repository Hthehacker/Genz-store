import {generateaccestoken,generaterefreshtoken,generateresetpasstoken} from "../utils/token.js"
import bcrypt from "bcrypt";
import User from "../models/user.model.js"
import mail from "nodemailer"
import {sendOtpEmail} from "../service/emailsend.js"
import jwt from "jsonwebtoken"

const login = async(req,res)=>{
    const {userName,Password} = req.body
    try {
        if(!userName||!Password) 
            return res.status(401).json({Message:"Username and password are required"})

        const user = await User.findOne({ userName });

        if(!user)
            return res.status(400).json({Message:"Username or Password are invalid"})

        const ismatch = await bcrypt.compare(Password,user.Password)
            if(!ismatch)
                 return res.status(401).json({Message:"Invalid username or password"})

    
        const accesstoken = generateaccestoken(user)
        const refreshtoken = generaterefreshtoken(user)

        user.RefreshToken = refreshtoken
        await user.save()

        const option ={
            httpOnly : true,
            secure : true 
        }

        res.status(200)
            .cookie("accesstoken",accesstoken,option)
            .cookie("refreshtoken",refreshtoken,option)
            .json("User logged in sucesfully")

        
        
    } catch (error) {
        res.status(401).json({Message:error.message})
    }
    
}

const register = async (req,res)=>{
    try {
        if (!req.body) {
            return res.status(400).json({
            message: "Request body is required"
            });
        }
        const {userName,Email,Password}= req.body
         if(!userName||!Password||!Email) 
            return res.status(401).json({Message:"Username or password are required"})
        const hashedPassword = await bcrypt.hash(Password,10)
    
        const user = await User.create({
            userName,
            Email,
            Password:hashedPassword
        })
        
        res.json(user)
        
    } catch (error) {
        res.status(401).json({Message:error})
    }


}

const forgetpassword = async (req,res)=>{
    const {Email} = req.body

    const currentuser =await  User.findOne({Email})
     if(!currentuser) return res.status(400).json("user not found.")

    const otp = Math.floor(100000 + Math.random() * 900000);

    const hashotp = await bcrypt.hash(String(otp),10)

    currentuser.Otp = hashotp
    currentuser.OtpExpire = Date.now() + 10 * 60 * 1000;

    await currentuser.save()   

    await sendOtpEmail(Email,otp)

    
    res.status(200).json("OTP successfully sent.")

}

const verifyOtp = async (req,res)=>{
    const {Otp,Email} = req.body
    const currentuser = await User.findOne({Email})

    if(!currentuser) return res.status(401).json("error")

    const istrue = await bcrypt.compare(Otp,currentuser.Otp)

        if(!istrue) return res.status(400).json({message:"Otp is invalid"})

    if (Date.now() > currentuser.OtpExpire) {
        return res.status(400).json({
            message: "OTP Expired"
        });

    }
    const token = generateresetpasstoken(currentuser)
    const option ={
            httpOnly : true,
            secure : true 
        }
        currentuser.Otp = undefined;
        currentuser.OtpExpire = undefined;
        
        await currentuser.save();
        res.cookie("Token",token,option)
            .json("Otp verified successfully ")
    
}

const resetPassword = async (req,res)=>{
    const {Token} = req.cookies
        if (!Token) {
            return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decodeuser = jwt.verify(Token,process.env.PASS_RESET_SECRET)

    const {Password} = req.body
        if (!Password) {
            return res.status(400).json({
            message: "Password is required"
        });
    }

    const newhashpassword =await bcrypt.hash(Password,10)

    const user = await User.findById(decodeuser.userid)
        if (!user) {
            return res.status(404).json({
            message: "User not found"
        });
    }
    user.Password = newhashpassword
    await user.save()
    res.clearCookie("Token");

    res.status(200).json("Password is successfully changed")


}
export{
    register,
    login,
    forgetpassword,
    verifyOtp,
    resetPassword

}