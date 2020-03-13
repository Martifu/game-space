const express = require('express');
const routesv1 = require('./routes/index.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var mongoose = require('mongoose');

dotenv.config();

const app = express();



app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json()); 
routesv1(app);


const PORT = process.env.PORT || 4000;


mongoose.connect('mongodb+srv://martin:game-space97@game-space-nnfa0.gcp.mongodb.net/testv', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conected to Mongo')
}).catch(err=>{
    console.log(err)
});

app.listen(PORT, function() {
    console.log('Corriendo en puerto 4000');
});