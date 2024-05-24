const express = require("express")
const routs = express.Router()

const otpController =  require("../controllers/otp.controller")
const {sendOtpvalidation,varifiedvalidation}=require("../validation/otpSchema.velidation")

//otp gen
routs.post('/send-otp',sendOtpvalidation,otpController.sendOtp)
routs.post('/verified',varifiedvalidation,otpController.verified)


module.exports = routs