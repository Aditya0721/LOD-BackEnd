const express = require('express')
const { router } = require('json-server')
const mongoose = require('mongoose')
const routers = require("./routes/index")
const app = express()

app.use(express.json())

app.listen(8081, ()=>{
    console.log("server started on port 8081")
}).on("error", (err)=>{
    console.log(err)
})

mongoose.connect("mongodb://localhost/LOD")
.then((res)=>console.log("connected to db"))
.catch((err)=>{console.log(err)})

app.use("/lod", routers)