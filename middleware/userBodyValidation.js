const userModel = require("../models/userModel")
const userUtility = require("../utility/validEmail")
const emailOTPVerfication = require("../utility/emailOTPVerification")

exports.userBodyValidator = async (req, res, next) => {
    let valid = true
    
    if(userUtility.validEmail(req.body.email)){
       const user = await userModel.findOne({email:req.body.email})
       //console.log(user)
       if(user==null){
        const result = await emailOTPVerfication.sendEmail(req.body.email)
        if(result){
            console.log(result)
            next()
        }
        else{
            return res.status(400).json({
                message: "some error occured"
            })
        }
       }
       else{
        return res.status(400).json({
            message:"user already exists"
        })
       }
    }
    else{
        return res.status(400).json({
            message:"Invalid Email format"
        })
    }
}

exports.valiDateOTP = async(req, res, next) => {

}