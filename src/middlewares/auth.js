const jwt = require('jsonwebtoken');

const isValidHostname = (req,res,next) =>{
    const validHost =['localhost','game-space.com'] 
    if (validHost.includes(req.hostname)) {
        next();  
    } else {
        res.status(403).send({status: 'ACCESS_DENIED'})
    }
}

const isAuth = (req,res,next) =>{
    try {
        const {token} = req.headers;
        console.log(req.headers);
        console.log(token);
        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.sessionData = {userId:data.userId}
            next();
        } else {
            throw {
                code: 403,
                status:'ACCESS_DENIED',
                message:'Misssing header token'
            } 
        }
    } catch (e) {
        res.status(e.code || 500).send({status: e.status || 'ERROR', message:e.message})
    }
    // if (true) {
    //     next();  
    // } else {
    //     res.status(403).send({status: 'ACCESS_DENIED'})
    // }
}

module.exports = {isAuth,isValidHostname};