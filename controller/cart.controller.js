import Cart from "../models/Cart.model.js"
import Product from "../models/product.model.js"

const addToCart = async (req, res) => {
    try {
        const { ProductId, Quantity = 1 } = req.body
        const product = await Product.findById(ProductId)
        if (!product) {
            return res.status(404).json("Product Not found ")
        }

        //here FIND METHOD ALWAYS RETURN ARRAY [{}] AND IN JS EM[TY ARRAY ALWAYS TRUTHY HOTA HAI ]

        const cartproduct = await Cart.findOne({ ProductId, UserId: req.user.userid })

        if (!cartproduct) {

            if (product.stock < Quantity) {
                return res.json("Out of stocks")
            }

            const cartdata = new Cart(
                {
                    UserId: req.user.userid,
                    ProductId,
                    Quantity
                }
            )
            await cartdata.save()
            return res.status(201).json(cartdata)
        }
        else {
            if (product) {
                if (product.stock < Quantity + cartproduct.Quantity) {
                    return res.json("Out of stocks")
                }
            }
            const updatedCart = await Cart.findOneAndUpdate(
                {
                    UserId: req.user.userid,
                    ProductId
                },
                {
                    $inc: {
                        Quantity
                    }
                },
                {
                   returnDocument: "after"
                }
            )

            return res.status(200).json(updatedCart)
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const updateCart = async (req,res) =>{
    const ProductId = req.params.id
    const {Quantity} = req.body

    if(Quantity<0)
        return res.status(403).json("validation error")

    const updatedCart = await Cart.findOneAndUpdate({ProductId,UserId:req.user.userid},{
        $inc:{
            Quantity
        }
    })
    if(!updatedCart){
        return res.status(404).json("Product not found")
    }
    return res.status(200).json(updatedCart);

}


const removeCartItem = async (req, res) => {
    try {
        const ProductId = req.params.id;

        const deletedCart = await Cart.findOneAndDelete({
            ProductId,
            UserId: req.user.userid
        });

        if (!deletedCart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        return res.status(200).json({
            message: "Cart item removed successfully",
            cartItem: deletedCart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

export{
    addToCart,
    updateCart,
    removeCartItem
}