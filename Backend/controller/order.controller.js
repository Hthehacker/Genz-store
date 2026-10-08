import Product from "../models/product.model"
import Order from "../models/order.model"
import Cart from "../models/Cart.model"

const createOrder = async (req, res) => {
    const { productid, quantity, shippingAddress } = req.body

    const product = await Product.findById(productid)
const cartItem = Cart.findOne({
    user:req.user.userid
}).populate()
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    if (product.stock < quantity) {
        return res.status(400).json({
            message: "Insufficient stock"
        })
    }

    const priceAtBuy = product.price
    const totalAmount = quantity * priceAtBuy

    const orderItem = new Order({
        UserId: req.user.userid,
        items: [{
            productId: productid,
            quantity,
            priceAtBuy
        }],
        totalAmount,
        shippingAddress,

    })

    await orderItem.save()
   
    const productStock =await Product.findByIdAndUpdate(
            productid,
        {
            $inc:{
                stock:-quantity
            }
        }
    )


    res.status(200).json({
        message: "successfully placed your Order",
        orderItem
    })


}