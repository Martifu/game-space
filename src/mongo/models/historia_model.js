const mongoose = require('mongoose');
const {Schema} = mongoose;

const historiasSchema = new Schema({
    title: {type:String, required:true},
    url_file:  {type:String, required:true},
    url_miniatura:  {type:String, required:true},
    descripcion:  {type:String, required:true},
},
{
    timestamps:true
});

const model = mongoose.model('Historia', historiasSchema);

module.exports = model;