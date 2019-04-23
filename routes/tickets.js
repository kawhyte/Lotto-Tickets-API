
const {Ticket,validateTicket} = require('../models/tickets')
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// END POINTS
router.get('/', async (req, res) => {
    const tickets = await Ticket.find();//.sort(ticketName);
    res.send(tickets);
})

router.get('/:id', async (req, res) => {

    ticket = await Ticket.findById(req.params.id)

    if (!ticket)
        return res.status(404).send(`The ticket with id:${req.params.id} was not found.`)

    res.send(ticket);
});

router.post('/', async (req, res) => {

    const result = validateTicket(req.body);

    if (result.error) {
       return res.status(400).send(result.error.details[0].message);
    }

    let ticket =  new Ticket({
        ticketNumber: req.body.ticketNumber,
        ticketName: req.body.ticketName,
        topPrize: req.body.topPrize,
        topPrizeRemaining: req.body.topPrizeRemaining,
        ticketCost: req.body.ticketCost   
    });

    ticket = await ticket.save();
    
    res.send(ticket);

});

router.put('/:id', async (req, res) => {

    const result = validateTicket(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id,{
        ticketNumber: req.body.ticketNumber,
        ticketName: req.body.ticketName,
        topPrize: req.body.topPrize,
        topPrizeRemaining: req.body.topPrizeRemaining,
        ticketCost: req.body.ticketCost 
    },{new:true
    });

    if (!ticket) {
        res.status(404).send(`The ticket with id:${req.params.id} was not found.`)
        return;
    }

    res.send(ticket);
});

router.delete('/:id', async (req, res) => {

    const ticket = await Ticket.findByIdAndRemove(req.params.id);

    if (!ticket)
        return res.status(404).send(`The ticket with id:${req.params.id} was not found.`)

    res.send(ticket);
});

module.exports = router;