const mongoose = require('mongoose');
const {Schema} = mongoose;

const gamesSchema = new Schema({
    title: {type:String, required:true},
    description:  {type:String, required:true},
    price:  {type:Number, required:true},
    image: {type:String, required:false},
    category: {type:String, required:true},
    year: {type:Date, required:true},
    rank: {type:Number, required:true},
    sales: {type:Number, required:false, default:0},
},
{
    timestamps:true
});

const model = mongoose.model('Game', gamesSchema);

module.exports = model;