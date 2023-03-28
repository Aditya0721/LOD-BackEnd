const express = require('express')
const { router } = require('json-server')
const mongoose = require('mongoose')
const userModel = require('./models/userModel')
const routers = require("./routes/index")
const app = express()
const bcrypt = require("bcryptjs")
const pinCodeModel = require('./models/pinCodeModel')
const axios = require('axios')

//running json server
const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const productModel = require('./models/productModel')

const jServer = jsonServer.create()
const jrouter = jsonServer.router(path.join(__dirname, 'pincode.json'))
const middlewares = jsonServer.defaults()

jServer.use(cors())
jServer.use(jsonServer.bodyParser)
jServer.use(middlewares)
jServer.use(jrouter)

const PORT = 4000

jServer.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})

//running backend server
app.use(express.json())

app.use((req, res, next)=>{

    // console.log(req)
    const allowedOrigins = ["http://16.171.9.37", "http://localhost:3000"];
    const origin = req.headers.origin;
    console.log(req.headers.origin)
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
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
.then(
    async(res)=>{
        console.log("connected to db");
        const user = await userModel.findOne({email:"adityaprasad246278@gmail.com"})
        if(user===null){
            const admin = {
                userId: "A89431",
                firstName: "Aditya",
                lastName: "Behera",
                email: "adityaprasad246278@gmail.com",
                password: bcrypt.hashSync("adityaaditya", 8),
                phoneNumber: "7008362725",
                address:{ 
                    state: "ODISHA",
                    district: "Ganjam",
                    city: "Berhampur",
                    pinCode: 760003,
                    landMark: "near that temple",
                    locality: "Haladiapadar B.O"
                },
                cardDetails: [1, 2].map((card)=>{
                    return {cardId: card, cardNumber:"1234"}
                })
                ,
                role: "ADMIN"
            }
            await userModel.create(admin)
            console.log("admin created")
        }
        const products = await productModel.find();
            if(products.length===0){
                const allProducts = [
                    {   
                        productId:"K14733",
                        productName:"Ketel One Vodka",
                        brand:"Tito's Vodka",
                        type:"VODKA"
                    },
                    {
                        productId:"B85122", 
                        brand:"SEAGRAMS",
                        productName:"BLENDERS PRIDE",
                        type:"WHISKEY"
                    }
                ]
                await productModel.create(allProducts);
                console.log("products created");
            }
    })
.catch((err)=>{console.log(err)})

app.use("/lod", routers)