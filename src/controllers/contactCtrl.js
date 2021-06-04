const path = require('path');
const Contact = require('../models/Contact');
const transporter = require('../mailer/mailer');

module.exports = {
  addContact: async (req, res) => {
    try {
      const { email } = req.body;

      const newContact = new Contact({email})
      const task = await newContact.save()
      let mailOptions = {
        from: '<d.eliasmoura2@gmail.com>',
        to: email,
        subject: 'CV Moura Elias Dev Jr + - Node.js',
        html: `<h1>Gracias por visitar mi CV online.</h1>
        <p>Mi nombre es Elias, hace aproximadamente un año y dos meses trabajo como desarrollador Backend JavaScript Jr, en el cual he ganado experiencia en el desarrollo de aplicaciones web y APIs REST, con Node.js, Express.js, JWT, Passwport.js, MySQL, Sequelize, mongoDB y mongoose.</p>
        <p>
        Además, cuento con conocimiento en HTML, CSS, Javascript, Bootstrap, Git y Github, linux, conocimientos básicos en ReactJS y tengo un nivel B1 de Inglés.
        </p>
        <p>
        Me formo de manera autodidacta, en todo lo que se refiere al desarrollo con Nodejs y Reactjs, pero en este momento me encuentro haciendo la Diplomatura en programación web full stack con Node.js y React.js dictada por la UTN, sigo mejorando mi inglés dando clases con profesores particulares y tengo pensado aprender sobre patrones de diseño, TDD, DDD, Typescript y Docker.
        </p>
        <p>
        Mi CV esta adjunto al email y estoy a su entera disposición para cualquier duda que tengan.
        </p>
        <p>
        Agradeciéndole su atención le saluda atentamente,
        </p>
        <p>Damian Elias Moura.</p>
              `,
        attachments: [{
          filename: "CV-Moura-Elias-Node-Jr+.pdf",
          path: `${path.join(__dirname, '../public/CV-Moura-Elias-Node-Jr+.pdf')}`,
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
    } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
    }
  }
}