
const { productModel, subcategoryModel, categoryModel, colorModel, sizeModel, wishlistModel } = require("../models/index.model")
//get category
const getCategory = async (req, res) => {
    try {
        const allCategory = await categoryModel.find({}).populate("subcategory")
        return res.status(200).json({
            allCategory
        })
    } catch (error) {
        console.log("get category api err-->", error);
        return res.status(500).json({
            msg: "get category api faild errror",
            error
        })
    }

}
const getSubCategory = async (req, res) => {
    try {
        const allSubCategory = await subcategoryModel.find({})
        return res.status(200).json({
            allSubCategory
        })
    } catch (error) {
        console.log("get subcategory api err-->", error);
        return res.status(500).json({
            msg: "get subcategory api faild errror",
            error
        })
    }

}
const getAllColor = async (req, res) => {
    try {
        const allColor = await colorModel.find({})
        return res.status(200).json({
            allColor
        })
    } catch (error) {
        console.log("get all color api err-->", error);
        return res.status(500).json({
            msg: "get all color api faild errror",
            error
        })
    }

}
const getAllSize = async (req, res) => {
    try {
        const allSize = await sizeModel.find({})
        return res.status(200).json({
            allSize
        })
    } catch (error) {
        console.log("get all size api err-->", error);
        return res.status(500).json({
            msg: "get all size api faild errror",
            error
        })
    }

}
//add Product - vendor 
const addNewProduct = async (req, res) => {
    try {
        let { name, price, category, subcategory, discount, discription, color, size, stock, tag} = req.body
        const vendor = req.user._id
        const images = req.files.product
        //images velidation
        if (!images) {
            return res.status(400).json({
                msg: "Product photo is Required "
            })
        }
        //get images path
        let imagePath = []
        for (const image of images) {
            imagePath.push(image.fieldname + "/" + image.filename)
        }
        let categoryId = await categoryModel.findById({ _id: category })
        console.log("🚀 ~ addNewProduct ~ categoryId:", categoryId)
        if (!categoryId) {
            return res.status(400).json({
                msg: "Plz rigth Choose categoryId"
            })
        }
        let subCategoryId = await subcategoryModel.findOne({ _id: subcategory })
        console.log("🚀 ~ addNewProduct ~ subCategoryId:", subCategoryId)
        if (!subCategoryId) {
            return res.status(400).json({
                msg: "Plz rigth Choose subCategory"
            })
        }
        let sizeId = await sizeModel.findOne({ _id: size })
        console.log("🚀 ~ addNewProduct ~ sizeId:", sizeId)
        if (!sizeId) {
            return res.status(400).json({
                msg: "Plz rigth Choose Size"
            })
        }
        let colorId = await colorModel.findOne({ _id: color })
        console.log("🚀 ~ addNewProduct ~ colorId:", colorId)
        if (!colorId) {
            return res.status(400).json({
                msg: "Plz rigth Choose Color"
            })
        }


        categoryId = categoryId._id
        subCategoryId = subCategoryId._id
        colorId = colorId._id
        sizeId = sizeId._id

        const newProduct = await productModel.create({ name: name, vendor: vendor, price: price, images: imagePath, discount: discount, tag: tag, discription: discription, category: categoryId, subcategory: subCategoryId, color: colorId, size: sizeId })

        return res.status(200).json({
            msg: "product listing successful",
            newProduct
        })
    } catch (error) {
        console.log("Add New Product api err-->", error);
        return res.status(500).json({
            msg: "Add New Product api faild errror",
            error
        })
    }
}
//add wishlist
const addWishlist = async(req,res)=>{
    try {
        const user = req.user
        const product = await productModel.findById({_id : req.body.product})
        if (!product) {
            return res.status(404).json({
                msg : "product not found"
            })
        }
        const wishlist = await wishlistModel.create({
            user : user._id,
            product: product._id
        })
    
        return res.status(200).json({
            msg :  "add wishlist product",
            wishlist 
        }) 
    } catch (error) {
        console.log("Add wishlist api err-->", error);
        return res.status(500).json({
            msg: "Add wishlist api faild errror",
            error
        })
    }

}

module.exports = {
    addNewProduct,
    getCategory,
    getSubCategory,
    getAllColor,
    getAllSize,
    addWishlist
}