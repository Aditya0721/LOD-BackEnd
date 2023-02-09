const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

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

        let apiResult = true

        await axios.get("http://localhost:4000/data?pincode="+req.body.address.pinCode).
        then((res)=>{address = res.data[0]})
        .catch((err)=>{apiResult=false})
    
        if(apiResult){
            const user = {
                userId: userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                phoneNumber: req.body.phoneNumber,
                address:{ 
                    state: address.stateName,
                    district: address.districtName,
                    city: address.taluk,
                    pinCode: req.body.address.pinCode,
                    landMark: req.body.address.landMark,
                    locality: req.body.address.locality
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
                    status: `user created with userId ${result.userId}`
                })
            }
            else{
                return res.staus(400).json({
                    status:`user already exists`
                })
            }
        }
        else{
            return res.status(500).send("json server error")
        }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err.errorMessage)
    }
}

exports.logIn = (req, res)=>{
    try{
        const token = jwt.sign({email:req.user.email, issuedAt: new Date()}, 'SECRET SALT', {
            expiresIn:36000
        })

        res.status(200).send({
            email: req.user.email,
            phoneNumber: req.query.phoneNumber,
            name: req.user.firstName,
            token: token,
            isAuthenticated: true,
            message:'login successfull'
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send("some error occured")
    }
}
