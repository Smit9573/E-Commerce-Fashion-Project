const {model,Schema} = require("mongoose")

const reviews = new Schema({
    user : { type: Schema.Types.ObjectId ,required: true,ref : "user"},
    product:{type : Schema.Types.ObjectId,required: true,ref : "product"},
    review : {type : Number},
    comment :{type : String,default:null} 
},{timestamps : true,versionKey :  false})

const reviewsModel =  model("reviews",reviews,"reviews")

module.exports = reviewsModel