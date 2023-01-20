const userModel = require("../models/userModel")
const axios = require("axios")

exports.signUp = async(req, res)=>{
    try{
        const lastUserId = await userModel.find({},{userId:1, _id:0}).sort({_id:-1}).limit(1)
       
        const date = new Date()
        let userId = req.body.firstName[0]+date.getTime().toString().substring(9, 13)+1
        if(lastUserId.length!==0){
            newId = lastUserId[0].userId.substring(5)
            userId = req.body.firstName[0]+date.getTime().toString().substring(9, 13)+(parseInt(newId)+1)
        }
        
        let address = []

        await axios.get("http://localhost:4000/data?pincode="+req.body.address.pinCode).
        then((res)=>{address = res.data[0]})
        .catch((err)=>{console.log(err); return res.status(500).send("json server error")})
    
        const user = {
            userId: userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            address:{ 
                state: address.stateName,
                district: address.districtName,
                city: address.taluk,
                pinCode: req.body.address.pinCode,
                landMark: req.body.address.landMark
            },
            cardDetails: req.body.cardDetails.map((card)=>{
                return {cardId: card.cardId, cardNumber:card.cardNumber}
            })
            ,
            role: "user"
        }

        const result = await userModel.create(user)

        if(result!==null){
            return res.status(200).json({
                data: result,
                success: `user created with userId ${result.userId}`
            })
        }
        else{
            return res.staus(400).json({
                status:`user already exists`
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err.errorMessage)
    }
}

exports.logIn = (req, res)=>{
    return res.status(200).send("Log In Api")
}