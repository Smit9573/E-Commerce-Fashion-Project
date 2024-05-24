const { userModel, addressModel } = require("../models/index.model")
const { otpModel } = require("../models/index.model")

//otp verification file
const { verifyOTP } = require("../untils/otpverify")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get all usera
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).lean()
        delete users.password
        return res.status(200).json({
            msg: "All users",
            users
        })
    } catch (error) {
        return res.status(500).json({
            msg: "get all user api errror",
            error
        })
    }

}
const getUser = async(req,res)=>{
    try {
        const user = req.user
        delete user.password
        return res.status(200).json({
            msg : "user details",
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "get user api errror",
            error
        })
    }
}
//already user cheak user 
const alreadyuser = async (req, res) => {
    try {
        let { email } = req.body
        let user = await userModel.find({ email: email })
        if (user) {
            return res.status(200).json({
                msg: "already user",
                user: user.username,
                already: false
            })
        }
        return res.status(200).json({
            msg: "new user",
            already: true
        })
    } catch (error) {
        return res.status(500).json({
            msg: "already api chek errror",
            error
        })
    }

}
//singup 
const singupUser = async (req, res) => {
    try {
        let { email, username, password, otp, phonenumber, role } = req.body
       
        password = await bcrypt.hash(password, 10)
        let user = await userModel.findOne({ email: email }).lean()
        if (user) {
            delete user.password
            return res.status(400).json({
                msg: "already you have a account",
                name: user.username,
                newUser: false
            })
        }
        const chekOtp = await otpModel.findOne({ email: email })
        if (!chekOtp) {
            return res.status(400).json({
                msg: "otp is reqired"
            })
        }
        const otpData = chekOtp.otp
        // otp verifid

        if (!verifyOTP(otpData, otp)) {
            return res.status(409).json({
                msg: "Wrong otp && expired OTP"
            })
        }
        let isActive  = true
        if (role == "vendor") {
            isActive  = false
        }
        let userNewuser = await userModel.create({ email: email, password: password, username: username, phonenumber: phonenumber, role: role,isActive : isActive})
        return res.status(200).json({
            msg: "new signup success ",
            name: userNewuser.username,
            newUser: true
        })

    }
    catch (error) {
        console.log("singup -->api err", error);
        return res.status(500).json({
            msg: "singup api faild errror",
            error
        })
    }
}
//login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                msg: "you dont have a account plz sing up"
            })
        }
        const chekPassword = await bcrypt.compare(password, user.password)
        if (!chekPassword) {
            return res.status(401).json({
                msg: "wrong password"
            })
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = { _id: user._id }
        const token = jwt.sign(data, jwtSecretKey)
        user = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { token: token } }, { new: true })
        return res.status(200).json({
            msg: "login success",
            name: user.username,
            token
        })
    } catch (error) {
        console.log("lodin api err-->", error);
        return res.status(500).json({
            msg: "login api faild errror",
            error
        })
    }
}
//google singup
const google_signup = async (req, res) => { 
    try {
        let { email, username,profile} = req.body
        if (!email) {
            return res.status(400).json({
                msg: "email is reqired"
            })
        }
        if (!username) {
            username = email.split("@")[0]   
        }
        let user = await userModel.findOne({ email: email }).lean()
        if (user) {
            return res.status(400).json({
                msg: "already you have a account",
                username: user.username,
                newUser: false
            })
        }
        user = await userModel.create({ email: email,
            username: username,
            profile : profile,
            isGoogle : true
         })
         // token create
         let jwtSecretKey = process.env.JWT_SECRET_KEY;
         const data = { _id: user._id }
         const token = jwt.sign(data, jwtSecretKey)
         user = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { token: token } }, { new: true })
        
         return res.status(200).json({
            msg: "new signup success ",
            name: user.username,
            newUser: true,
            token : user.token
        })
    }
    catch (error) {
        console.log("google singup api err-->", error);
        return res.status(500).json({
            msg: "google singup api err-->",
            error
        })
    }
}
//google login 
// const google_login = async (req, res) => {
//     try {
//         const user = await userModel.findOne({
//             email: req.body.email,
//             isGoogle : true
//         })
//     } catch (error) {
//         console.log("google login api err-->", error);
//         return res.status(500).json({
//             msg: "google login api err-->",
//             error
//         })
//     }
// }
//change password
const changePassword = async (req, res) => {
    try {
        let { oldPassword, newPassword } = req.body
        let user = req.user
        if (!user) {
            return res.status(404).json({
                msg: "user not found"
            })
        }
        const chekPassword = await bcrypt.compare(oldPassword, user.password)
        if (!chekPassword) {
            return res.status(400).json({
                msg: "old password wrong Enter your old passwrod"
            })
        }
        newPassword = await bcrypt.hash(newPassword, 10)
        user = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { password: newPassword } })
        return res.status(200).json({
            msg: "change password successfully",
            username: user.username

        })

    } catch (error) {
        console.log("change password api err ---> ", error);
        return res.status(500).json({
            msg: "change password api err",
            error
        })
    }
}
//forget password 
const forgetPassword = async (req, res) => {
    try {
        let { email, otp, newPassword } = req.body
        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                msg: "you have not a account",
                email
            })
        }

        const chekOtp = await otpModel.findOne({ email: email })
        let otpData = chekOtp.otp
        if (!verifyOTP(otpData, otp)) {
            return res.status(409).json({
                msg: "Wrong otp && expired OTP"
            })
        }
        newPassword = await bcrypt.hash(newPassword, 10)
        user = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { password: newPassword } })
        return res.status(200).json({
            msg: "forget password successfully"
        })

    }
    catch (error) {
        console.log("forget password api err ---> ", error);
        return res.status(500).json({
            msg: "forget password api err",
            error
        })
    }
}
//profile update
const profileUpdate = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile = req.file.destination + '/' + req.file.filename
        }
        let { profile, phoneNumber, username } = req.body
        let user = req.user
        user = await userModel.findOne({ _id: user._id })
        if (profile) {
            user = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { profile: profile } }, { new: true })
        }
        if (phoneNumber) {
            user = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { phoneNumber: phoneNumber } }, { new: true })
        }
        if (username) {
            user = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { username: username } }, { new: true })
        }

        return res.status(200).json({
            msg: "profile successfully update",
            user
        })

    }
    catch (error) {
        console.log("update profile api err -->", error);
        return res.status(500).json({
            msg: "profile upadate api fail",
            error
        })
    }
}
module.exports = {
    getUser,
    getAllUsers,
    alreadyuser,
    singupUser,
    google_signup,
    loginUser,
    changePassword,
    forgetPassword,
    profileUpdate
}