const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../mongo/models/users-model');
const MySQL = require ('../sql/database');

const  expiresIn = 630*10;

const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email})
        if (user) {
            const token = jwt.sign({
                userId: user._id, 
                permission:user.role},
                process.env.JWT_SECRET
                , {expiresIn:expiresIn})
            const isOk = await bcrypt.compare(password, user.password);
            if (isOk) {
                res.send({status:'OK', data: {
                    token,
                    expiresIn:expiresIn
                }
            });    
            } else {
                res.status(403).send({status:'error', message: 'Invalid password'});
            }
            
        } else {
            console.log('not found')
            res.status(404).send({status:'error', message: 'user not found'});
        }
    } catch (e) {
        res.status(500).send({status:'error', message: e.message})
    }
};

const createUser = async (req, res) => {
    try {

        const {username, email, password, data,role} = req.body; 
        const hash = await bcrypt.hash(password, 15 );

        //Mongo
        const user = await Users.create({
            username,
            email,
            password:hash,
            data,
            role
        });
        
        

        res.send({status:'OK', message: 'Usuario creado'}) 
    } catch (error) {
        if (error.code && error.code === 11000) {
            res.status(400).send({status:'DUPLICATED_VALUES', message: error.keyValue}) 
            return;
        }
        res.status(500).send({status:'ERROR', message: error.message}) 
    }
    
};

const deleteUser = async (req, res) => {
    try {
        const user = await Users.deleteOne({
            _id:req.params.id
        });

        res.send({status:'OK', message: 'Usuario borrado', data:user})
    } catch (error) {
        res.send({status:'error', message:'Hubo un error', error:error})

    }
};

const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).send({status:"Ok", data:users});
        
    } catch (error) {
        res.status(500).send({status:"Error", message:"Error con los usuarios", error:error});
    }
};

const updateUser = async (req, res) => {

    try {
        const { data, role, id} = req.body; 
        const user = await Users.updateOne({_id:id}, { $set:{
            data, 
            role
        }});
        res.send({status:'OK', message: 'Usuario actualizado', data:user})
    } catch (error) {

        if (error.code && error.code === 11000) {
            res.status(400).send({status:'DUPLICATED_VALUES', message: error.keyValue}) 
            return;
        }
        res.status(500).send({status:'ERROR', data:error.message})
    }
};

const userById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (user){
            res.status(200).send({status:"OK", data:user});
        } else {
            res.status(404).send({status:"No found", message:"No se encontro el usuario"});
        }
        
    } catch (error) {
        res.status(200).send({status:"OK", error:error});
        
    }
}

module.exports = { createUser, deleteUser, getUsers, updateUser, login, userById };