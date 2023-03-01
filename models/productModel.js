const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    productName:{
        type:'String',
        required:'true'
    },
    type:{
        type:'String',
        enum:["WHISKEY", "BRANDY", "VODKA", "RUM", "GIN", "TEQUILLA", "CHAMPAGNE"]
    },
    rating:{
        type:Number
    },
    reviews:[]
}, {timestamps:true})

const productModel = mongoose.model("Products", productSchema)

module.exports = productModel