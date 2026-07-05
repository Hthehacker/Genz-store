import Product from "../models/product.model.js"
import cloudinary from "../config/cloudinary.config.js"

const createproduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body

        const existingProduct = await Product.findOne({
            name,
            createdBy: req.user.userId
        });

        if (existingProduct) return res.json({ message: 'product already exist! Please use update to update your stocks' })

        let imageUrl = ""

        const result = await cloudinary.uploader.upload(req.file.path)

        imageUrl = await result.secure_url

        const product = new Product({
            name,
            description,
            price,
            stock,
            createdBy: req.user.userid,
            images: [{
                url: imageUrl,
                public_id: result.public_id
            }]
        })

        await product.save()

        res.json(product)
    } catch (error) {
        res.json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        res.status(200).json(products)
    }
    catch (error) {
        res.status(400).json({ error })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({
            message: "Invalid product Id"
        })
    }
}

const updateProduct = async (req, res) => {
    const { name, description, stock, price } = req.body
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(500).json("Product not found")

    else {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;// here || define zero as null and falsy value
        product.stock = stock ?? product.stock;//Here ?? tells that if you want to zero your stocks then it works for zero 
    }

    if (req.file) {
        await cloudinary.uploader.destroy(product.images[0].public_id)
        const result = await cloudinary.uploader.upload(req.file.path)
        product.images = result.secure_url
    }
    const updatedproduct = await product.save()
    res.status(200).json(updatedproduct)
}

const deleteProduct = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product)
            return res.status(401).json("Product not found ")
            if(req.user.userid!==product.createdBy.toString())
                return res.status(403).json("forbidden")
        await cloudinary.uploader.destroy(product.images[0].public_id)
        await Product.deleteOne(product)
    
        res.status(200).json("Product is successfully deleted")
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

const searchProduct =async(req,res) => {
    const {search,limit,page,category} = req.query
    const filter = {}
    
}
export {
    createproduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct
}