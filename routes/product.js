const express = require('express')

const productRouter = express.Router()

const productController = require("../controller/productController")

const authValidator = require("../middleware/authValidator")

productRouter.post("/create",[authValidator.verifyToken, authValidator.verifyShopKeeper], productController.createProduct)

module.exports = productRouter