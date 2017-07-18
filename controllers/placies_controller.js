const PlaceModel = require('../models/Places')

function add (req,res){
  // grab the info submitted, run the HttpXMLRequest (API) call
  console.log('hello from router.post')     // [???] THIS DOESNT SHOW ANYWHERE
  const apiurl = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const keyword = req.body.keywordname
  const apiKey = '&key=AIzaSyDAgz4khVLZpzTGuOxijphSzfJTtHQZrhs'
  var finalUrl = `${apiurl}${keyword}${apiKey}`

  // create new document(s) from the API results
  $.get(finalUrl).done(function(results){
    for (var i=0; i<results.results.length; i++) {
      var nameFromResults = results.results[i].name
      var newPlace = new PlaceModel ({ name: nameFromResults })
      //  populate the document into (save to) the DB
      newPlace.save(function (err, newPlace) {
        console.log(`new place ${newPlace} is saved`)
      })
    }
  })
  // redirect the page to the places page. This starts a get request
  res.redirect('/')
}

module.exports = {
  add
}
