
const express = require('express');
const tickets = require('../controllers/tickets');
const home = require('../controllers/home');
const users  =  require('../controllers/users');
const auth = require('../controllers/auth')
const error = require('../middleware/error');
var bodyParser = require('body-parser');

const app = express();


module.exports = function(app){
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    // parse application/json
    app.use(bodyParser.json());

    app.use('/api/tickets', tickets);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use('/', home);
    app.use(error);
}