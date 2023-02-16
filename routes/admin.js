const express = require("express")
const adminRouter = express.Router()
const adminController = require("../controller/adminController")
const requestController = require("../controller/requestController")
const adminValidator = require("../middleware/adminValidator")
const authValidator = require("../middleware/authValidator")

adminRouter.get("/users",[authValidator.verifyToken, authValidator.verifyAdmin], adminController.fetchUser)

adminRouter.post("/shopRequest/:userId",[adminValidator.validateRequest], requestController.createRequest)

adminRouter.put("/closeRequest/:requestId",[authValidator.verifyToken, authValidator.verifyAdmin], requestController.closeRequest)

adminRouter.get("/fetchRequests",[authValidator.verifyToken, authValidator.verifyAdmin], requestController.fetchAll)
module.exports = adminRouter