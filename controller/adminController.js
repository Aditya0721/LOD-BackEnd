const userModel = require("../models/userModel")

exports.fetchUser = async(req, res) => {
    try{
        const result = await userModel.find({})

        return res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: "internal server error"
        })
    }
}