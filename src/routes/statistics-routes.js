const express = require('express');
const gamesController = require('../controllers/games-controller');
const ordersController = require('../controllers/orders-controller');
const usersController = require('../controllers/users-controller');

const router = express.Router();

//Estadisticas
router.get('/BestSeler', gamesController.getGameBestSeler);
router.get('/LeastSeler', gamesController.getGamesLeastSeler);
router.get('/getSalesMonth', ordersController.getSalesMonth);
router.get('/getProfits', ordersController.getProfits);
router.get('/getProfitsMonth', ordersController.getProfitsMonth);
router.get('/getOrdersPerMonth', ordersController.getOrdersPerMonth);
router.get('/getProfitsLastFiveMonths', ordersController.getProfitsLastFiveMonths);
router.get('/getBestUser', usersController.getBestUser);
router.get('/getTotal', ordersController.getTot);

module.exports = router;