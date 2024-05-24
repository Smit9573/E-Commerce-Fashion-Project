const express = require("express")
const routs = express.Router()

const otp =  require("./otp.user")
const user = require("./user.routs")
const products = require("./product.routs")
const cart = require("./cart.routs")
const order = require("./order.routs")


routs.use('/otp',otp)
routs.use('/user',user)
routs.use('/products',products)
routs.use('/cart',cart)
routs.use('/order',order)




module.exports = routs