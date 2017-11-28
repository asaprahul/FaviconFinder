const link = require('./link')
const app = require('express')()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser');

const db = require('./db/favicons.json')

//Express Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  res.send(db)
})

/* API Part*/

app.post('/api', async function(req, res){
  console.log("Request recieved for: ")
  console.log(req.query)
  let data = await link(req.query.url)
  console.log(data)
  res.send(data.favicon)
})
