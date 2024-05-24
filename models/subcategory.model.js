const {model,Schema} = require("mongoose")

const subcategory = new Schema({
    name : { type : String ,required: true},
    product:[{type : Schema.Types.ObjectId,default:null,ref : "product"}],
},{timestamps : true,versionKey :  false})

const subcategoryModel =  model("subcategory",subcategory,"subcategory")

module.exports = subcategoryModel