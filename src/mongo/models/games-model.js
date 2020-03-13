const mongoose = require('mongoose');
const {Schema} = mongoose;

const gamesSchema = new Schema({
    title: {type:String, required:true},
    description:  {type:String, required:true},
    price:  {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true},
    year: {type:String, required:true},
    rank: {type:Number, required:true},
},
{
    timestamps:true
});

const model = mongoose.model('Game', gamesSchema);

module.exports = model;