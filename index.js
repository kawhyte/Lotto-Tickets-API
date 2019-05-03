const winston = require('winston');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();

require('./startup/logging'); // this has to be added first for logging 
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

console.log("Your current environment is: " + app.get('env'))
// if (app.get('env') === 'development'){
//     app.use(morgan('combined'));
//     console.log("Morgan logging enabled");
// }

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`The App is listening on port ${port} and awaiting your command, Kenny`))