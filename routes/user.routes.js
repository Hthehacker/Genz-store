import {home,profile} from "../controller/user.controller.js"
import {createproduct} from "../controller/product.controller.js"
import upload from "../middleware/uploadfile.middleware.js"
import express from "express"

const router = express.Router()

router.get("/home",home)
router.get("/profile",profile)
router.post("/createproduct",upload.single("image"),createproduct)

export default router