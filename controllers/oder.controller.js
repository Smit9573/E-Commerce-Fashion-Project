const { productModel, orderModel, cartModel, userModel, addressModel } = require("../models/index.model")


const orderProduct =  async (req,res) => {
    try {
        const user  =  req.user

        let cart = await cartModel.findOne({user : user._id}).populate("products.productId")
        
        if(cart.products.length <= 0){
            return res.status(404).json({
                msg: "cart is empty",
            })
        }
        
        let totalPrice = 0
        for (const i of cart.products) {
            let price = i.productId.price * i.quantity
            price -= (i.productId.discount * price)/100;
            price = price.toFixed(2)
            totalPrice += Number(price)
            await userModel.findOneAndUpdate({_id: i.productId.vendor},{$push : {orders :{productId : i.productId._id,quantity : i.quantity}}})
        }

        const address = await addressModel.findOne({user : user._id,defaultAddress : true})
  
        const order = await orderModel.create({user : user._id,address : address,totalBill : totalPrice,products : cart.products})

        await cartModel.findOneAndUpdate({_id : cart._id},{$set : {products : []}})

        return res.status(200).json({
            msg: "order product successfully",
            order
        })
      
    } catch (error) {
        
    }
}

module.exports ={
    orderProduct
}