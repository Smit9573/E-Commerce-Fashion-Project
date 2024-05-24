
const { productModel, subcategoryModel, categoryModel, colorModel, sizeModel, wishlistModel } = require("../models/index.model")

//filter products
const getProductByUser= async(req,res)=>{
 try {
  let {categoryId,subcategoryId,colorId,sizeId,priceRange}=req.body
  const filter = {
    status : "Active"
  };

  if (sizeId) filter.size = sizeId;
  if (colorId) filter.color = colorId;
  if (categoryId) filter.category = categoryId;
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-');
    filter.price = { $gte: minPrice, $lte: maxPrice };
}

   let products =  await productModel.find(filter)
   
   return res.status(200).json({
    msg : "All Products",
    products 
   })
 } catch (error) {
    console.log("Product Filter  api err -->", error);
    return res.status(500).json({
        msg: "Product filter api faild",
        error
    })
 }
}

module.exports={
    getProductByUser
}