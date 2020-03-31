const express = require('express');
const gamesController = require('../controllers/games-controller');

const router = express.Router();

//CRUD juegos
router.post('/create', gamesController.createGame);
router.get('/delete/:id', gamesController.deleteGame);
router.get('/gamebyid/:id', gamesController.gamebyid);
router.post('/editgame/:id', gamesController.editGame);
//Aqui termina el CRUD

//Rutas sobre juegos
router.get('/get-games', gamesController.getGames);
router.get('/get-games-category/:category', gamesController.getGamesbyCategory);
router.get('/new-release', gamesController.getNewRelease);
router.get('/populares',gamesController.getPopular);
router.get('/search/:data', gamesController.getGame_Search);
router.get('/bestseller', gamesController.getGames_Bestseller);

module.exports = router;