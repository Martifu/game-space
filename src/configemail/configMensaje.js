const nodemailer = require('nodemailer');

module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    user: 'game.space2020proyect', // Cambialo por tu email
    pass: 'contrasena123' // Cambialo por tu password
    }
 });

const mailOptions = {
 from: `”${formulario.nombre} 👻” <${formulario.email}>`,
 to: `${formulario.email}`, // Cambia esta parte por el destinatario
 subject:'Compra con exito - Game Spaces 2020',
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}

 <div> Tu orden # ${formulario.orden_id} </div>
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