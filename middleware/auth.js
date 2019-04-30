//Middleware for user auth
const config = require ('config');
const jwt = require('jsonwebtoken');


function auth (req, res,next){
 const token = req.header('x-auth-token');

//check is user is authorized. If not ,return!  
 if(!token) return res.status(401).send('Access denied.');

//check if token is valid 
 try {
    const decodedPayload = jwt.verify(tokwn, config.get('jwtPrivateKey'));
    req.user = decodedPayload;
    next();
 } catch (error) {
     //Bad request
     res.status(400).send('Token is invalid');
 }

}

module.exports =auth;