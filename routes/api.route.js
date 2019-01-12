var express = require('express')

var router = express.Router()
var drinks = require('./api/drinks.route')

//creates nested routes
//way to get api in front of a certain set of routes
router.use('/drinks', drinks);


module.exports = router;