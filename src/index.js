const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path')
const logger = require('morgan');
const transporter = require('./mailer/mailer');
const { urlencoded } = require('express');

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const app = express()

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
  res.render('prueba')
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
    path: `./src/public/pdf/${Date.now()}-CV-Moura-Elias-Node-Junior.pdf`,
    format: "A4",
  });

  //await browser.close();
  res.redirect('/')
})

app.post('/send-email', (req, res) => {
  const email = req.body.email
  // console.log(email)
  // const transporter = nodemailer.createTransport({})
  // console.log(path.join(__dirname, './public/cv-Moura-Elias.pdf'))
  let mailOptions = {
    from: '<d.eliasmoura2@gmail.com>',
    to: email,
    subject: 'CV Moura Elias - Dev Junior Node.js',
    html: `<h1>Gracias por visitar mi CV online.</h1>
    <p>Mi nombre es Elias, hace aproximadamente un año y dos meses trabajo como desarrollador Backend JavaScript Jr, en el cual he ganado experiencia en el desarrollo de aplicaciones web monolíticas y APIs RESTFul para aplicaciones móviles y aplicaciones web, con Node.js, Express.js, TypeORM, JWT, Passwport.js, MySQL y mongoDB.<br>
    Además, cuento con conocimiento en HTML, CSS, Javascript, Bootstrap, Git y Github, linux, conocimientos básicos en ReactJS y tengo un nivel B1 de Inglés.<br>
    Me formó de manera autodidacta, en todo lo que se refiere al desarrollo con Nodejs y Reactjs, por ahora me encuentro aprendiendo mejores prácticas para el desarrollo de APIs con Node y Express, ReactJs, mejorando mi inglés y tengo pensado aprender sobre patrones del diseño, TDD, DDD, Typescript y Docker.<br>
    Mi CV esta adjunto al email y estoy a su entera disposición para cualquier duda que tengan.<br>
    Agradeciéndole su atención le saluda atentamente,<br><br>
    Damian Elias Moura.</p>
          `,
    attachments: [{
      filename: "CV-Moura-Elias-NodeJS-Junior.pdf",
      path: `${path.join(__dirname, '/public/cv-Moura-Elias.pdf')}`,
      contentType: "application/pdf"
    }], function (err, info) {
      if(err){
      console.error(err);
      res.send(err.message);
      }
      else{
      console.log(info);
      res.send(info);
      }
    }
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) res.status(500).send(error.message)

    console.log('Send Email')
    return res.redirect('/')
  })
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