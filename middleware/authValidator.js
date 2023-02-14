const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.validateSignInRequest = async(req, res, next)=>{
    const phoneNumber = req.query.phoneNumber
    const email = req.query.email
    if(phoneNumber){
        const user = await userModel.findOne({phoneNumber:phoneNumber})
        console.log(phoneNumber)
        if(!user){
            return res.status(400).send("phoneNumber does not exist")
        }
        req.user = user
        next()
    }
    else if(email){
        const user = await userModel.findOne({email:email})
        //console.log(email, user)
        if(!user){
            return res.status(400).send("email does not exist")
        }
        if(!(bcrypt.compareSync(req.body.password, user.password))){
            return res.status(400).send("password is not correct")
        }
        req.user = user
        next()
    }
}

exports.verifyToken = (req, res, next)=>{

    const token = req.header("x-auth-token")

    console.log(token)

    if(!token){
        return res.status(403).json({
            error:"Please login first to access this endpoint!"
        })
    }

    jwt.verify(token, "SECRET SALT", (err, decoded)=>{
        if(err){
            return res.status(401).json({
                error:"Unauthorized"
            })
        }
        console.log(decoded)
        req.role = decoded.role
        console.log(req.role)
        next()    
    })
}

exports.verifyShopKeeper = (req, res, next)=>{
    console.log("inside verifyShopKeeper", req.role)
    if(req.role !== "SHOP KEEPER" && req.role!=="ADMIN"){
        return res.status(401).json("You are not authorised to access this endpoint!")
    }
    next()
}