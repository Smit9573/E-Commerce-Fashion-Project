const { otpModel } = require("../models/index.model")
const { sendEmail } = require("../untils")
const { generateOTPWithExpiration, verifyOTP } = require("../untils/otpverify")

//send otp
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const otp =  generateOTPWithExpiration()
        const html = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Dcode Infotech</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Dcode Infotech. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp.otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Dcode Infotech</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Dcode Infotech</p>
            <p>302 Amphitheatre Parkway</p>
            <p>surat</p>
          </div>
        </div>
        </div>`
        let user = await otpModel.findOne({ email: email })
        if (user) {
            user = await otpModel.findByIdAndUpdate({ _id: user._id }, { $set: {otp : otp} }, { new: true })
            await sendEmail({ email,otp, html })
            return res.status(200).json({
               msg : `sent otp :- ${user.email}`
            })
        }
         user = await otpModel.create({ email: email, otp: otp })
        await sendEmail({ email,otp, html })
        return res.status(200).json({
            msg : `sent otp :- ${user.email}`
        })
    } catch (error) {
        console.log("error :-- send otp catch --",error);
        return res.status(500).json({
            msg: "otp api faild",
            error
        })
    }

}
//varified
const verified = async (req, res) => {
    try {
        const { email, otp } = req.body
        console.log(email,otp  );
        user = await otpModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                msg: "user not found",
            })
        }
        
        if (!verifyOTP(user.otp,otp)) {
            return res.status(404).json({
                msg: "otp wrong && expired",
                verified: false
            })
        }
        return res.status(200).json({
            msg: "user is varified",
            verified: true
        })
    } catch (error) {
        console.log("error :-- verified otp catch --",error);
        return res.status(400).json({
            msg: "verified api faild",
            error
        })
    }

}


module.exports = {
    sendOtp,
    verified
}