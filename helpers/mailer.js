const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({ 
  service: 'Gmail', 
  auth: { 
    user: process.env.mail, 
    pass: process.env.pass
  } 
})

exports.welcomeMail = (username, email, password) => {
  transporter.sendMail({
    from: '"🍻 Cervecería Allende 🍻" <contacto@allende.com>',
    to: email,
    subject: 'Bienvenido al panel de administración de Allende',
    html:
      `
        <h2>Bienvenido ${username}.</h2> 
        <br/>
        <h3>Puedes acceder y cambiar tu password en el siguiente link:</h3>
        <br/>
        <a href='http://localhost:3000/active?user=${email}?h4$h=${password}' target='_blank' > Cervecería Allende </a>
      `
  }).then(info => console.log(info)).catch(error => console.log(error))
}