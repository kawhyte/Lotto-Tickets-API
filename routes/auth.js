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
    
    
    let user = await User.findOne({email: req.body.email});
   

    if (!user) return res.status(400).send('Email-Invalid Credentials.');
    
    
    let bodyPassword = req.body.password;
    let dbpassword =  user.password;
    let validPassword = await bcrypt.compare(bodyPassword, dbpassword);
    
    //let validPassword = await bcrypt.compare(req.body.password, user.password)
    //validPassword = await bcrypt.compare("12345", user.password)

    if (!validPassword) return res.status(400).send('Password - Invalid Credentials.');
    res.send(validPassword);
    
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