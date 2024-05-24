const express = require("express")
const routs = express.Router()

const auth = require("../middleware/auth")
const {upload}=require("../untils/index")

const {alreadyuser,changePassword,forgetPassword,getAllUsers,loginUser,profileUpdate,singupUser, getUser, google_signup} = require("../controllers/user.controller")
const {addAddress}=require("../controllers/userAddress")
const {alreadyuserValidaton,singupValidation,loginvelidation,changePassValidation,forgetPasswordValidation,profileUpdateValidation,addAddressValidation} = require("../validation/userSchema.velidation")
const { activeAccount, deActiveAccount } = require("../controllers/admin.details")
const { activeAccountValidation, deactiveAccountValidation } = require("../validation/admin.details.velidation")

//all user -admin
routs.get('/getAllUsers',auth(["admin"]),getAllUsers)
routs.get('/get-user',auth(["admin","vendor","user"]),getUser)
//active account vendor - admin
routs.put('/active-account',auth(["admin"]),activeAccountValidation,activeAccount)
routs.delete('/delete-account',auth(["admin"]),deactiveAccountValidation,deActiveAccount)
//post
routs.post('/already-user',alreadyuserValidaton,alreadyuser)
routs.post('/singup',singupValidation,singupUser)
routs.post('/signup-with-google',google_signup)
routs.post('/login',loginvelidation,loginUser)
routs.post('/add-address',addAddressValidation,auth(["user","admin","vendor"]),addAddress)

routs.put('/change-password',changePassValidation,auth(["user","admin","vendor"]),changePassword)
routs.put('/forget-password',forgetPasswordValidation,forgetPassword)

//update profile
routs.put('/profile-update',upload.single('product'),auth(["user"]),profileUpdateValidation,profileUpdate)

module.exports = routs