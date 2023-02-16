const express = require("express")
const adminRouter = express.Router()
const adminController = require("../controller/adminController")
const requestController = require("../controller/requestController")
const adminValidator = require("../middleware/adminValidator")

adminRouter.get("/users", adminController.fetchUser)

adminRouter.post("/shopRequest/:userId",[adminValidator.validateRequest], requestController.createRequest)

module.exports = adminRouter