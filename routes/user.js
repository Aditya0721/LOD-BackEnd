const express = require("express")
const userRouter = express.Router()
const userController = require("../controller/userController")
const userBodyValidator = require("../middleware/userBodyValidation")

userRouter.post("/signup", [userBodyValidator.userBodyValidator], userController.signUp)

userRouter.post("/login", userController.logIn)

module.exports = userRouter