
const {model,Schema} = require("mongoose")

const product = new Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        required: true,
        type : Schema.Types.ObjectId,
        ref : "category"
    },
    subcategory : {
        required: true,
        type : Schema.Types.ObjectId,
        ref : "subcategory"
    },
    vendor : {
        required: true,
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    discount : {type : Number,default:0},
    discription : {
        type:  String ,
        default : null
    },
    color :[{
        type : Schema.Types.ObjectId,
        required: true,
        ref : "color"
    }],
    size : [{
        type : Schema.Types.ObjectId,
        required: true,
        ref : "size"
    }],
    images : [{
        type :String,
        required : true
    }], 
    stock : {
        type :Number,
        default: 0
    },
    tag : [{
        type :String,
        default: null
    }],
    status :{
        type : String,
        default : "Inactive"
    }
},{versionKey : false,timestamps : true})

const productModel = model("product",product,"product")
module.exports = productModel