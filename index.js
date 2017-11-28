const link = require('./link')
const app = require('express')()
const nunjucks = require('nunjucks')

//Configure Nunjucks Templating Engine
nunjucks.configure('', {
    autoescape: true,
    express: app
})

//Listen on Default Port or Port 5000
app.listen(process.env.PORT || 5000)

//Process for all requests on "/"
app.get('/', async function(req, res){

  if(req.query.url){                //IF a url is received
    let theThing = await link(req.query.url)
    console.log(theThing)
    res.render('html/index.html', {url : theThing.url, favicon: theThing.favicon})  //Generate HTML with Template
  }
  else                            //ELSE just respond with basic HTML
    res.render('html/index.html')

})

//GET all files in the DB
app.get('/db', function(req, res){
  res.writeFile('./db/favicons.json')
})
