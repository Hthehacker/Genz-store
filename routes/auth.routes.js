import express from "express"
const router = express.Router()
import{ register,login,forgetpassword,verifyOtp,resetPassword } from "../controller/auth.controller.js"

router.post("/signup",register)
router.post("/login",login)
router.post("/forgetpassword",forgetpassword)
router.post("/verifyOtp",verifyOtp)
router.post("/resetPassword",resetPassword)

export default router