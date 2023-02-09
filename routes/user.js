const express = require("express")
const userRouter = express.Router()
const userController = require("../controller/userController")
const userBodyValidator = require("../middleware/userBodyValidation")
const authController = require("../controller/authController")
const authValidator = require("../middleware/authValidator")

userRouter.post("/signup", [userBodyValidator.userBodyValidator], authController.signUp)

userRouter.post("/login", [authValidator.validateSignInRequest], authController.logIn)

userRouter.get("/:phoneNumber", userController.getUserByPhoneNumber)

module.exports = userRouter