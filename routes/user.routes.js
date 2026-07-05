import {home,profile} from "../controller/user.controller.js"
import {createproduct,getAllProducts,getProductById,updateProduct,searchProduct,deleteProduct} from "../controller/product.controller.js"
import upload from "../middleware/uploadfile.middleware.js"
import express from "express"
import { get } from "mongoose"

const router = express.Router()

router.get("/home",home)
router.get("/profile",profile)
router.post("/createproduct",upload.single("image"),createproduct)
router.get("/getallproduct",getAllProducts)
router.get("/getproductbyid/:id",getProductById)
router.patch("/updateproduct/:id",upload.single("image"),updateProduct)
router.post("/deleteproduct",deleteProduct)
router.get("/searchproduct",searchProduct)

export default router