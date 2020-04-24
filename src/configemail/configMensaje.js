const nodemailer = require('nodemailer');

module.exports = (data) => {
   console.log(data);
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'game.space2020proyect@gmail.com', // Cambialo por tu email
    pass: 'contrasena123' // Cambialo por tu password
    }
 });

const mailOptions = {
 from: `Compra con exito - Game Spaces 2020`,
 to: `${data.mail}`, // Cambia esta parte por el destinatario
 subject:'Game Spaces 2020',
 html: `
 <strong>Nombre:</strong> ${data.customer_name} <br/>
 <strong>E-mail:</strong> ${data.mail} <br/>
 <strong>Mensaje:</strong> 
 "Correo para verificar la compra"


 <div> 
 <h2>La compra se hizo con exito.</h2>

 <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
 
 <tr>
    <td style="background-color: #642EFE">
       <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #00FF80; margin: 0 0 7px">Tu orden # ${data.id} </h2>
          <p style="margin: 2px; font-size: 15px">
             Gracias por la compra en nuestra tienda de juegos
          <div>
          Puedes descargar la app y obtener mas juegos
          :)
          </div>
          <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
            
          </div>
          <div style="width: 100%; text-align: center">
            
          </div>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Game-Space 2020</p>
       </div>
    </td>
 </tr>
</table>

 `
 };

 
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}