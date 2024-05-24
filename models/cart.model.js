const { model, Schema } = require("mongoose")

const cart = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        color:{
            type: Schema.Types.ObjectId,
            ref: "color",
            required: true
        },
        size:{
            type: Schema.Types.ObjectId,
            ref: "size",
            required: true
        }
    }]
},{versionKey: false,timestamps:true})


module.exports = model("cart", cart, "cart")