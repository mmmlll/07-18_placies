const mongoose = require('mongoose')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

mongoose.Promise = global.Promise
const url = 'mongodb://localhost:27017/placies'   // this does NOT create a db in Robomongo
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('Mongoose connected successfully to the MongoDB')
  },
  function (err) {
    console.log(err)
  }
)

// register handlebars view engine to express
app.engine('.handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', '.handlebars')

// set up the routes
app.use(express.static('public'))
var placesRoute = require('./routes/placeRoute')
app.use('/places', placesRoute)

// this opens the port
const port = 3000
app.listen(port, function () {
  console.log(`express is running on port ${port}`)
})
