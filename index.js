const link = require('./link')
const app = require('express')()
const nunjucks = require('nunjucks')

nunjucks.configure('', {
    autoescape: true,
    express: app
})

app.get('/link', async function(req, res){
  if(req.query.url){
    res.send(await link(req.query.url))
  }
})

app.listen(5000)

app.get('/', async function(req, res){
  //res.send(await link(req.query.url))
  if(req.query.url){
    let theThing = await link(req.query.url)
    console.log(theThing)
    res.render('html/index.html', {url : theThing.url, favicon: theThing.favicon})
  }
  else
    res.render('html/index.html')

})
