const config = require ('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//AUTH END POINT
router.post('/', async (req, res) => {
    const {error} = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    console.log(req.body.password);
    let user = await User.findOne({email: req.body.email});
    console.log(user.password);
    if (!user) return res.status(400).send('Email-Invalid Credentials.', user);
    if (user) return res.status(400).send('Email-Good',user);

    validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) return res.status(400).send('Password - Invalid Credentials.');
    
    const token = user.generateAuthToken();
    res.send(token); 
});


function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;