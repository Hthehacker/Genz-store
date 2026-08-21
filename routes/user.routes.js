import {home,profile} from "../controller/user.controller.js"
import {
    createproduct,
    getAllProducts,
    getProductById,
    updateProduct,
    searchProduct,
    deleteProduct,
}
from "../controller/product.controller.js"
import upload from "../middleware/uploadfile.middleware.js"
import express from "express"
import { addToCart, updateCart ,removeCartItem } from "../controller/cart.controller.js"


const router = express.Router()

router.get("/home",home)
router.get("/profile",profile)
router.post("/createproduct",upload.single("image"),createproduct)
router.get("/getallproduct",getAllProducts)
router.get("/getproductbyid/:id",getProductById)
router.patch("/updateproduct/:id",upload.single("image"),updateProduct)
router.post("/deleteproduct",deleteProduct)
router.get("/searchproduct",searchProduct)
router.post("/addtocart",addToCart)
router.patch("/updatecart/:id",updateCart)
router.delete("/removecartitem/:id",removeCartItem)

export default router