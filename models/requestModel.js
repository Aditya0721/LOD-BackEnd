const mongoose = require("mongoose")

const requestSchema = mongoose.Schema({
    requestId:{
        type:String,
        required: true
    },
    shopId:{
        type:String,
        required: true
    },
    assignedTo:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['OPEN', 'CLOSED'],
        default:'OPEN'
    }
}, {timestamps:true})

const requestModel = mongoose.model("Request", requestSchema)

module.exports = requestModel