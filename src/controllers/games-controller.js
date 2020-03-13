const Games = require('../mongo/models/games-model')

const createGame = async (req, res) => {
    try {
        const {title, price, image, description, rank, year,category} = req.body;

        const game = await Games.create({
            title,
            description,
            price,
            image,
            category,
            year,
            rank
        });
        res.status(200).send({data:game})
    } catch (e) {
        console.log('createProduct error', e)
        res.status(500).send({status:'ERROR',data:e.message})
    }
};

const deleteGame = (req, res) => {
    res.status(200).send({status:'OK', data:'hola'}) 
};

const getGames = async (req, res) => {
    try {
        const games = await Games.find();
        res.send({status:'OK',data:games})
    } catch (error) {
        console.log('getGames error',error);
        res.status(500).send({status:'ERROR', data:error.message})
    }
};

const getGamesbyCategory = async (req,res)=>{
    
    try {
        const games =  await Games.find({
            category:req.params.category
        });
        res.send({status:'OK',data:games})
    } catch (error) {
        console.log('getGames error',error);
        res.status(500).send({status:'ERROR', data:error.message})
    }
};

module.exports = { createGame, deleteGame, getGames , getGamesbyCategory};