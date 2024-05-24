const Joi = require("joi")
const validate = require("../middleware/validate") 

const addCart = Joi.object({
    productId : Joi.string().required(),
    quantity : Joi.number().min(1).default(1),
    sizeId : Joi.string().required(),
    colorId : Joi.string().required()
})

const removeCart = Joi.object({
    productId : Joi.string().required(),
})

module.exports = {
    cartValidation : validate(addCart),
    removeCartValidation : validate(removeCart)
}