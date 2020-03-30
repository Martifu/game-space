const mysql = require ('mysql');
const keys = require ('./Keys');

const con = mysql.createConnection(keys.database);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


module.exports = con;