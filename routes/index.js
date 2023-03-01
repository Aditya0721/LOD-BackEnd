const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const adminRouter = require("./admin")
const shopRouter = require("./shop")
const productRouter = require("./product")

router.get("/home", (req, res)=>{
    return res.status(200).send("Home Page")
})

router.use("/user", userRouter)

router.use("/admin", adminRouter)

router.use("/shop", shopRouter)

router.use("/product", productRouter)

module.exports = router