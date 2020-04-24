    const MySQL = require ('../sql/database');
    const Games = require('../mongo/models/games-model')
    //const Users = require('../mongo/models/users-model');

    const create = (req, res) => {
        
        try {
            const { orderDetails } = req.body;
            
            const data = createOrder(req.body, function(err, response){
                if(err){
                    console.log('createOrder error', err.sqlMessage)
                    res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }

                addOrderDetails(response.insertId, orderDetails , function(err, response){
                    if(err){
                        console.log('createOrder error', err.sqlMessage)
                        res.status(500).send({status:'ERROR',data:err.sqlMessage});
                    }
                    
                    res.status(200).send({data:response});
                });

                
            });
            
        } catch (e) {
            console.log('createOrder error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    async function createOrder (data, callback){
        //MySQL
        const {total, customer_name, customer_lname, adress, city, state, country, phone, mail, status, user_id} = data;

            const order = {
                total, 
                customer_name, 
                customer_lname, 
                adress, 
                city, 
                state, 
                country, 
                phone, 
                mail, 
                status, 
                user_id
            };
        
        //console.log(response);
        await MySQL.query('INSERT INTO Orders set ? ;', [order], async function (err, result, fields) { 
            if (err) { 
            // handle error      
            callback(await err, null);
            
            }else{ 
            // Your row is inserted you can view 
            callback(null,  await result);
            }
            
        });
        
    }

    function addOrderDetails (Orders_id, data, callback){
        console.log(Orders_id);
        console.log(data);
        console.log(data.length);
        var i = 0;
        while (i < data.length) {
            console.log(i);
            const {game_id, quantity, discount} = data[i];
            const orderDetails = {
                Orders_id,
                game_id,
                quantity,
                discount
            }
            
            MySQL.query('INSERT INTO Orders_details set ? ;', [orderDetails], async function (err, result, fields) { 
                if (err) { 
                // handle error
                console.log(err.sqlMessage);
                callback(await err, null);
                }
            });
            i++;

        }
        callback(null, "Ok");

    };

    const getOrders = (req, res) => {
            
        try {
            
            MySQL.query('SELECT * FROM atiadmin_game_space.Orders;', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result);
                
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getOrders error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    const getOrdersDetails = (req, res) => {
            const{id} =  req.body
        try {
            
            MySQL.query('SELECT * FROM atiadmin_game_space.Orders_details WHERE Orders_id = ' + id + ';', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result[0]['game_id']);
                while (i < result.length) {
        
                }
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getOrders error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    function updateOrder (req, res){

            console.log(req.body);
            const {id, status} = req.body;

            
            MySQL.query('UPDATE `atiadmin_game_space`.`Orders` SET `status` = "'+status+'" WHERE (`id` = "'+id+'");', async function (err, result, fields) { 
                if (err) { 
                // handle error
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                res.status(200).send({status:"Ok", data:result});
            });
        
    };




//--------------------------------------------------- Estadisticas


    const getSalesMonth = (req, res) => {
            
        try {
            
            MySQL.query('SELECT monthname(created_at) as "Month", year(created_at) as "Year", sum(total) as "Total" FROM atiadmin_game_space.Orders group by month(created_at) order by created_at limit 12;', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result);
                
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getSalesMonth error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    const getProfits = (req, res) => {
        
        try {
            
            MySQL.query('SELECT sum(total) as "Total" FROM atiadmin_game_space.Orders;', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result);
                
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getProfits error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    const getProfitsMonth = (req, res) => {
        
        try {
            
            MySQL.query('SELECT created_at as "DATE", monthname(created_at) as "Month", count(created_at) as "Count", sum(total) as "Total" FROM atiadmin_game_space.Orders where month(created_at) = MONTH(CURRENT_DATE()) group by day(created_at) order by created_at;', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result);
                
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getProfitsMonth error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    const getOrdersPerMonth = (req, res) => {
        
        try {
            
            MySQL.query('SELECT monthname(created_at) as "Mes" , count(created_at) as "cantidad" FROM atiadmin_game_space.Orders group by month(created_at) order by created_at limit 12;', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result);
                
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getOrdersPerMonth error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    const getProfitsLastFiveMonths = (req, res) => {
        
        try {
            
            MySQL.query('SELECT monthname(created_at) as "Mes" , count(created_at) as "cantidad", sum(total) as "ganancias" FROM atiadmin_game_space.Orders group by month(created_at) order by created_at limit 5;', async function (err, result, fields) { 
                if (err) {
                console.log(err.sqlMessage);
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
                }
                console.log(result);
                
                res.status(200).send({status:"Ok", data:result});
                
            });
            
        } catch (e) {
            console.log('getProfitsLastFiveMonths error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

  const getTot=  async function (req,res) {
        try {
            const game_id =  req.body['ids'];
            var game = {};
            var juegos = {};
            var orderDetails = [];
            var total = 0 ;
            var unidades =req.body['ids'].length;

            for (let index = 0; index < req.body['ids'].length; index++) {
                
                game = await Games.find({_id:req.body['ids'][index]})
                total = total + game[0].price;
                juegos['total'] = total;
                orderDetails.push(
                    {
                        "game_id":game[0]._id,
                        "quantity":1,
                        "discount":0
                    }
                );
            }
            
            juegos['subtotal'] = total;
            juegos['unidades'] = unidades;
            juegos['orderDetails'] = orderDetails;

            const games = await Games.find({_id:game_id});
            res.status(200).send({status: "Ok", data: juegos});

        } catch (error) {
            res.status(500).send({status: "Error", message: "Error con los usuarios", error: error});
        }
    };


    module.exports = {create,
        getOrders,
        getOrdersDetails,
        updateOrder,
        getSalesMonth,
        getProfits,
        getProfitsMonth,
        getOrdersPerMonth,
        getProfitsLastFiveMonths,
        getTot};