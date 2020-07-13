const mongoose = require('mongoose');
const {Schema} = mongoose;

const historiasSchema = new Schema({
    url_file:  {type:String, required:true},
    url_miniatura:  {type:String, required:true},
    descripcion:  {type:String, required:true},
    tipo:  {type:String, required:true},
    duracion:  {type:Number, required:true},
},
{
    timestamps:true
});

const model = mongoose.model('Historia', historiasSchema);

module.exports = model;