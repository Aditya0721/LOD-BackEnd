const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const shopController = require("./shopController")
const shopModel = require("../models/shopModels")

exports.signUp = async(req, res)=>{
    try{
        let user = {}
        let shop = {}
        if(req.body.user){
            user = req.body.user
            shop = req.body.shop
            console.log(shop)
        }
        else{
            user = req.body
        }

        const lastUserId = await userModel.find({},{userId:1, _id:0}).sort({_id:-1}).limit(1)
       
        const date = new Date()
        let userId = user.firstName[0]+date.getTime().toString().substring(9, 13)+1
        if(lastUserId.length!==0){
            newId = lastUserId[0].userId.substring(5)
            userId = user.firstName[0]+date.getTime().toString().substring(9, 13)+(parseInt(newId)+1)
        }
        let apiResult = true
        if(apiResult){
            const newUser = {
                userId: userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: bcrypt.hashSync(user.password, 8),
                phoneNumber: user.phoneNumber,
                address:{ 
                    state: user.address.state,
                    district: user.address.district,
                    city: user.address.city,
                    pinCode: user.address.pinCode,
                    landMark: user.address.landMark,
                    locality: user.address.locality
                },
                cardDetails: user.cardDetails.map((card)=>{
                    return {cardId: card.cardId, cardNumber:card.cardNumber}
                })
                ,
                role: user.role
            }
    
            const resultUser = await userModel.create(newUser)
            
            let result = {...resultUser._doc}
            if(result.role==="SHOP KEEPER"){
                shop.userId = result.userId
                shop.phoneNumber = result.phoneNumber
                const lastShopId = await shopModel.find({},{shopId:1, _id:0}).sort({_id:-1}).limit(1)
               
                const date = new Date()
                let shopId = shop.shopName[0]+date.getTime().toString().substring(9, 13)+1
                if(lastShopId.length!==0){
                    newId = lastShopId[0].shopId.substring(5)
                    shopId = shop.shopName[0]+date.getTime().toString().substring(9, 13)+(parseInt(newId)+1)
                }
                const newShop = {
                    shopId:shopId,
                    shopName: shop.shopName,
                    address:{ 
                        state: shop.address.state,
                        district: shop.address.district,
                        city: shop.address.city,
                        pinCode: shop.address.pinCode,
                        landMark: shop.address.landMark,
                        locality: shop.address.locality
                    },
                    phoneNumber:shop.phoneNumber,
                    userId:shop.userId,
                    menu:[],
                    rating:0,
                    review:[]
                }
                const shopResult = await shopModel.create(newShop)
                
                result.shopId = shopResult.shopId
                console.log(result)
            }
            
            if(result!==null){
                console.log(result)
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
        console.log(req.user)
        const token = jwt.sign({email:req.user.email, role:req.user.role, issuedAt: new Date()}, 'SECRET SALT', {
            expiresIn:36000
        })
        const user = req.user._doc
        console.log(user)
        //res.setHeader("x-auth-token", token)
        res.status(200).send({
            ...user,
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
