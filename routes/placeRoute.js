const express = require('express')
const router = express.Router()
const PlaceModel = require('../models/Places.js')
// const bodyParser = require('body-parser')    // i DO NOT need this here
const placiesController = require('../controllers/placies_controller')


router.get('/', function(req,res){
  console.log('hello from router.get')    // [???] THIS IS SHOWING ON TERMINAL... NOT ON BROWSER CONSOLE. WHY? Because this file is not running on the browser - ? But how did the get request get registered by Terminal in the first place, so that this console.log is run?
  // search the DB
  PlaceModel.find({} , function (err, places) {
    console.log(places)                   // [???] THIS IS SHOWING ON TERMINAL... NOT ON BROWSER CONSOLE. Because this file is not running on the browser - ?
    if (err) throw err
    res.render('index', {results: places}) // Assign what the search returns to "results" (the latter is called in index.hbs)
  })
})

router.post('/', placiesController.add)    // this wasn't routing because we put a "preventDefault" on the form submit, in script.js. Preventing default means that the form wasn't submitted, so there was no "post" request!

module.exports = router
