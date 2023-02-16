const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    shopId:{
        type:String,
        required: true
    },
    shopName:{
        type:String,
        required:true
    },
    address:{
        state:{
            type:String,
            required:true
        },
        district:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        }, 
        pinCode:{
            type: Number,
            required: true
        }, 
        landMark:{
            type: String,
            required: true
        },
        locality:{
            type: String,
            required: true
        }
    },
    phoneNumber:{
        type:String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    menu:[],
    rating:{
        type:Number
    },
    reviews:[{userId:String, comment:String}],
    isVerified:{
        type:Boolean,
        default: false,
        required: true
    }
}, { timestamps: true })

const shopModel = mongoose.model("Shop", shopSchema)

module.exports = shopModel