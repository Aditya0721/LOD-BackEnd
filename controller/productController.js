const productModel = require('../models/productModel')
const shopModel = require('../models/shopModels')

exports.createProduct = async(req, res)=>{

    try {
        const lastProductId = await productModel.find({},{productId:1, _id:0}).sort({_id:-1}).limit(1)
       
        const date = new Date()
        let productId = req.body.productName[0]+date.getTime().toString().substring(9, 13)+1
        if(lastProductId.length!==0){
            newId = lastProductId[0].productId.substring(5)
            productId = req.body.productName[0]+date.getTime().toString().substring(9, 13)+(parseInt(newId)+1)
        }

        const newProduct = {
            productId:productId,
            productName:req.body.productName,
            brand:req.body.brand,
            type:req.body.type,
            rating:0,
            reviews:[]
        }

        const result = await productModel.create(newProduct)

        return res.status(200).send("product created")
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}