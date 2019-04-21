const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const ticketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        required: true,
        minlength: 1

    },
    ticketName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    topPrize: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },

    topPrizeRemaining: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    ticketCost: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    }

});

const Ticket = mongoose.model('Ticket',ticketSchema);

// END POINTS
router.get('/', async (req, res) => {
    const tickets = await Ticket.find();//.sort(ticketName);
    res.send(tickets);
})

router.get('/:id', async (req, res) => {

    ticket = await Ticket.findById(req.params.id)
    //const ticket = tickets.find(c => c.id === parseInt(req.params.id))
    //res.send(req.params.id)
    if (!ticket)
        return res.status(404).send(`The ticket with id:${req.params.id} was not found.`)

    res.send(ticket);
});

router.post('/', async (req, res) => {

    const result = ValidateTicket(req.body);

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

    const result = ValidateTicket(req.body);

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

function ValidateTicket(ticket) {

    const schema = {
        ticketNumber: Joi.string().min(1).required(),
        ticketName: Joi.string().min(3).required(), 
        topPrize: Joi.string().min(1).required(),
        topPrizeRemaining: Joi.string().min(1).required(),
        ticketCost: Joi.string().min(1).required() 
    };
    return result = Joi.validate(ticket, schema)
}

module.exports = router;