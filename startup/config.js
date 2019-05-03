const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL: The Private Key was not defined.');
    }
}