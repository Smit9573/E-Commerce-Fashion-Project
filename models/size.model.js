const {model,Schema} = require("mongoose")

const size = new Schema({
    name : { type: String ,required: true}
},{timestamps : true,versionKey :  false})

const sizeModel =  model("size",size,"size")

module.exports = sizeModel