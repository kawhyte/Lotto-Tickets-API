const mongoose = require('mongoose');
const config = require('config');
const morgan = require ('morgan');
const helmet = require('helmet');
const tickets = require('./routes/tickets');
const home = require('./routes/home');
const users  =  require('./routes/users');
const auth = require('./routes/auth')
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());
app.use(helmet());
app.use('/api/tickets', tickets);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/', home);



if(!config.get('jwtPrivateKey')){
    console.error('Fatal jwtPrivateKey Error');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/lotto')
.then(() => console.log('Connected to DB'))
.catch(err => console.log('Error connecting to DB'));

console.log(`App name: ${config.get('name')}`);
//console.log(`Server name: ${config.get('mail.host')}`);
//console.log(`Server password: ${config.get('mail.password')}`);

if (app.get('env') === 'development'){
    app.use(morgan('combined'));
    console.log("Morgan logging enabled");
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))

