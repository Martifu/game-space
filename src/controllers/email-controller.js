const confmensaje = require('../configemail/configMensaje');

const sendMensaje = async (req, res) => {

    try {
        let resp = confmensaje(req.body)
        if (resp) {
        res.status(200).send({Status:"Ok", message:"Correo enviado"});

        } else {
        res.status(404).send({Status:"error", message:"Error en el envio del correo"});

        }

    } catch (error) {
        res.status(404).send({status:"error", error:error});
    }
    
}


module.exports = { sendMensaje };