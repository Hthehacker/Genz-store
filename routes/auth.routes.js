import express from "express"
const router = express.Router()
import {authmiddleware} from "../middleware/auth.middleware.js"
import{ register,login,forgetpassword,verifyOtp,resetPassword,refreshtoken,logout} from "../controller/auth.controller.js"

router.post("/signup",register)
router.post("/login",login)
router.post("/logout",authmiddleware,logout)
router.post("/refreshtoken",refreshtoken)
router.post("/forgetpassword",forgetpassword)
router.post("/verifyOtp",verifyOtp)
router.post("/resetPassword",resetPassword)

export default router