const nodemailer = require("nodemailer");
require ('dotenv').config();
// import * as sgTransport 'nodemailer-sendgrid-transport'

const mailConfig = {
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
}

// transporter.verify( () => {
//   console.log('Ready for send emails')
// }) 

module.exports =  nodemailer.createTransport(mailConfig) 