const express = require("express")
const routs = express.Router()

const auth = require("../middleware/auth")
const { cartValidation,removeCartValidation} = require("../validation/addCart.velidation")
const { addCart, removeCart, getCart,} = require("../controllers/cart.controller")

//add cart api routes
routs.get('/get-cart',auth(["user"]),getCart)
routs.post('/add-cart',auth(["user"]),cartValidation,addCart)
routs.delete('/remove-cart',auth(["user"]),removeCartValidation,removeCart)


module.exports = routs  