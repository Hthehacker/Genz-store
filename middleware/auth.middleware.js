
import jwt from "jsonwebtoken"


const authmiddleware= (req,res,next)=>{
  try {
    const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
      
    if(!token) return res.status(401).json("Unauthorized loggin")
         
    const decodetoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    req.currentuser = decodetoken
    next();
  } catch (error) {
      res.status(400).json({message:error.message})
   }
}

export{
    authmiddleware
}