const nodemailer = require('nodemailer');

module.exports = (data) => {
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'game.space2020proyect@gmail.com', // Cambialo por tu email
    pass: 'contrasena123' // Cambialo por tu password
    }
 });

const mailOptions = {
 from: `”${data.nombre} 👻” <${data.mail}>`,
 to: `${data.mail}`, // Cambia esta parte por el destinatario
 subject:'Compra con exito - Game Spaces 2020',
 html: `
 <strong>Nombre:</strong> ${data.customer_name} <br/>
 <strong>E-mail:</strong> ${data.email} <br/>
 <strong>Mensaje:</strong> "Correo para verificar la compra"

 <div> Tu orden # ${data.id} </div>
 <div> 
 <h2>La compra se hizo con exito.</h2>

 <p>
 Gracias por tu compra!
 </p>
 </div>
 `
 };

 
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}