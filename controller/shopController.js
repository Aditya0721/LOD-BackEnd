const { response } = require("express")
const requestModel = require("../models/requestModel")
const shopModel = require("../models/shopModels")

exports.createShop = async(req, res)=>{
    try{
        console.log("inside createShop")
        const lastShopId = await shopModel.find({},{shopId:1, _id:0}).sort({_id:-1}).limit(1)
       
        const date = new Date()
        let shopId = req.body.shopName[0]+date.getTime().toString().substring(9, 13)+1
        if(lastShopId.length!==0){
            newId = lastShopId[0].shopId.substring(5)
            shopId = req.body.shopName[0]+date.getTime().toString().substring(9, 13)+(parseInt(newId)+1)
        }
        const shop = {
            shopId:shopId,
            shopName: req.body.shopName,
            address:{ 
                state: req.body.address.state,
                district: req.body.address.district,
                city: req.body.address.city,
                pinCode: req.body.address.pinCode,
                landMark: req.body.address.landMark,
                locality: req.body.address.locality
            },
            phoneNumber:req.body.phoneNumber,
            userId:req.params.userId,
            menu:[],
            rating:0,
            review:[]
        }
        const result = await shopModel.create(shop) 

        return res.status(200).send({'message':`shop created with shopId:${result.shopId}`, 'shopId':result.shopId})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.fetchByUser = async(req, res)=>{
    try{
        console.log("inside fetchByUser")

        const userId = req.params.userId

        console.log(userId)
        const shop = await shopModel.find({userId:userId}) 

        if(shop.size!==0){
            return res.status(200).send(shop)
        }
        else{
            return res.status(400).send("no shops found")
        }
    }
    catch(err){
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.fetchAll = async(req, res)=>{
    try{
        console.log("inside fetchAll")
        const shop = await shopModel.find({}) 
        
        if(shop.size!==0){
            return res.status(200).send(shop)
        }
        else{
            return res.status(400).send("no shops found")
        }
    }
    catch(err){
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.updateStatus = async(req, res)=>{
    try{
        const shopId = req.params.shopId

        const status = req.params.status

        console.log(status, shopId)
        await shopModel.updateOne({shopId:shopId},{isVerified:status})

        const updatedShop = await shopModel.findOne({shopId:shopId})
        //console.log(updatedRequest)
        return res.status(200).send(updatedShop)
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error")
    }   
}

exports.addProductToMenu = async(req, res)=>{

    try {
        const shopId = req.params.shopId
        const products = req.body.products
    
        const shop = await shopModel.findOne({shopId:shopId},{menu:1, _id:0})
    
        let newMenu = shop.menu
        
        console.log(products)

        products.forEach((product)=>{newMenu.push(product)})
    
        console.log(newMenu)
    
        const result = await shopModel.updateOne({shopId:shopId}, {menu:newMenu})

        return res.status(200).send("updated")
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.updateMenu = async(req, res)=>{

    try {
        const shopId = req.params.shopId
        const menu = req.body.menu

        console.log(menu)

        const result = await shopModel.updateOne({shopId:shopId}, {menu:menu})

        return res.status(200).send("updated")
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}