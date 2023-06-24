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
app.listen(3000, () => {
    console.log("server is up")
})