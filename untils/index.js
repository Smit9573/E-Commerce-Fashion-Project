const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './product')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const sendEmail = async ({email,subject,html})=>{
    try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html:html,
        };
        
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject('Operation failed');
                    console.error("Error sending email: ", error);
                } else {
                    resolve('Operation succeeded');
                    console.log("Email sent: ", info.response);
                }
            });
        });

    } catch (error) {
       console.log("send mail err");
    }
}




module.exports = {
    sendEmail,
    upload
}