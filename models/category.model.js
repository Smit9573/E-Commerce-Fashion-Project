const {model,Schema} = require("mongoose")

const category = new Schema({
    name : { type: String ,required: true},
    subcategory: [{
        type : Schema.Types.ObjectId,
        default:null,
        ref : "subcategory"
    }]
},{timestamps : true,versionKey :  false})

const categoryModel =  model("category",category,"category")

module.exports = categoryModel