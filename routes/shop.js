const express = require("express")
const shopRouter = express.Router()
const shopController = require("../controller/shopController")
const authValidator = require("../middleware/authValidator")

shopRouter.post("/create/:userId",[authValidator.verifyToken, authValidator.verifyShopKeeper], shopController.createShop)

shopRouter.get("/get/:userId", shopController.fetchByUser)

shopRouter.get("/shops", shopController.fetchAll)

module.exports = shopRouter