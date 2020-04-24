const confmensaje = require('../configemail/configMensaje');

const sendMensaje = async (req, res) => {

    try {
        confmensaje(req.body);
        res.status(200).send({Status:"Ok", message:"Correo enviado"});
    } catch (error) {
        res.status(404).send({status:"error", error:error});
    }
    
}


module.exports = { sendMensaje };