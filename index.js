var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')
mongoose.connect('mongodb://gavisic:lenovo123@ds143000.mlab.com:43000/gavisic')
app.use(cors())
app.use(bodyParser.json())
app.use('/users', require('./user'))
app.listen(process.env.PORT || 3000)
