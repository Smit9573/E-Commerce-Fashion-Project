const {model,Schema} = require("mongoose")

const color = new Schema({
    name : { type: String ,required: true}
},{timestamps : true,versionKey :  false})

const colorModel =  model("color",color,"color")

module.exports = colorModel