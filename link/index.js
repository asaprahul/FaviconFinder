const cheerio = require('cheerio')    //Parse HTML
const request = require('request')    //Make HTTP Requess to Webpages
const db = require('../db')           //Connect to custom DB simulator
const dateTime = require('node-datetime')    //Log Date and Time


/* Main Function: First check for URL in Database, else use other 2 methods to find Favicon url*/
const findFaviconLink = async function(url) {
  console.log("<",dateTime.create().format('H:M'),"> PROCESSING: ", url)  //Log a Request
  try{
    let link = await db.get(url)    //First check in the DB
    if(link)
      return link
    else
      throw "DB: Couldn't find Favicon link for " + url
  }
  catch(e) {                       //IF NOT FOUND then try other methods
    console.log(e)
    console.log("Trying to get Link from the webpage")
    return await getFaviconLink(url)
  }
}

/*Get link to Favicon from Internet */
const getFaviconLink = async function(url) {
  try{                           //Try if example.com/favicon.ico works
    let link = await getLinkFromURL(url)
    if(link){
      db.insert(url, link)       //IF FOUND, insert into DB and return the Link
      //return link
      return db.get(url)
    }
    else {
      console.log(link)
      throw "Couldn't find favicon at " + url + "/favicon.ico"
    }
  }
  catch(e) {                      //ELSE Find it in the HTML source of the webpage
    console.log(e)
    let link = await getLinkFromHTML(url)
    db.insert(url, link)
    //return link
    return db.get(url)
  }
}

/* Get HTML of example.com's index page and parse for favicon */
const getLinkFromHTML = function(url) {

  return new Promise(function (resolve, reject){
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(body)
        let linkHrefs = $('link').map(function(i) {      //Get all <link> tags
          if($(this).attr('href').includes('.ico'))      //Filter <link> hrefs with '.ico' in them
            return $(this).attr('href')
        }).get()

        setTimeout(() => {                //If NOT FOUND in 6 seconds, respond with FALSE
          console.log("<<<TIMEOUT REACHED>>>")
          resolve(false)
        }, 6000)
        resolve(linkHrefs[0]);

      }
    })
  })

}

/* Try to find Favicon on example.com/favicon.ico */
const getLinkFromURL = function(url) {

  return new Promise(function (resolve, reject){
    request(url + '/favicon.ico', function (error, response, body) {
      if (!error && response.statusCode == 200){
        resolve(url + '/favicon.ico')   //IF FOUND return example.com/favicon.ico
      }
      else
        resolve(false) //FALSE if NOT FOUND in example.com/favicon.ico
    })
  })

}

module.exports = findFaviconLink

// Test:
//findFaviconLink("http://zoox.com")

//Test:
// getFaviconLink('http://crayon.co').then((result) => {
//   //console.log("This is the link: " + result)
//   db.insert('http://crayon.co', result)
//   return result
// })
