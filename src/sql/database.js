const mysql = require ('mysql');
const { promisify } = require('util');
const keys = require ('./Keys');

const con = mysql.createPool(keys.database);

con.getConnection(function(err, connection) {
    if (err){
      if (err.code === 'PROTOCOL_CONECCTION_LOST'){
        console.log('Coneccion con la base de datos serrada');
      }
      if (err.code === 'ER_CON_COUNT_ERROR'){
        console.log('La base de datos tiene muchas conecciones');
      }
      if (err.code === 'ECONNREFUSED'){
        console.log('La coneccion con la base de datos a sido rechasada');
      }
    }
    if(connection) connection.release();
    console.log("DB is Connected!");
    return
});

con.query = promisify(con.query);
module.exports = con;