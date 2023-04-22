const express = require('express')
const cors = require('cors')
const logger = require('morgan')   // for seeing api calls in terminal
var bodyParser = require('body-parser');
var fs = require('fs');

const PORT = 3000
var morgan = require('morgan')

const app = new express()

const path = require('path')
app.use(express.static(`./dist/frontend`))

app.get(`/*`, function(req, res){
    res.sendFile(path.join(__dirname +'/dist//frontend/index.html'))
})

require('dotenv').config()
require('./Middlewares/mongoDB')   //to init mongoDB

app.use(cors())  // to connect frontend and backend without any disturbance
app.use(express.json())   // to receive data from front end
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//api
const api = require('./routes/api')
app.use('/api',api)


//Server code
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})