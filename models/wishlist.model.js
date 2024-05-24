const {model,Schema} = require("mongoose")

const wishlist = new Schema({
    user : { type: Schema.Types.ObjectId ,required: true,ref : "user"},
    product:{type : Schema.Types.ObjectId,required: true,ref : "product"},
},{timestamps : true,versionKey :  false})

const wishlistModel =  model("wishlist",wishlist,"wishlist")

module.exports = wishlistModel