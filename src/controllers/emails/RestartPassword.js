let nodemailer = require('nodemailer')
function email(email, text) {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL
      }
    })
    let mailConfig = {
      form: process.env.EMAIL,
      to: email,
      subject: "CODE TO RESTART PASWORD",
      html: `
<html>
  <head>
  </head>
  <body style="
    font-size: 38px;
    font-weight: bold;
    text-align: center;
">
    The Code : ${text}
  </body>
</html>`,
    }
    transport.sendMail(mailConfig, function (er, info) {
      if (er) {
        reject(er)
      }
      resolve(info)
    })
  })
}

module.exports = email