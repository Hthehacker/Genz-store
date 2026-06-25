
const home = (req,res)=>{
    res.send("home page")
}

const profile = (req,res)=>{
    res.send("Profile page")
}

export{
    home,
    profile
}