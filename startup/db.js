const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    // mongoose.connect('mongodb://localhost/lotto')
    //     .then(() => winston.info('Connected to MongoDB'))

        mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true})
        .then(() => winston.info('Connected to MongoDB'))

        // const db = mongoose.connection;
        // db.once('open',()=> console.log(error))
        
}