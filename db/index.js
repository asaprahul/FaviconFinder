/* Author: Rahul sonwalkar (github.com/rahulsonwalkar)

Database Simulator

Simulates a simple NoSQL DB for the prototype of faviconFinderApp
*/

const fs = require('fs')
const data = require('./favicons.json')
const domain = require('extract-domain')

//Insertion Operation
exports.insert = function(url, favicon) {

  let tempObject = {      //Create a temporary Object
    id: data.length + 1,
    url: url,
    favicon: favicon
  }

  data.push(tempObject)   //Push the object to the Array

  fs.writeFile('./db/favicons.json', JSON.stringify(data, null, 4),(err) => {});   //Write to the db/favicons.json
}

//Find an object with the given URL
exports.get = function(url) {

  let object = data.find(function(element) {
    return element.url === url
  })
  
  if(object)
    return object  //Returns the Object if FOUND
  else
    return false  //Returns False if NOT FOUND
}

//Get all the Favicons
exports.getAll = function() {
  return data
}

exports.getByDomain = function(url) {

  console.log("> ", "> ")
  let object = data.filter(function(element) {
    console.log(domain(element.url))
    if(domain(element.url) === domain(url))
      return element
  })
  console.log(object)
  console.log("> ", "> ")
  if(object)
    return object[0]  //Returns the Object if FOUND
  else
    return false  //Returns False if NOT FOUND
}
