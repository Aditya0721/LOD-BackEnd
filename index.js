const express = require('express')
const { router } = require('json-server')
const mongoose = require('mongoose')
const routers = require("./routes/index")
const app = express()

app.use(express.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000")

    res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, PATCH, DELETE")

    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Auth-Token, Content-Type, Authorization, Content-Length, X-Requested-With, Accept");

    res.setHeader("Content-Type", 'application/json')
    next()
}) 
app.listen(8081, ()=>{
    console.log("server started on port 8081")
}).on("error", (err)=>{
    console.log(err)
})

mongoose.connect("mongodb://localhost/LOD")
.then((res)=>console.log("connected to db"))
.catch((err)=>{console.log(err)})

app.use("/lod", routers)