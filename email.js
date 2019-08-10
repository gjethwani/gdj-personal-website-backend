require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
var nodemailer = require('nodemailer');

const client = require('@sendgrid/mail')

app.use(cors());

client.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = function(mailOptionsObject) {

  const msg = {
    to: mailOptionsObject.toAddress,
    from: 'gjethwani1@gmail.com',
    subject: mailOptionsObject.subject,
    html: mailOptionsObject.message,
    content: mailOptionsObject.content
  };

  const status = client.send(msg)
  return status;

};

app.get('/send-email', function(req, res) {
  let name = req.query.name;
  let email = req.query.email;
  let number = req.query.number;
  let message = req.query.message;
  
  sendEmail({
    toAddress: 'gjethwani1@gmail.com',
    subject: 'Contact from personal website',
    data: {  // data to view template, you can access as - user.name
       name: 'Gautam Jethwani',
       message: `<h3>Name: ${name}</h3><h3>Number: ${number}</h3><h3>Email: ${email}</h3><h3>Message:</h3><p>${message}</p>`
    },
    content: [{
      type: 'text/html',
      value: `<h3>Name: ${name}</h3><h3>Number: ${number}</h3><h3>Email: ${email}</h3><h3>Message:</h3><p>${message}</p>`
    }]
  }).then(() => {
    return res.send('Email has been sent!');
  }).catch((error) => {
    console.log(error)
    // console.log(error.response.body.errors)
    return res.send('There was an error sending the email');
  })
});


const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});