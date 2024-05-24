const Joi = require("joi")
const validate = require("../middleware/validate")

// add product validation
const addProduct = Joi.object({
    name : Joi.string().required(),
    price : Joi.number().min(0).required(),
    category : Joi.string().required(),
    subcategory : Joi.string().required(),
    discount : Joi.number().min(0),
    discription : Joi.string(),
    color : Joi.string().required(),
    size : Joi.string().required(),
    tag : Joi.string()
})
//add wishlist
const addWishlish = Joi.object({
    product : Joi.string().required()
})



module.exports = {
    NewproductValidation : validate(addProduct),
    addWishlishValidation : validate(addWishlish)
}