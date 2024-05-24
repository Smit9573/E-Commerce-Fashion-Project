const Joi = require("joi")
const validate = require("../middleware/validate")
// add category shema- admin
const category = Joi.object({
    name : Joi.string().required()
})

const subcategory = Joi.object({
    name : Joi.string().required(),
    categoryId : Joi.string().required()
})

const color = Joi.object({
    name : Joi.string().required()
})
const size = Joi.object({
    name : Joi.string().required()
})
const activeProduct = Joi.object({
    productId : Joi.string().required()
})
//active-accont vendor - admin
const activeAccount = Joi.object({
   id : Joi.string().required() 
})
//deactiveAccount -user&vendor
const deactiveAccount = Joi.object({
    id : Joi.string().required() 
})
module.exports = {
    subcateValidation : validate(subcategory),
    categoryValidation : validate(category),
    colorValidation : validate(color),
    sizeValidation : validate(size),
    activeProductValidation : validate(activeProduct),
    activeAccountValidation : validate(activeAccount),
    deactiveAccountValidation : validate(deactiveAccount)

}