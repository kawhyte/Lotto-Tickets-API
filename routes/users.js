const auth = require('../middleware/auth');
const config = require ('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//GET CURRENT USER INFO
// router.get('/:id', async (req, res) was not used for security reason
//I will access via web token instead.

router.get('/me', auth,  async (req, res) => {
// req.user._id comes from the web token
const user = await User.findById(req.user._id).select('-password') //exclude password
res.send(user);
});

// CREATE NEW USER END POINT
router.post('/', async (req, res) => {
    const {error} = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already exsist.');

    user = new User ( _.pick(req.body, ['name', 'email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();
    const token = user.generateAuthToken();

    res.header('x-auth-token',token).send (_.pick(user,['_id','name', 'email'])); 
});

module.exports = router;