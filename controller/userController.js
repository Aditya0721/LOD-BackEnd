const userModel = require("../models/userModel")
const axios = require("axios")

exports.getUserByPhoneNumber = async (req, res)=>{
    
    try{
        const phoneNumber = req.params.phoneNumber
        
        // console.log(phoneNumber)
        const user = await userModel.findOne({phoneNumber:parseInt(phoneNumber)})

        // console.log(user)
        if(user){
            
            return res.status(200).send(user)
        }
        else{
            return res.status(400).send("user doesnot exist")
        }
    }
    catch(err){
        return res.status(500).send("Internal Server Error")
    }
}