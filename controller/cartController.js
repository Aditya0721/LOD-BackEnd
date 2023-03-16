const userModel = require('../models/userModel')

exports.updateCart = async(req, res)=>{

    try{
    const userId = req.user.userId

    const updatedCart = req.body.cart

    const result = await userModel.updateOne({userId:userId},{cart:updatedCart})
    
    if(result)
    return res.status(200).send("updated")
}
    catch(err){
        console.log(err)
        return res.status(500).send("internal error")
    }

}