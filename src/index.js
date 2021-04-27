const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path')
const logger = require('morgan');
const contactCtrl = require('./controllers/contactCtrl')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const app = express()
require('./config/database')

// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// // Static files
// app.use(express.static(path.join(__dirname, "public")));


app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// Statics files
app.use('/public', express.static(`${path.join(__dirname, 'public')}`))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/prueba', (req, res) => {
  res.render('mern')
})

app.get('/pdf', async (req, res) => {
  // const url = req.query.target
  const browser = await puppeteer.launch({
    headless: true
  });
  
  const webPage = await browser.newPage();
  const url = process.env.HOST;

  await webPage.goto(url, {
    waitUntil: "networkidle2"
  });

  await webPage.pdf({
    printBackground: true,
    path: `./src/public/pdf/${Date.now()}-CV-Moura-Elias-MERN-Junior.pdf`,
    format: "A4",
  });

  await browser.close();
  res.redirect('/')
})


app.post('/send-email', contactCtrl.addContact)


app.set('port', process.env.PORT || 4000)
const port = app.get('port')
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})