if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load();
} 
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')

app.use(express.static('public'));

const swaggerUi = require ('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./startup/logging'); // this has to be added first for logging 
require('./startup/routes')(app);
require('./startup/db')();
//require('./startup/config')();
require('./startup/prod')(app);

console.log("Your current environment is: " + app.get('env'))
// if (app.get('env') === 'development'){
//     app.use(morgan('combined'));
//     console.log("Morgan logging enabled");
// }



winston.handleExceptions(
    new winston.transports.Console({
        colorize: true,
        prettyPrint: true
    }),
    new winston.transports.File({
        filename: 'logUncaughtExecptions.log'
    }));
process.on('unhandledRejection', (ex) => {
    throw ex;
})
winston.add(winston.transports.File, {
    filename: 'logfile.log'
});
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/lotto'
});




const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`The App is listening on port ${port} and awaiting your command, Kenny`))