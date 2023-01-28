const express = require("express")
const adminRouter = express.Router()
const adminController = require("../controller/adminController")

adminRouter.get("/users", adminController.fetchUser)

module.exports = adminRouter