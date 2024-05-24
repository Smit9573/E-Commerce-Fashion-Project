const {model,Schema} = require("mongoose")

const order = new Schema({
    user : { type: Schema.Types.ObjectId ,required: true,ref:"user"},
    products:{type: Array,required:true,ref : "product"},
    address :{type : Object,required : true},
    totalBill : {type : Number,required : true},
    status:{type : String,default : "pending"},

},{timestamps : true,versionKey :  false})

const orderModel =  model("order",order,"order")

module.exports = orderModel