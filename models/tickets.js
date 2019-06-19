const mongoose = require('mongoose');
const Joi = require('joi');

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
    },
    launchDate: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    endDate: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    redemptionDeadline: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    overallOddsOfWinning: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    gameImageLink: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 150
    },
    State: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    remainingPrizes: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    totalPrizes: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    },
    prizePercentage: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15
    }

});

const Ticket = mongoose.model('Ticket',ticketSchema);

function validateTicket(ticket) {

    const schema = {
        ticketNumber: Joi.string().min(1).required(),
        ticketName: Joi.string().min(3).required(), 
        topPrize: Joi.string().min(1).required(),
        topPrizeRemaining: Joi.string().min(1).required(),
        ticketCost: Joi.string().min(1).required(), 
        launchDate: Joi.string().min(1).required(),
        endDate: Joi.string().min(1).required(),
        redemptionDeadline: Joi.string().min(1).required(),
        overallOddsOfWinning: Joi.string().min(1).required(),
        gameImageLink: Joi.string().min(1).required(),
        State: Joi.string().min(1).required(),
        remainingPrizes: Joi.string().min(1).required(),
        totalPrizes: Joi.string().min(1).required(),
        prizePercentage: Joi.string().min(1).required()

    };
    return result = Joi.validate(ticket, schema)
}

module.exports.Ticket = Ticket;
module.exports.validateTicket = validateTicket;