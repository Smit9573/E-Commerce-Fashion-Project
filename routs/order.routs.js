const express = require("express")
const routs = express.Router()

const auth = require("../middleware/auth")
const { orderProduct } = require("../controllers/oder.controller")

routs.post("/put-order",auth(["user"]),orderProduct)


module.exports = routs  