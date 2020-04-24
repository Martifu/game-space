const express = require('express');
const emailController = require('../controllers/email-controller');

const router = express.Router();


router.post('/sendEmail', emailController.sendMensaje);

module.exports = router;