const mongoose = require('mongoose')
const Schema = mongoose.Schema

var placesSchema = new Schema({
  name: String,
})

var PlaceModel = mongoose.model('PlaceModel', placesSchema)

module.exports = PlaceModel
