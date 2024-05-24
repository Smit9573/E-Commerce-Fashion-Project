
const {model,Schema} = require("mongoose")

const userSchema = new Schema({
    isActive : {
        type : Boolean,
        default : true
    },
    username : {
        type : String,
        default:null,
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        default:null,
    },
    isGoogle : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "user"
    },
    rating : {
        type : Number,
        default : 0
    },
    address : [{type : Schema.Types.ObjectId,default: null,ref : "address"}],
    token : {
        type:  String ,
        default : null
    },
    profile :{
        type : String,
        default: null
    },
    phonenumber : {
        type :String,
        default: null
    },
    orders : [{
        productId : {type : Schema.Types.ObjectId,ref : "product",required : true},
        quantity : {type : Number,required : true},
    }]
},{versionKey : false,timestamps : true})

const userModel = model("user",userSchema,"user")
module.exports = userModel