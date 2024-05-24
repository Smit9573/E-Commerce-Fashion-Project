
const Joi = require("joi")
const validate = require("../middleware/validate")

const getProductByUser = Joi.object({
categoryId : Joi.string().default(false),
subCategoryId : Joi.string().default(false),
colorId : Joi.string().default(false),
sizeId : Joi.string().default(false),
priceRange : Joi.string().default("")
})

module.exports = {
    getProductByUserVelidation : validate(getProductByUser)

}