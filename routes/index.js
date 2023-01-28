const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const adminRouter = require("./admin")

router.get("/home", (req, res)=>{
    return res.status(200).send("Home Page")
})

router.use("/user", userRouter)

router.use("/admin", adminRouter)

module.exports = router