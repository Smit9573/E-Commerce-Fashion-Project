const { cartModel, productModel } = require("../models/index.model")

const addCart = async (req, res) => {
    try {
        let user = req.user
        let { productId, quantity, colorId, sizeId } = req.body

        let product = await productModel.findOne({ _id: productId ,color: colorId, size:sizeId})
        if (!product) {
            return res.status(404).json({
                msg: "product not found error"
            })
        }

        let cart = await cartModel.findOne({ user: user._id})
        if (!cart) {
            cart = await cartModel.create({
                user: user._id,
            });
        }
        
         let AlradyCartProduct = await cartModel.findOne({_id:cart._id,"products.productId":productId})
         console.log("🚀 ~ addCart ~ AlradyCartProduct:", AlradyCartProduct)
       
         if (AlradyCartProduct) {
          cart =  await cartModel.updateOne({_id:cart._id,"products.productId":productId},{$set: {"products.$.quantity":quantity}}) 
          return res.status(200).json({
              msg: "cart add successfully",
              cart
          })
        }
        cart = await cartModel.findOneAndUpdate({ _id: cart._id }, { $push: { products: { productId: productId, quantity: quantity ,color : colorId,size : sizeId} } }, { new: true })

        return res.status(200).json({
            msg: "cart add successfully",
            cart
        })
    }
    catch (error) {
        console.log("add cart api err-->", error);
        return res.status(500).json({
            msg: "add cart api err"
        })
    }
}
const removeCart = async (req, res) => { 
  try {
    let user = req.user
    let { productId } = req.body
    let cart = await cartModel.findOne({ user: user._id })
    if (!cart) {
      return res.status(404).json({
        msg: "cart not found error"
      })
    }
    cart = await cartModel.findOneAndUpdate({ _id: cart._id,"products.productId" : productId}, { $pull: { products: { productId: productId } } }, { new: true })
    if (!cart) {
      return res.status(404).json({
        msg: "product not found error"
      })
    }
    return res.status(200).json({
      msg: "cart remove successfully",
      cart
    })
  }
  catch (error) {
    console.log("remove cart api err-->", error);
    return res.status(500).json({
      msg: "remove cart api err"
    })
  }
}
const getCart = async (req, res) => {
    try {
        let user = req.user
        let cart = await cartModel.findOne({ user: user._id })
        if (!cart) {
            return res.status(404).json({
                msg: "cart not found error"
            })
        }
        return res.status(200).json({
            msg: "cart get successfully",
            cart
        })
    }
    catch (error) {
        console.log("get cart api err-->", error);
        return res.status(500).json({
            msg: "get cart api err"
        })
    }
}

module.exports = {
    addCart,
    removeCart,
    getCart
}