const express = require("express")
const shopRouter = express.Router()
const shopController = require("../controller/shopController")
const authValidator = require("../middleware/authValidator")

shopRouter.post("/create/:userId",[authValidator.verifyToken, authValidator.verifyShopKeeper], shopController.createShop)

shopRouter.get("/shops/:userId", shopController.fetchByUser)

shopRouter.get("/shops", shopController.fetchAll)

shopRouter.put("/updateStatus/:shopId/:status",[authValidator.verifyToken, authValidator.verifyAdmin], shopController.updateStatus)

shopRouter.put("/menu/add/:shopId",[authValidator.verifyToken, authValidator.verifyShopKeeper], shopController.addProductToMenu)

shopRouter.put("/menu/update/:shopId",[authValidator.verifyToken, authValidator.verifyShopKeeper], shopController.updateMenu)

module.exports = shopRouter