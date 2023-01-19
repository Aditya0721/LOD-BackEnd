const express = require("express")
const userRouter = express.Router()
const userController = require("../controller/userController")

userRouter.post("/signup", userController.signUp)

userRouter.post("/login", userController.logIn)

module.exports = userRouter