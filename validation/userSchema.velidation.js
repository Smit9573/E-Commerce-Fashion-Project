const Joi = require("joi")
const validate = require("../middleware/validate") 
//already user cheak velidaton
const alreadyuser = Joi.object({
    email : Joi.string().email().required(),
})
//singup veliditon
const singup = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    username : Joi.string().required(),
    otp : Joi.number().required(),
    role : Joi.string().valid("user","admin","vendor").required(),
    phonenumber : Joi.number().required()
})
//login velidation
const loginvelidation = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().required()
})
//change password validation
const changePass = Joi.object({
    oldPassword : Joi.string().required(),
    newPassword : Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$')).required(),

})
//forget password validation
const forgetPassword = Joi.object({
    email :  Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    otp : Joi.number().required(),
    newPassword : Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$')).required(),
})//add address validation
const addAddress =Joi.object({
    homeNo : Joi.string(),
    city : Joi.string().required(),
    village : Joi.string().required(),
    state:Joi.string().required(),
    dist:Joi.string().required(),
    country:Joi.string().required(),
    pinCode :Joi.number().required(),
    phone :Joi.number().required(),
    fullAddress :Joi.string(),
    defaultAddress : Joi.boolean().valid(true,false).default(false)

})
//profile upadate
const profileUpdate  = Joi.object({
    profile : Joi.string(),
    phoneNumber : Joi.number(),
    username : Joi.string()
})
module.exports = {
    alreadyuserValidaton : validate(alreadyuser),
    singupValidation : validate(singup),
    loginvelidation : validate(loginvelidation),
    changePassValidation : validate(changePass),
    forgetPasswordValidation : validate(forgetPassword),
    profileUpdateValidation : validate(profileUpdate),
    addAddressValidation:validate(addAddress)
}