const jwt = require("jsonwebtoken");

const {userModel}=require("../models/index.model")

const auth = (role =[])=>{

    return async  (req,res,next) =>{
        try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(499).json({
                msg :  "token required"
            })
        }
        token = token.split(' ')[1]
        const privateKey = process.env.JWT_SECRET_KEY
        const verified = jwt.verify(token, privateKey)
        console.log("🚀 ~ auth ~ verified:", verified)
    
        let user = await userModel.findById({ _id: verified._id })
    
        if (token != user.token) {
            return res.status(498).json({
                msg: 'token not velid'
            })
        }
        
        if (!role.includes(user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        // find user add set req --> user
        req.user = user
       next()
    } catch (error) {
        console.log("🚀 ~ auth ~ error:", error)
        return res.status(500).json({
            error: error.message
        })   
    }
    }
}


module.exports = auth                                       