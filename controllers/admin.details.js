
const { colorModel, sizeModel, subcategoryModel, categoryModel, productModel, userModel } = require("../models/index.model")
//active seller Account bu admin
const activeAccount = async (req, res) => {
    try {
        let { id } = req.body
        let activeAccount  = await userModel.findOneAndUpdate({_id : id},{$set : {isActive:true}},{new : true})
        return res.status(200).json({
            msg :"vendor Account Active successfully",
            user : activeAccount.email
        })

    } catch (error) {
        console.log("activeAccount seller api err-->", error);
        return res.status(500).json({
            msg: "activeAccount seller api err-->",
            error
        })
    }
}
//delete user & vendor account only isActive = false
const deActiveAccount = async (req,res)=>{
    try {
        let { id } = req.body
        let activeAccount  = await userModel.findOneAndUpdate({_id : id},{$set : {isActive:false}},{new : true})
        return res.status(200).json({
            msg :"deactiveAccount",
            user : activeAccount.email
        })
    } catch (error) {
        console.log("deActiveAccount  api err-->", error);
        return res.status(500).json({
            msg: "deActiveAccount api err-->",
            error
        }) 
    }
}
//add category -admin
const addCategory = async (req, res) => {
    try {
        let { name } = req.body
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        let newcategory = await categoryModel.findOne({ name: name })
        if (newcategory) {
            return res.status(403).json({
                msg: `Already ${name} Category Added`
            })
        }
        newcategory = await categoryModel.create({ name: name })
        return res.status(200).json({
            msg: `Add New Category ${name}`
        })
    } catch (error) {
        console.log("addcategoryModel api err-->", error);
        return res.status(500).json({
            msg: "addcategoryModel api faild errror",
            error
        })
    }
}
//add sub category -admin
const addSubCategory = async (req, res) => {
    try {
        let { name, categoryId } = req.body
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        newSubCategory = new subcategoryModel({ name: name })

        let categorySet = await categoryModel.findOneAndUpdate({ _id: categoryId }, { $set: { subcategory: newSubCategory._id } }, { new: true }).lean()
        if (!categorySet) {
            return res.status(404).json({
                msg: `category ${categoryName} Name is not found`
            })
        }
        await newSubCategory.save()

        return res.status(200).json({
            msg: `Add New SubCategory ${name}`,
        })
    } catch (error) {
        console.log("addSubcategoryModel api err-->", error);
        return res.status(500).json({
            msg: "addSubcategoryModel api faild errror",
            error
        })
    }
}
//add color
const addColor = async (req, res) => {
    try {
        let { name } = req.body
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        let AlreadyColor = await colorModel.findOne({ name: name })
        if (!AlreadyColor) {
            return res.status(403).json({
                msg: `this ${name} color Already added `
            })
        }
        await colorModel.create({ name: name })
        return res.status(200).json({
            msg: `Add New color ${name}`
        })
    } catch (error) {
        return res.status(500).json({
            msg: "add color api faild errror",
            error
        })
    }
}
//add size - admin
const addSize = async (req, res) => {
    try {
        let { name } = req.body
        name = name.toUpperCase()
        let AlreadySize = await sizeModel.findOne({ name: name })
        if (!AlreadySize) {
            return res.status(403).json({
                msg: `this ${name} Size Already added `
            })
        }
        await sizeModel.create({ name: name })
        return res.status(200).json({
            msg: `Add New Size ${name}`
        })
    } catch (error) {
        return res.status(500).json({
            msg: "add size api faild errror",
            error
        })
    }
}
// product approval -admin
const GetinActiveProduct = async (req, res) => {
    try {
        const InactiveProducts = await productModel.find({ status: "Inactive" })
        return res.status(200).json({
            msg: "Inactive All Product",
            InactiveProducts
        })
    } catch (error) {
        console.log("inactive product -admin --> err", error);
        return res.status(500).json({
            msg: "inactive product -admin -->  errror",
            error
        })
    }
}
//get all activeProduct
const GetactiveProduct = async (req, res) => {
    try {
        const activeProducts = await productModel.find({ status: "active" })
        return res.status(200).json({
            msg: "Inactive All Product",
            activeProducts
        })

    } catch (error) {
        console.log("Get active product -admin --> err", error);
        return res.status(500).json({
            msg: "get active product -admin -->  errror",
            error
        })
    }
}//active product
const activeProduct = async (req, res) => {
    try {
        let { productId } = req.body
        const activeProducts = await productModel.findOneAndUpdate({ _id: productId, status: "Inactive" }, { $set: { status: "Active" } },     // update object
            { new: true })
        if (!activeProducts) {
            return res.status(404).json({
                msg: "Product is Not found"
            })
        }
        return res.status(200).json({
            msg: "active Product ",
            activeProducts
        })

    } catch (error) {
        console.log("active product -admin --> err", error);
        return res.status(500).json({
            msg: "active product -admin -->  errror",
            error
        })
    }
}
module.exports = {
    addSubCategory,
    addCategory,
    addSize,
    addColor,
    GetinActiveProduct,
    GetactiveProduct,
    activeProduct,
    activeAccount,
    deActiveAccount
}