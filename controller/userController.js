const userModel = require("../models/userModel")

exports.signUp = async(req, res)=>{
    try{
        const user = {
            userId: 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            address:{ 
                state:"a",
                district:"a",
                city: "a",
                pinCode: req.body.address.pinCode,
                landMark: " a"
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