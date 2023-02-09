const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.validateSignInRequest = async(req, res, next)=>{
    const phoneNumber = req.query.phoneNumber
    const email = req.query.email
    if(phoneNumber){
        const user = await userModel.findOne({phoneNumber:phoneNumber})
        if(!user){
            return res.status(400).send("phoneNumber does not exist")
        }
        req.user = user
        next()
    }
    else if(email){
        const user = await userModel.findOne({email:email})
        console.log(email, user)
        if(!user){
            return res.status(400).send("email does not exist")
        }
        if(!(user.password===req.body.password)){
            return res.status(400).send("password is not correct")
        }
        req.user = user
        next()
    }
}