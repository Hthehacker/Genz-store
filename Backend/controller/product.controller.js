import Product from "../models/product.model.js"
import cloudinary from "../config/cloudinary.config.js"
import Cart from "../models/Cart.model.js"


const createproduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body

        const existingProduct = await Product.findOne({
            name,
            createdBy: req.user.userid
        });

        if (existingProduct) return res.status(201).json({ message: 'product already exist! Use update' })

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
            }],

        })

        await product.save()

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({ error })
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
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, stock, price } = req.body
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json("Product not found")

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
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product)
            return res.status(404).json("Product not found ")

        if (req.user.userid !== product.createdBy.toString())
            return res.status(403).json("forbidden")

        await cloudinary.uploader.destroy(product.images[0].public_id)
        await Product.deleteOne(product)

        res.status(200).json("Product is successfully deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const searchProduct = async (req, res) => {
    try {
        const { search, limit, page, category, minprice, maxprice, sort } = req.query
        const filter = {}

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }
        if (category)
            filter.category = category
        if (minprice || maxprice) {
            filter.price = {}
            if (minprice) {
                filter.price.$gte = Number(minprice)
            }
            if (maxprice) {
                filter.price.$lte = Number(maxprice)
            }
        }

        const sortby = sort || -createdAt
        const currentpage = Number(page) || 1
        const perpage = Number(limit) || 10

        const skip = (currentpage - 1) * perpage

        const product = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(perpage)

        const totalProducts = await Product.countDocuments(filter);
        const totalpage = Math.ceil(totalProducts / perpage)
        if (product.length == 0)
            return res.status(200).json({
                product,
                totalProducts,
                totalpage,
                currentpage
            })

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export {
    createproduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct,
}