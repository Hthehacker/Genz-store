import jwt from "jsonwebtoken"

const generateaccestoken = (user)=>{
    const token = jwt.sign(
        {userid:user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1h"}  

    )
    return token
}
const generaterefreshtoken = (user)=>{
    const token = jwt.sign(
        {userid:user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}  

    )
     return token
}

const generateresetpasstoken = (user)=>{
    const token = jwt.sign(
        {userid:user._id},
        process.env.PASS_RESET_SECRET,
        {expiresIn:"10m"}  
    )
    return token
}
export{
    generateaccestoken,
    generaterefreshtoken,
    generateresetpasstoken
}