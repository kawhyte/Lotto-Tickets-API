const express = require('express');
const router = express.Router();

//HOME PAGE
router.get('/', (req, res) => {
    res.send('Hello World');

});

module.exports = router;