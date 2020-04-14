const express = require('express');
const {isAuth,isValidHostname} = require('../middlewares/auth')

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post('/update', isAuth, usersController.updateUser);
router.post('/delete/:id', usersController.deleteUser);
router.get('/get-users', usersController.getUsers);
router.get('/getusersById/:id', usersController.userById);
router.get('/get', usersController.gett);


module.exports = router;