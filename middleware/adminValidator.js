const userModel = require("../models/userModel");

exports.validateRequest = async(req, res, next)=>{
    const userId = req.params.userId;

    const result = await userModel.findOne({userId:userId})

    console.log(result.role)

    if(result.role==="ADMIN"){
        next()
    }
    else{
        return res.status(403).send("NOT AUTHORIZED")
    }
}