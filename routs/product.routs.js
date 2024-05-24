const express = require("express")
const routs = express.Router()

const auth = require("../middleware/auth")
const { upload } = require("../untils/index")

const { categoryValidation, subcateValidation, colorValidation, sizeValidation, activeProductValidation } = require("../validation/admin.details.velidation")
const { NewproductValidation, addWishlishValidation } = require("../validation/productSchema.velidation")

const { addNewProduct, getCategory, getSubCategory, getAllColor, getAllSize, addWishlist } = require("../controllers/product.controller")
const { addCategory, addSubCategory, addSize, addColor, GetinActiveProduct, GetactiveProduct, activeProduct } = require("../controllers/admin.details")
const { getProductByUser } = require("../controllers/productFilter")
const { getProductByUserVelidation } = require("../validation/productFilterVelidation")

//admin add category 
routs.get('/get-allproduct-inactive', auth(["admin"]), GetinActiveProduct)
routs.get('/get-allproduct-active', auth(["admin"]), GetactiveProduct)

routs.get('/allCategory', getCategory)
routs.get('/allSubCategory', getSubCategory)
routs.get('/allColor', getAllColor)
routs.get('/allSize', getAllSize)

//filter Product
routs.get('/get-products', getProductByUserVelidation, getProductByUser)

routs.post('/product-active', auth(["admin"]), activeProductValidation, activeProduct)
routs.post('/add-category', auth(["admin"]), categoryValidation, addCategory)
routs.post('/add-subcategory', auth(["admin"]), subcateValidation, addSubCategory)
routs.post('/add-color', auth(["admin"]), colorValidation, addColor)
routs.post('/add-size', auth(["admin"]), sizeValidation, addSize),
routs.post('/add-wishlist', auth(["user"], addWishlishValidation, addWishlist))

//add product by vendor only
routs.post('/add-product', upload.fields([{ name: "product", maxCount: 4 }]), NewproductValidation, auth(["vendor"]), addNewProduct)

module.exports = routs