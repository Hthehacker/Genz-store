import {home,profile} from "../controller/user.controller.js"
import express from "express"

const router = express.Router()

router.get("/home",home)
router.get("/profile",profile)

export default router