const express = require('express');
const app = express()
const puppeteer = require('puppeteer');
const path = require('path')
const logger = require('morgan')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Statics files
app.use('/public', express.static(`${path.join(__dirname, 'public')}`))

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.render('index')
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
    path: "CV-Moura-Elias-Fullstack-MERN-Junior.pdf",
    format: "A4",
  });

  await browser.close();
})

app.set('port', process.env.PORT || 4000)
const port = app.get('port')
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

// const pdf = require('pdf-creator-node')
// const fs = require('fs')

// // Read HTML template
// var html = fs.readFileSync('index.html', 'utf8');

// var options = {
//   format: "A4",
//   orientation: "portrait",
//   border: "1mm",
//   // header: {
//   //     height: "45mm",
//   //     contents: `<div style="text-align: center;">Author: Elias Moura</div>`
//   // },
//   // "footer": {
//   //     "height": "28mm",
//   //     "contents": {
//   //     first: 'Cover page',
//   //     2: 'Second page', // Any page number is working. 1-based index
//   //     default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//   //     last: 'Last Page'
//   //   }
//   // }
// }

// var users = [
//   {
//       name:"Elias",
//       age:"26"
//   },
//   {
//       name:"Milagros",
//       age:"26"
//   },
//   {
//       name:"Rodrigo",
//       age:"26"
//   }
// ]
// var document = {
//   html: html,
//   data: {
//       users: users
//   },
//   path: "./output.pdf"
// };

// pdf.create(document, options)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(error => {
//         console.error(error)
//     });


// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();

// app.get('/', (req, res) => {
//   res.render('index')
// })

// app.get('/pdf', async (req, res) => {
//   // const url = req.query.target
//   const browser = await puppeteer.launch({
//     headless: true
//   });
  
//   const webPage = await browser.newPage();
  
//   await webPage.goto(url, {
//     waitUntil: "networkidle0"
//   });


//   const url = "file:///home/elias/projects/node/cv-node/index.html";
  

//   await webPage.goto(url, {
//     waitUntil: "networkidle0"
//   });

//   await webPage.pdf({
//     printBackground: true,
//     path: "webpage.pdf",
//     format: "A4",
//     margin: {
//         top: "1px",
//         bottom: "1px",
//         left: "1px",
//         right: "1px"
//     }
//   });

//   await browser.close();
// })