const userModel = require("../models/userModel")
const userUtility = require("../utility/validEmail")
const emailOTPVerfication = require("../utility/emailOTPVerification")

exports.userBodyValidator = async (req, res, next) => {
    let valid = true
    
    try{
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
            return res.status(400).send("some error occured")
        }
        }
        else{
        return res.status(400).json({errorMessage:"emailid already exists"})
        }
        }
        else{
            return res.status(400).send("Invalid Email format")
        }
    }
    catch(err){
        return res.status(400).send("email id is not provided")
    }
}

exports.valiDateOTP = async(req, res, next) => {

}