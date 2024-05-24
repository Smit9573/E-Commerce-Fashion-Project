const Joi = require("joi")

const validate = require("../middleware/validate")

const sendOtp = Joi.object({
    email : Joi.string().email().required()
})
const varified = Joi.object({
    email : Joi.string().email().required(),
    otp : Joi.number().required()
})

module.exports = {
    sendOtpvalidation : validate(sendOtp),
    varifiedvalidation : validate(varified)

}