const requestModel = require("../models/requestModel")
const shopModel = require("../models/shopModels")
const userModel = require("../models/userModel")
const {sendCreateRequestMail, sendCloseRequestMail} = require("../utility/requestStatusEmail")

exports.createRequest = async(req, res)=>{
    try{
        const lastReqId = await requestModel.find({},{requestId:1, _id:0}).sort({_id:-1}).limit(1)
       
        const date = new Date()
        let requestId = req.body.shopId[0]+date.getTime().toString().substring(9, 13)+1
        if(lastReqId.length!==0){
            newId = lastReqId[0].requestId.substring(5)
            requestId = req.body.shopId[0]+date.getTime().toString().substring(9, 13)+(parseInt(newId)+1)
        }
        const newReq = {
            requestId: requestId,
            shopId:req.body.shopId,
            assignedTo:req.params.userId,
        }

        const shop = await shopModel.findOne({shopId:newReq.shopId},{_id:0, userId:1})
        
        const user = await userModel.findOne({userId:shop.userId},{_id:0, email:1})

        const result = await requestModel.create(newReq)

        sendCreateRequestMail(user.email)

        return res.status(200).send("request created successfully")
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error")
    }
}

exports.closeRequest = async(req, res)=>{
    try{
        const requestId = req.params.requestId

        //console.log(requestId)
        
        await requestModel.updateOne({requestId:requestId},{status:"CLOSED"})
        
        const updatedRequest = await requestModel.findOne({requestId:requestId})

        console.log(updatedRequest)

        const shop = await shopModel.findOne({shopId:updatedRequest.shopId},{_id:0, userId:1})
        
        console.log(shop)

        const user = await userModel.findOne({userId:shop.userId},{_id:0, email:1})

        console.log(user)

        sendCloseRequestMail(user.email, updatedRequest.status)
        //console.log(updatedRequest)
        return res.status(200).send(updatedRequest)
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error")
    }   
}

exports.fetchAll = async(req, res)=>{
    try{
        console.log("inside request fetch all")
        const result = await requestModel.find({})

        console.log(result)
        return res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error")
    }
}