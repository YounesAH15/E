
const dotenv = require('dotenv')

const express = require("express")
const app = express()
dotenv.config()

const mgdb = require("mongodb")
const client = mgdb.MongoClient

app.listen(3000)
const url = process.env.MONGODB_CONNECTION_STRING || "mongodb+src://younesharrat5896:t@cluster-alten.qqnnpgu.mongodb.net/?retryWrites=true&w=majority"


client.connect(url , (e,cl) => {

    console.log("connected")
})

app.get('/', (req,res ) =>{

    console.log("get req has passed ")
})
