const express = require('express');
const app = express();
const cors = require('cors');
var nodemailer = require('nodemailer');

app.use(cors());

app.get('/send-email', function(req, res) {
  let name = req.query.name;
  let email = req.query.email;
  let number = req.query.number;
  let message = req.query.message;
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });
  const mailOptions = {
    from: 'gjethwani1@gmail.com', // sender address
    to: 'gjethwani1@gmail.com', // list of receivers
    subject: 'Contact from personal website', // Subject line
    html: `<h3>Name: ${name}</h3><h3>Number: ${number}</h3><h3>Email: ${email}</h3><h3>Message:</h3><p>${message}</p>`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      res.status(400).json({
        error: err
      })
    } else {
      res.status(200).json({
        success: info
      })
    }
  });
});


const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
