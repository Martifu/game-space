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
                res.status(403).send({status:'Invalid Password', message: ''});
                res.send({status:'Invalid Password'});
            }
            
        } else {
            console.log('not found')
            res.status(404).send({status:'USER NOT FOUND', message: ''});
            res.send({status:'USER NOT FOUND'});
        }
    } catch (e) {
        res.status(500).send({status:'ERROR', message: error.message})
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

const deleteUser = (req, res) => {
    res.send({status:'OK', message: 'Usuario borrado'})
};

const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).send({status:"Ok", data:users});
        
    } catch (error) {
        res.status(500).send({status:"Error", message:"Error con los usuarios", error:error});
    }



    res.send({status:'OK', message: []})
};

const updateUser = async (req, res) => {

    try {
        const { data,  role} = req.body; 
        await Users.findByIdAndUpdate(req.sessionData.userId,{
            data, 
            role
        });
        res.send({status:'OK', message: 'Usuario actualizado'})
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