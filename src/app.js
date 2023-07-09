//  config
require('dotenv').config(".env")
// DB connection 
require('./db/connection')
//
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors());
app.use(express.json())
// log router 
const log = require('./routers/log')
app.use('/log', log);
//  products 
const product = require('./routers/products')
app.use('/products', product)
//  collections 
const collections = require('./routers/collection')
app.use('/collection', collections)
// Slider
const sliders = require('./routers/slider')
app.use('/slider/', sliders)
// admin
const auth = require('./middleware/auth')
const isAdmin = require('./middleware/isAdmin')
const admin = require('./routers/admin')
app.use('/admin', auth, isAdmin, admin)
// order 
const order = require('./routers/order')
app.use('/order/', auth, order)
// User
const user = require('./routers/user')
app.use('/user/', auth, user)

app.listen(3001, () => {
    console.log("server is up")
})