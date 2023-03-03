const express = require('express')

const productRouter = express.Router()

const productController = require("../controller/productController")

const authValidator = require("../middleware/authValidator")

productRouter.post("/create",[authValidator.verifyToken, authValidator.verifyShopKeeper], productController.createProduct)

productRouter.get("/products",[authValidator.verifyToken, authValidator.verifyShopKeeper], productController.fetchProduct)

module.exports = productRouter