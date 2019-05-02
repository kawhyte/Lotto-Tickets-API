const winston  = require('winston');

//Error Middleware for Express only. This wil not work for other errors. 
module.exports = function(err,req,res,next){
    winston.error(err.message,err);
    
    res.status(500).send('Ooops! Something went wrong.');
}

// from most important to least important.
// const levels = { 
//   error: 0, 
//   warn: 1, 
//   info: 2, 
//   verbose: 3, 
//   debug: 4, 
//   silly: 5 
// };