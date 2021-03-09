const nodemailer = require("nodemailer")
// import * as sgTransport 'nodemailer-sendgrid-transport'

const mailConfig = {
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  auth: {
    user: 'd.eliasmoura2@gmail.com',
    pass: 'iqggisyqpedchiij'
  }
}

// transporter.verify( () => {
//   console.log('Ready for send emails')
// }) 

module.exports =  nodemailer.createTransport(mailConfig) 