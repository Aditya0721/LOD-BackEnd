const express = require("express")
const router = express.Router()
const userRouter = require("./user")

router.get("/home", (req, res)=>{
    return res.status(200).send("Home Page")
})

router.use("/user", userRouter)

module.exports = router