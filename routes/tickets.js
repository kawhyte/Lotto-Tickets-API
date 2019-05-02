const auth = require('../middleware/auth');
const admin = require('../middleware/admin')
const {
    Ticket,
    validateTicket
} = require('../models/tickets')
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// TICKET END POINTS
//Get all Tickets
router.get('/', async (req, res, next) => {
    throw new Error('This is my test error for the get route');
        const tickets = await Ticket.find(); //.sort(ticketName);
        res.send(tickets);
})

//Get ticket with id
router.get('/:id', async (req, res) => {

    ticket = await Ticket.findById(req.params.id)

    if (!ticket)
        return res.status(404).send(`The ticket with id:${req.params.id} was not found.`)

    res.send(ticket);
});

// Create a new ticket
router.post('/', [auth, admin], async (req, res) => {

    const result = validateTicket(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    let ticket = new Ticket({
        ticketNumber: req.body.ticketNumber,
        ticketName: req.body.ticketName,
        topPrize: req.body.topPrize,
        topPrizeRemaining: req.body.topPrizeRemaining,
        ticketCost: req.body.ticketCost
    });

    ticket = await ticket.save();

    res.send(ticket);

});

//Update a ticket via ID
router.put('/:id', [auth, admin], async (req, res) => {

    const result = validateTicket(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, {
        ticketNumber: req.body.ticketNumber,
        ticketName: req.body.ticketName,
        topPrize: req.body.topPrize,
        topPrizeRemaining: req.body.topPrizeRemaining,
        ticketCost: req.body.ticketCost
    }, {
        new: true
    });

    if (!ticket) {
        res.status(404).send(`The ticket with id:${req.params.id} was not found.`)
        return;
    }

    res.send(ticket);
});

//Delete ticket via Id 
router.delete('/:id', [auth, admin], async (req, res) => {

    const ticket = await Ticket.findByIdAndRemove(req.params.id);

    if (!ticket)
        return res.status(404).send(`The ticket with id:${req.params.id} was not found.`)

    res.send(ticket);
});

module.exports = router;