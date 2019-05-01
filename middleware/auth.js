//Middleware for user auth
const config = require ('config');
const jwt = require('jsonwebtoken');


module.exports = function auth (req, res, next) {
 const token = req.header('x-auth-token');
//const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M5MGQ3ZmZhMzdlYzNhNzljZTI5ZTgiLCJpYXQiOjE1NTY2ODAwNjN9.XK8LZACihIXQ6kmGTkz60pPixdHFBNi1BFS4D0Ug73c'
//check is user is authorized. If not ,return! 
console.log(req.get('ETag')); 
 if(!token) {
    res.status(401).send('Access denied. You are not authorized to perform this task.');
    return; 
 }

//check if token is valid 
 try {
    const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decodedPayload;
    next();
 } catch (error) {
     //Bad request
     res.status(400).send('Token is invalid');
 }

}
