const MySQL = require ('../sql/database');
//const Games = require('../mongo/models/games-model')
//const Users = require('../mongo/models/users-model');

const create = (req, res) => {
    
    try {
        
        const data = createOrder(req.body, function(err, response){
            if(err){
                console.log('createOrder error', err.sqlMessage)
                res.status(500).send({status:'ERROR',data:err.sqlMessage});
            }

            createOrderDetails();

            res.status(200).send({data:response.insertId});
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

const createOrderDetails = async (data, res) => {
    
    console.log(data);
        
};


module.exports = {create};