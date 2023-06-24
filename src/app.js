//  config
require('dotenv').config(".env")
// DB connection 
require('./db/connection')
//
const express = require('express')
const app = express()
app.use(express.json())
// log router 
const log = require('./routers/log')
app.use('/log', log);
//  products 
const product = require('./routers/products')
app.use('/products', product)
//  collections 
const collections = require('./routers/collection')
app.use('/products', collections)

app.listen(3000, () => {
    console.log("server is up")
})