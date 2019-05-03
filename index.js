//const mongoose = require('mongoose');
//require('express-async-errors');
const winston  = require('winston');
//require('winston-mongodb');
//const error = require('./middleware/error');
//const config = require('config');
const morgan = require ('morgan');
const helmet = require('helmet');
//const tickets = require('./routes/tickets');
//const home = require('./routes/home');
//const users  =  require('./routes/users');
//const auth = require('./routes/auth')
const express = require('express');
//var bodyParser = require('body-parser');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// winston.handleExceptions(new winston.transports.File({filename: 'logfileExecptions.log'}));
// process.on('unhandledRejection', (ex)=>{ throw ex;
// })
// winston.add(winston.transports.File,{filename: 'logfile.log'});
// winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/lotto'});

//app.use(bodyParser.urlencoded({
//    extended: true
//}));

// parse application/json
//app.use(bodyParser.json());
//app.use(helmet());
//app.use('/api/tickets', tickets);
//app.use('/api/users',users);
//app.use('/api/auth',auth);
//app.use('/', home);
//app.use(error);


// if(!config.get('jwtPrivateKey')){
//     console.error('Fatal jwtPrivateKey Error');
//     process.exit(1);
// }

// mongoose.connect('mongodb://localhost/lotto')
// .then(() => console.log('Connected to DB'))
// .catch(err => console.log('Error connecting to DB'));

//console.log(`App name: ${config.get('name')}`);
//console.log(`Server name: ${config.get('mail.host')}`);
//console.log(`Server password: ${config.get('mail.password')}`);
 console.log("Your current environment is: " + app.get('env'))
// if (app.get('env') === 'development'){
//     app.use(morgan('combined'));
//     console.log("Morgan logging enabled");
// }

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`The App is listening on port ${port} and awaiting your command, Kenny`))

