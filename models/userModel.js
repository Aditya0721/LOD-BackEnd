const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
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
    cardDetails:[{
        cardId:{
            type:String,
            required: true
        },
        cardNumber:{
            type:String,
            required: true
        }
    }],
    role:{
        type:String,
        enum:['CUSTOMER', 'SHOP KEEPER', 'ADMIN'],
        default: 'CUSTOMER'
    },
    cart:[]
}, { timestamps: true })

const userModel = mongoose.model('User',  userSchema)
module.exports = userModel