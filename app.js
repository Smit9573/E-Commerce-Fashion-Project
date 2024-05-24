require("dotenv").config()
const cors = require('cors')
const express = require("express")
const morgan = require('morgan')
const app = express()

const server = require("http").createServer(app)

app.use(cors())
//Req logger
app.use(morgan("dev"))

//url uncoded - for body data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//api rout
app.use(express.static('product'));
const api = require("./routs/index.routs")
app.use("/api",api)

//server listen
const PORT = process.env.PORT || 3001
const dbConnetion = require("./database/db")
const start = async () => {
    try {
        await dbConnetion()
        server.listen(PORT, () => {
            console.log("🚀 ~Server Runnig PORT :", PORT)
        })
    } catch (error) {
        return res.json({
            msg : "server not start",
            error: error
        })
    }
}

start()
