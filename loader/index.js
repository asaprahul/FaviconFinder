const fs = require('fs')
const parse = require('csv-parse')
const request = require('request')
const getRawLinks = async function(){
  return new Promise(function(resolve, reject){
    parse(fs.readFileSync('../db/alexa.csv'), {columns: false, trim: true}, function(err, rows) {
      //First 200,000 links
      let links = rows.slice(0, 20).map(value => {
        return value.undefined
      })
      resolve(links)
    })
  })
}

// fs.readFileSync('../db/alexa.csv', function (err, fileData) {
//   parse(fileData, {columns: false, trim: true}, function(err, rows) {
//     //First 200,000 links
//     links = rows.slice(0, 200000).map(value => {
//       return value.undefined
//     })
//   })
// })

const combinations = async function(){
  let links = await getRawLinks()
  for(i in links){
    makeRequest('http://'+i)
    makeRequest('https://'+i)
    makeRequest('http://www.'+i)
    makeRequest('https://www.'+i)
  }
}

const makeRequest = function(link){
  request({
    url: 'https://rahulfaviconfinder.herokuapp.com/api',
    method: 'POST',
    headers: '',
    form: {
      'url' : link
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
  })
}

combinations()
