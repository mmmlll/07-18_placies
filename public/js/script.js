$(function () {
  const $placeSearch = $('#placeSearch')
  // note: we had a crossorigin issue, so we added on a workaround at the beginning of the URL:
  const apiurl = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const keyword = ''
  const apiKey = '&key=AIzaSyDAgz4khVLZpzTGuOxijphSzfJTtHQZrhs'

  $placeSearch.on('submit', function(e){
    e.preventDefault()
    // console.log(this)
    var keywordObj = $(this).serializeArray() // "this" is the form element (as an object), which triggered the function(e). can also use just ".serialize()", which returns a string rather than an object
    // you MUST assign the "name" attribute to your input, otherwise serializeArray cannot work! It needs to assign the name you chose to the key in the form object
    // console.log(keywordObj)
    var qString = `query=${keywordObj[0].value}`
    var finalUrl = `${apiurl}${qString}${apiKey}`
    // $.get(finalUrl).done(function(results){
      // console.log(results)
    // })
  })
})
