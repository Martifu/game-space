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
        while (i < data.length - 1) {
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


    module.exports = {create};