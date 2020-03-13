const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {type:String, required:true,unique:true},
    password:  {type:String, required:true},
    email:  {type:String, required:true, unique:true},
    role: {type:String,enum:['admin','user'], default: 'user'},
    data: {
        type: {age: Number, isMale: Boolean}
    },
    avatar: String
});

const model = mongoose.model('User', userSchema);

module.exports = model;