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
 from: `”${data.customer_name} 👻” <${data.mail}>`,
 to: `${data.mail}`, // Cambia esta parte por el destinatario
 subject:'Compra con exito - Game Spaces 2020',
 html: `
 <strong>Nombre:</strong> ${data.customer_name} <br/>
 <strong>E-mail:</strong> ${data.mail} <br/>
 <strong>Mensaje:</strong> 
 "Correo para verificar la compra"


 <div> 
 <h2>La compra se hizo con exito.</h2>

 <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
 <tr>
    <td style="background-color: #ecf0f1; text-align: left; padding: 0">
    <div> Tu orden # ${data.id} </div>
    </td>
 </tr>

 <tr>
    <td style="padding: 0">
       <img style="padding: 0; display: block" src="../assets/img/ipgone.png" width="50%">
    </td>
 </tr>
 
 <tr>
    <td style="background-color: #ecf0f1">
       <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
          <h2 style="color: #e67e22; margin: 0 0 7px">Hola Poketrainer!</h2>
          <p style="margin: 2px; font-size: 15px">
             Gracias por la compra en nuestra tienda de juegos
          <ul style="font-size: 15px;  margin: 10px 0">
             <li>Batallas amistosas.</li>
             <li>Torneos Oficiales.</li>
             <li>Intercambios de Pokémon.</li>
             <li>Actividades de integración.</li>
             <li>Muchas sorpresas más.</li>
          </ul>
          <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
            
          </div>
          <div style="width: 100%; text-align: center">
            
          </div>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Poketrainers Trujillo 2016</p>
       </div>
    </td>
 </tr>
</table>
<!--hasta aquí-->
 `
 };

 
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}