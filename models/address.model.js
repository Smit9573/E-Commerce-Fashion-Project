
const { model, Schema } = require("mongoose")

const address = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    homeNo: {
        type: String, 
        required: true
    },
    village: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    dist: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    phone : {
      type : Number,
      required : true
    },
    fullAddress: {
        type: String,
        default: null
    },
    defaultAddress : {
        type : Boolean,
        default : false
    }
}, { versionKey: false, timestamps: true })

const addressModel = model("address", address, "address")

module.exports = addressModel
