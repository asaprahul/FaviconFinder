const fs = require('fs')
const parse = require('csv-parse')
const request = require('request')
const needle = require('needle')

const getRawLinks = async function(){
  return new Promise(function(resolve, reject){
    parse(fs.readFileSync('../db/alexa.csv'), {columns: false, trim: true}, function(err, rows) {
      //First 200,000 links
      let links = rows.slice(0, 500).map(value => {
        return value.undefined
      })
      resolve(links)
    })
  })
}

const combinations = async function(){
  let links = await getRawLinks()
  for(i in links){
    makeRequest('http://'+links[i])
    // makeRequest('https://www.'+links[i])
    // makeRequest('http://www.'+links[i])
    makeRequest('https://'+links[i])
  }
}

const makeRequest = function(link){

  needle.post('localhost:5000/api', {url:link},
      function(err, resp, body){
          console.log(body);
  })
}

combinations()
