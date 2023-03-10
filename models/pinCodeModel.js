const mongoose = require('mongoose')

const pinCodeSchema = new mongoose.Schema({
    officeName:{
        type:String,
    },
    pincode:{
        type:Number,
    },
    districtName:{
        type:'String',
    },
    stateName:{
        type:'String',
    },
    taluk:{
        type:'String',
    }
}, {timestamps:false})

const pinCodeModel = mongoose.model("PinCode", pinCodeSchema)

module.exports = pinCodeModel