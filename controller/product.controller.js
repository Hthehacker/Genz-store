import express from "express"
import Product from "../models/product.model.js"
import cloudinary from "../config/cloudinary.config.js"

const createproduct =async  (req,res)=>{
    try {
        const {name,description,price,stock}  = req.body

            const existingProduct = await Product.findOne({
                name,
                createdBy: req.user.userId
            });

            if(existingProduct) return res.json({message:'product already exist! Please use update to update your stocks'})
    
        let imageUrl = ""
    
        const result = await cloudinary.uploader.upload(req.file.path)
    
        imageUrl = result.secure_url
    
        const product = new Product({
            name,
            description,
            price,
            stock,
            createdBy:req.User.userid,
            images:[{
                url:imageUrl,
                public_id:result.public_id
            }]
        })        
    
        await product.save()
    
        res.json(product)
    } catch (error) {
        res.json({error})
    }
}

export{
    createproduct
}