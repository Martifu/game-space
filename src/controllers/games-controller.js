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

const deleteGame = async  (req, res) => {
    const games = await Games.find();
        res.send({status:'OKa',data:games});
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

const getNewRelease = async (req,res) => {
    try {

        const games = await Games.find({
            year:{ "$gte":  new Date('2020-01-01').toISOString()}
        });

        res.status(200).send({"status":"Ok", data:games});

    } catch (error) {
        res.status(500).send({"status":"Error",error:error.message});
    }

};

const getGame_Search = async (req, res) =>{
    
    try {
        
        
            const games = await Games.find({
                $or:[
                    {title: { $regex: req.params.data, $options: 'i' }},
                    {description:  { $regex: req.params.data, $options: 'i' }},
                    {category: { $regex: req.params.data, $options: 'i' }},

                ]
            })
        
        
        
        res.status(200).send({'status':"ok", data:games});
    } catch (error) {
        res.status(500).send({"status":"Error",error:error.message});
    }
};

const  getPopular= async (req,res)=>{
    try {
        const game = await Games.find({
            title:{
                $eq:req.params.rank
            }
        })
        res.status(200).send({'status':"ok", data:game});
    } catch (error) {
        res.status(500).send({"status":"Error",error:error.message});
    }

};

const getGames_Bestseller = async (req, res) => {
    try {
        const games = await Games.find();
        res.send({status:'OK',data:games})
    } catch (error) {
        console.log('getGames error',error);
        res.status(500).send({status:'ERROR', data:error.message})
    }
};

module.exports = { createGame, deleteGame, getGames , getGamesbyCategory, getNewRelease, getGame_Search, getPopular, getGames_Bestseller};