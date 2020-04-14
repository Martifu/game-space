    const MySQL = require ('../sql/database');
    //const Games = require('../mongo/models/games-model')
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
            console.log('createOrder error', e)
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
            console.log('createOrder error', e)
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
            console.log('createOrder error', e)
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
            console.log('createOrder error', e)
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
            console.log('createOrder error', e)
            res.status(500).send({status:'ERROR',data:e.message});
        }
    };

    async function getTot(res,req) {
        try {
            const game_id = req.body;
            const games = await Games.find({game_id});
            res.status(200).send({status: "Ok", data: games});

        } catch (error) {
            res.status(500).send({status: "Error", message: "Error con los usuarios", error: error});
        }
    };


    module.exports = {create,
        getSalesMonth,
        getProfits,
        getProfitsMonth,
        getOrdersPerMonth,
        getProfitsLastFiveMonths,
        getTot};