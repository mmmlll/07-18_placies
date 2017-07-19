const PlaceModel = require('../models/Places')
// const bodyParser = require('body-parser')    // *** i DO NOT need this here; need this in index.js where the function/code is actually RUN, not where it is referred to (e.g. here it is defined within a function)
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest   // IN CONTRAST, i need this here, because xmlhttprequest is run here, i.e. (). This si conflicting information; Is what he said above RUBBISH?

function add (req, res){
  // grab the info submitted, run the HttpXMLRequest (API) call
  console.log('hello from router.post')

  // create new document(s) from the API results
  const xhr = new XMLHttpRequest()
  const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const keyword = `query=${req.body.keywordname}`
  const apiKey = '&key=AIzaSyDAgz4khVLZpzTGuOxijphSzfJTtHQZrhs'
  var url = `${apiurl}${keyword}${apiKey}`
  xhr.open('GET', url, false)
  xhr.send()        // *** [???] not sure what this is for, but without it the request fails
  // console.log(`results: ${results}`)
  const dataObj = JSON.parse(xhr.responseText)
  const resultsArr = dataObj.results
  // console.log(results[0])
  // res.send({
    // results: results,
    // responseText: results.responseText,
    // parsed_responseText: dataObj,
    // url: url
  // })

  // clear the DB before re-populating with the new search results
  PlaceModel.remove({}, function (err) {
    if (err) throw err
  })

  // $.get(finalUrl).done(function(results){             // *** jQuery can only be read in the browser!
  for (var i=0; i<resultsArr.length; i++) {
    let nameFromResults = resultsArr[i].name
    // console.log(nameFromResults)
    let newPlace = new PlaceModel ({ name: nameFromResults })
    //  populate the document into (save to) the DB
    newPlace.save(function (err, newPlace) {
      // console.log(`new place ${newPlace} is saved`)
    })
  }
  // })
  // redirect the page to the places page. This starts a get request
  res.redirect('/places')
}

module.exports = {
  add
}
