const { userModel, addressModel } = require("../models/index.model")

const addAddress = async (req, res) => {
    try {
        let user = req.user
        let { homeNo, village, city, dist, state, country, pinCode, fullAddress, defaultAddress, phone } = req.body
        if (!user) {
            return res.status(404).json({
                msg: "user not found error"
            })
        }

        const findAllAddresUser =  await addressModel.findOne({user : user._id})
        if (!findAllAddresUser) {
            defaultAddress = true 
        }
        if (defaultAddress == true) {
           await addressModel.findOneAndUpdate({user : user._id,defaultAddress : true},{$set : {defaultAddress :false}})
        }
         const Address = await addressModel.create({ user: user._id, homeNo: homeNo, village: village, city: city, state: state, country: country, pinCode: pinCode, fullAddress: fullAddress, dist: dist, defaultAddress: defaultAddress, phone: phone })
         

         if (!Address) {
            return res.status(400).json({
                msg : "address not set user"
            })
         }
         user = await userModel.findByIdAndUpdate({ _id: user._id }, { $push: { address: Address._id } })

        return res.status(200).json({
            msg: "add address successfully",
            Address
        })
    } catch (error) {
        console.log("addAddress api err ---> ", error);
        return res.status(500).json({
            msg: "addAddress api err",
            error
        })
    }
}

module.exports= {
    addAddress 
}