const MySQL = require ('../sql/database');
//const Games = require('../mongo/models/games-model')
//const Users = require('../mongo/models/users-model');

const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        //MySQL
        const {Users_id, total} = req.body;
        

        const order = {
            Users_id, 
            total
        };

        var newOrderId = 0;
        await MySQL.query('INSERT INTO Orders set ?', [order], function(err, result, fields) { 
            if (err) { 
             // handle error 
             console.log(err);
            }else{ 
             // Your row is inserted you can view 
             var newOrderId = result.insertId; 
             
            }});
            
        
        //res.status(200).send({data:order})
    } catch (e) {
        console.log('createOrder error', e)
        res.status(500).send({status:'ERROR',data:e.message})
    }
};

const createOrderDetails = async (req, res) => {
    try {
        console.log(req.body);
        await createOrder(req);
        
        
        res.status(200).send({data:req.body})
    } catch (e) {
        console.log('createOrder error', e)
        res.status(500).send({status:'ERROR',data:e.message})
    }
};


module.exports = {createOrderDetails};