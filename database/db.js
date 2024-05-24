const mongoose = require("mongoose")
const url = process.env.url

async function dbConnetion() {
    try {
        await mongoose.connect(url).then(() => console.log("mongodb is connect")).catch(error => console.log(error, "not connect mongodb"))
    } catch (error) {
        return res.json({
            error: error
        })
    }
}
module.exports = dbConnetion