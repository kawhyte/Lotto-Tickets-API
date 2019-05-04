const express = require('express');
const router = express.Router();

//HOME PAGE
router.get('/', (req, res) => {
    res.send('Hello from the other side!');
});

module.exports = router;