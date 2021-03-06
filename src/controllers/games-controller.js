const Games = require('../mongo/models/games-model')
const Historia = require('../mongo/models/historia_model')
const MySQL = require ('../sql/database');

const createGame = async (req, res) => {
    console.log(req.body);
    try {
        const {
            url_file,
            url_miniatura,
            descripcion,
            tipo,
            duracion
        } = req.body;

        //Mongo
        const historia = await Historia.create({
            url_file,
            url_miniatura,
            descripcion,
            tipo,
            duracion
        });
        
        
        res.status(200).send({statis:"ok", message:"Se registro correctamente" ,data:historia})
    } catch (e) {
        console.log('createHistoria error', e)
        res.status(500).send({status:'ERROR',data:e.message})
    }
};


const getGames = async (req, res) => {
    
    try {
        const games = await Historia.find();
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


const registrarGames = async (req, res) => {
    console.log(req);
}

const gamebyid = async (req, res) => {
    try {

        const game = await Games.findById(
            req.params.id
        );
        res.status(200).send({status:"ok", data:game});
        
    } catch (error) {
        res.status(400).send({status:"Error", message:"No se encontro este juego"});
    }
}

const editGame = async (req, res) => {
    try {
        const game = await Games.updateOne({
            _id:req.params.id
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category,
                year: new Date(req.body.year).toISOString(),
                rank: req.body.rank,
            }
        });
        res.status(200).send({status:"Ok", message:"Se edito correctamente", data:game});
    } catch (error) {
        res.status(500).send({status:"error", message:"Hubo un problema con la conexion", data:error});
    }
}

const deleteGame = async (req, res) => {
    try {

        const game = await Games.deleteOne({
            _id:req.params.id
        });
        res.status(200).send({status:"Ok", message:"Se elimino correctamente", data:game});
    } catch (error) {
        res.status(500).send({status:"error", message:"Hubo un problema con la conexion", data:error});
    }
}

const favoritos = async (req, res) => {
    try {
        const games = [];
        for (let index = 0; index < req.body.favoritos.length; index++) {
            const game = await Games.findById({ _id:req.body.favoritos[index]});
             games.push( game);
        }
        
        res.status(200).send({status:"Ok", data:games});
    } catch (error) {
        res.status(500).send({status:"error", message:"Hubo un problema con la conexion", data:error});
    }
}

const carrito = async (req, res) => {
    try {
        const games = [];
        for (let index = 0; index < req.body.carrito.length; index++) {
            const game = await Games.findById({ _id:req.body.carrito[index]});
             games.push( game);
        }
        
        res.status(200).send({status:"Ok", data:games});
    } catch (error) {
        res.status(500).send({status:"error", message:"Hubo un problema con la conexion", data:error});
    }
}

//---------------------------------------------Estadisticas


const getGameBestSeler = (req, res) => {
        
    try {
        
        MySQL.query('SELECT game_id, sum(quantity) as "total" FROM atiadmin_game_space.Orders_details group by game_id order by total desc limit 1;', async function (err, result, fields) { 
            if (err) {
            console.log(err.sqlMessage);
            res.status(500).send({status:'ERROR',data:err.sqlMessage});
            }
            console.log(result[0]["game_id"]);

            const games = Games.findById(result[0]["game_id"], function(err, result){
                if(err){
                    res.status(500).send({status:'ERROR',data:err});
                }
                console.log(result);
                res.status(200).send({status:"Ok", data:result});
            });
            
        });
        
    } catch (e) {
        console.log('createOrder error', e)
        res.status(500).send({status:'ERROR',data:e.message});
    }
};

const getGamesLeastSeler = (req, res) => {
        
    try {
        
        MySQL.query('SELECT game_id, sum(quantity) as "total" FROM atiadmin_game_space.Orders_details group by game_id order by total asc limit 1;', async function (err, result, fields) { 
            if (err) {
            console.log(err.sqlMessage);
            res.status(500).send({status:'ERROR',data:err.sqlMessage});
            }
            console.log(result[0]["game_id"]);

            const games = Games.findById(result[0]["game_id"], function(err, result){
                if(err){
                    res.status(500).send({status:'ERROR',data:err});
                }
                console.log(result);
                res.status(200).send({status:"Ok", data:result});
            });
            
        });
        
    } catch (e) {
        console.log('createOrder error', e)
        res.status(500).send({status:'ERROR',data:e.message});
    }
};

module.exports = {  
    createGame, 
    deleteGame, 
    getGames , 
    getGamesbyCategory, 
    getNewRelease, 
    getGame_Search,
    getPopular, 
    getGames_Bestseller,
    gamebyid,
    editGame,
    deleteGame,
    favoritos,
    carrito,
    getGameBestSeler,
    getGamesLeastSeler
                }
