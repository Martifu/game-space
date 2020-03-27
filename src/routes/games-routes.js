const express = require('express');
const gamesController = require('../controllers/games-controller');

const router = express.Router();

router.post('/create', gamesController.createGame);
router.get('/get-games', gamesController.getGames);
router.get('/delete', gamesController.deleteGame);
router.get('/get-games-category/:category', gamesController.getGamesbyCategory);
router.get('/new-release', gamesController.getNewRelease);
router.get('/search/:name', gamesController.getGame_Search);
router.get('/populares',gamesController.getPopular);
module.exports = router;