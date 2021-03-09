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
          path: `${path.join(__dirname, '../public/CV-Moura-Elias-NodeJS-Junior.pdf')}`,
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
      res.status(400).json({message: error.message})
    }
  }
}