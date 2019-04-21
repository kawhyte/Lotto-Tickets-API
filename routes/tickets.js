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
    const tickets = await Ticket.find().sort(ticketName);
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

    //const result = ValidateTicket(req.body);

   // if (result.error) {
    //   return res.status(400).send(result.error.details[0].message);
   // }

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
        res.status(400).send(result.error.details[0].message);
    }

    const ticket = await Ticket.findByIdAndUpdate(req.params.id,{
        ticketNumber: req.body.ticketId,
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


router.delete('/api/tickets/:id', async (req, res) => {

    const ticket = await Ticket.findByIdAndRemove(req.params.id);

    if (!ticket)
        return res.status(404).send(`The ticket with id:${req.params.id} was not found.`)

    res.send(ticket);
});

function ValidateTicket(ticket) {

    const schema = {
        ticketNumber: Joi.string().min(1),
        ticketName: Joi.string().min(3).required(), 
        topPrize: Joi.string().min(1).required(),
        topPrizeRemaining: Joi.string().min(1).required(),
        ticketCost: Joi.string().min(1) 
    };
    return result = Joi.validate(ticket, schema)
}

module.exports = router;

const tickets = [{
        "id": 1,
        "gameNumber": "7017",
        "ticketName": "PAC-MAN",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "5 of 13",
        "ticketCost": "$5.00"
    },
    {
        "id": 2,
        "gameNumber": "5014",
        "gameName": "JOKER'S WILD",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "7 of 16",
        "ticketCost": "$2.00"
    },
    {
        "id": 3,
        "gameNumber": "5013",
        "gameName": "POWER 5S",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "3 of 10",
        "ticketCost": "$5.00"
    }, {
        "id": 3,
        "gameNumber": "5012",
        "gameName": "WHEEL OF FORTUNE",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "0 of 4",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1415",
        "ticketName": "$15,000,000 GOLD SPECIAL EDITI",
        "topPrize": "$15,000,000.00",
        "topPrizeRemaining": "6 of 6",
        "ticketCost": "$30.00"
    }, {
        "gameNumber": "1415",
        "gameName": "$15,000,000 GOLD SPECIAL EDITI",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "23 of 24",
        "ticketCost": "$30.00"
    }, {
        "gameNumber": "1414",
        "gameName": "$1,000,000 LUCK",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "7 of 8",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1413",
        "gameName": "TRIPLE CA$H",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "9 of 10",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1412",
        "gameName": "MONEY BAGS",
        "topPrize": "$1,000.00",
        "topPrizeRemaining": "357 of 420",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1411",
        "gameName": "$2,000,000 GOLD RUSH CLASSIC",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "7 of 10",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1410",
        "gameName": "$1,000,000 GOLD RUSH CLASSIC",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "25 of 32",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1409",
        "gameName": "$50,000 GOLD RUSH CLASSIC",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "57 of 72",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1408",
        "gameName": "$10,000 GOLD RUSH CLASSIC",
        "topPrize": "$10,000.00",
        "topPrizeRemaining": "71 of 100",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1407",
        "gameName": "$5,000,000 GOLD RUSH CLASSIC",
        "topPrize": "$5,000,000.00",
        "topPrizeRemaining": "4 of 6",
        "ticketCost": "$20.00"
    }, {
        "gameNumber": "1407",
        "gameName": "$5,000,000 GOLD RUSH CLASSIC",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "22 of 30",
        "ticketCost": "$20.00"
    }, {
        "gameNumber": "1406",
        "gameName": "$500,000! CASH BLAST",
        "topPrize": "$500,000.00",
        "topPrizeRemaining": "3 of 6",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1405",
        "gameName": "2019 NEW YEAR'S DOUBLER",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "7 of 16",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1404",
        "gameName": "Silver & Gold",
        "topPrize": "$5,000.00",
        "topPrizeRemaining": "29 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1403",
        "gameName": "LOTERIA",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "8 of 15",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1402",
        "gameName": "$2,000,000 Holiday Bonus",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "1 of 2",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1401",
        "gameName": "$1,000,000 Holiday Bonus",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "2 of 6",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1400",
        "gameName": "$50,000 Holiday Bonus",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "3 of 6",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1399",
        "gameName": "$10,000 Holiday Bonus",
        "topPrize": "$10,000.00",
        "topPrizeRemaining": "10 of 36",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1398",
        "gameName": "$20 MONOPOLY JACKPOT",
        "topPrize": "$5,000,000.00",
        "topPrizeRemaining": "5 of 6",
        "ticketCost": "$20.00"
    }, {
        "gameNumber": "1398",
        "gameName": "$20 MONOPOLY JACKPOT",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "13 of 20",
        "ticketCost": "$20.00"
    }, {
        "gameNumber": "1397",
        "gameName": "$500,000 PAYDAY",
        "topPrize": "$500,000.00",
        "topPrizeRemaining": "2 of 6",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1396",
        "gameName": "WIN ALL!",
        "topPrize": "$20,000.00",
        "topPrizeRemaining": "9 of 30",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1395",
        "gameName": "HEADS OR TAILS",
        "topPrize": "$5,000.00",
        "topPrizeRemaining": "37 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1394",
        "gameName": "EXTRA PLAY",
        "topPrize": "$500,000.00",
        "topPrizeRemaining": "0 of 8",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1393",
        "gameName": "CROSSWORD CASH VAULT",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "21 of 40",
        "ticketCost": "$3.00"
    }, {
        "gameNumber": "1392",
        "gameName": "LUCKY 7",
        "topPrize": "$3,000.00",
        "topPrizeRemaining": "27 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1391",
        "gameName": "$10 MONOPOLY JACKPOT",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "4 of 8",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1390",
        "gameName": "$5 MONOPOLY JACKPOT",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "2 of 8",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1389",
        "gameName": "$2 MONOPOLY JACKPOT",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "7 of 20",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1388",
        "gameName": "$1 MONOPOLY JACKPOT",
        "topPrize": "$10,000.00",
        "topPrizeRemaining": "67 of 136",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1386",
        "gameName": "MONEY BAGS",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "0 of 10",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1385",
        "gameName": "DICE DOUBLER",
        "topPrize": "$5,000.00",
        "topPrizeRemaining": "22 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1383",
        "gameName": "$2,000,000 24 KARAT CASH",
        "topPrize": "$2,000,000.00*",
        "topPrizeRemaining": "2 of 6*",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1382",
        "gameName": "THE PRICE IS RIGHT",
        "topPrize": "$1,000,000.00*",
        "topPrizeRemaining": "2 of 6",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1381",
        "gameName": "NEON 7's",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "6 of 26",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1380",
        "gameName": "$100 IN A FLASH",
        "topPrize": "$3,000.00",
        "topPrizeRemaining": "13 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1379",
        "gameName": "FLORIDA 100X THE CASH",
        "topPrize": "$15,000,000.00",
        "topPrizeRemaining": "2 of 8",
        "ticketCost": "$30.00"
    }, {
        "gameNumber": "1379",
        "gameName": "FLORIDA 100X THE CASH",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "6 of 20",
        "ticketCost": "$30.00"
    }, {
        "gameNumber": "1378",
        "gameName": "MONEY MACHINE",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "1 of 16",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1377",
        "gameName": "$30,000 LUCKY WIN",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "3 of 30",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1376",
        "gameName": "TRIPLE PAYOUT",
        "topPrize": "$3,000.00",
        "topPrizeRemaining": "31 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1375",
        "gameName": "FLORIDA 50X THE CASH",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "1 of 12*",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1374",
        "gameName": "FLORIDA 20X THE CASH",
        "topPrize": "$1,000,000.00",
        "topPrizeRemaining": "0 of 14",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1373",
        "gameName": "FLORIDA 10X THE CASH",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "1 of 40",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1372",
        "gameName": "FLORIDA 5X THE CASH",
        "topPrize": "$10,000.00",
        "topPrizeRemaining": "15 of 100",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1371",
        "gameName": "SCRABBLE",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "11 of 40",
        "ticketCost": "$3.00"
    }, {
        "gameNumber": "1370",
        "gameName": "2018 NEW YEAR'S BUCKS",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "0 of 16",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1369",
        "gameName": "SILVER DOLLAR",
        "topPrize": "$1,000.00",
        "topPrizeRemaining": "68 of 600",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1364",
        "gameName": "LUCKY 13",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "7 of 16",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1363",
        "gameName": "BANKROLL BINGO",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "3 of 8",
        "ticketCost": "$3.00"
    }, {
        "gameNumber": "1362",
        "gameName": "$10,000 A WEEK FOR LIFE",
        "topPrize": "$10,000.00 Wk/Life",
        "topPrizeRemaining": "3 of 6*",
        "ticketCost": "$20.00"
    }, {
        "gameNumber": "1361",
        "gameName": "MONEY ROLL",
        "topPrize": "$20,000.00",
        "topPrizeRemaining": "9 of 30",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1360",
        "gameName": "TRIPLE WIN",
        "topPrize": "$3,000.00",
        "topPrizeRemaining": "30 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1359",
        "gameName": "$2,000,000 CASHWORD",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "1 of 9*",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1357",
        "gameName": "CA$H Payout",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "2 of 10",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1355",
        "gameName": "2's FOR THE MONEY",
        "topPrize": "$3,000.00",
        "topPrizeRemaining": "25 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1354",
        "gameName": "VERY CHERRY",
        "topPrize": "$5,000.00",
        "topPrizeRemaining": "9 of 70",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1351",
        "gameName": "$1,000 A WEEK FOR LIFE",
        "topPrize": "$1,000.00 Wk/Life",
        "topPrizeRemaining": "1 of 8",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1349",
        "gameName": "TOPAZ 10's",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "5 of 16",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1348",
        "gameName": "BONUS DOUBLE MATCH",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "2 of 16",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1344",
        "gameName": "LUCKY 7's CROSSWORD",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "0 of 24",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1343",
        "gameName": "$30 GRAND",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "2 of 12",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1342",
        "gameName": "CASH ON THE SPOT",
        "topPrize": "$5,000.00",
        "topPrizeRemaining": "22 of 84",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1341",
        "gameName": "LOTERIA GRANDE",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "6 of 16",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1340",
        "gameName": "LOTERIA",
        "topPrize": "$30,000.00",
        "topPrizeRemaining": "7 of 30",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1338",
        "gameName": "CASH RESERVE",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "5 of 16",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1335",
        "gameName": "$2,000,000 GOLD RUSH DOUBLER",
        "topPrize": "$2,000,000.00",
        "topPrizeRemaining": "1 of 8",
        "ticketCost": "$10.00"
    }, {
        "gameNumber": "1334",
        "gameName": "$500,000 GOLD RUSH DOUBLER",
        "topPrize": "$500,000.00",
        "topPrizeRemaining": "1 of 44",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1333",
        "gameName": "$50,000 GOLD RUSH DOUBLER",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "4 of 72",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1332",
        "gameName": "$10,000 GOLD RUSH DOUBLER",
        "topPrize": "$10,000.00",
        "topPrizeRemaining": "2 of 100",
        "ticketCost": "$1.00"
    }, {
        "gameNumber": "1331",
        "gameName": "MONEY MONEY MONEY",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "3 of 12",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1327",
        "gameName": "Bingo",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "1 of 6*",
        "ticketCost": "$3.00"
    }, {
        "gameNumber": "1318",
        "gameName": "MAXIMUM MONEY",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "1 of 12",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1317",
        "gameName": "BONUS CROSSWORD",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "1 of 40",
        "ticketCost": "$3.00"
    }, {
        "gameNumber": "1302",
        "gameName": "WINNING STREAK",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "7 of 20*",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1298",
        "gameName": "$500,000 FLAMINGO MULTIPLIER",
        "topPrize": "$500,000.00",
        "topPrizeRemaining": "7 of 24*",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1297",
        "gameName": "$50,000 FLAMINGO MULTIPLIER",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "13 of 40*",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1260",
        "gameName": "$500,000 GOLD RUSH",
        "topPrize": "$500,000.00",
        "topPrizeRemaining": "3 of 36*",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1259",
        "gameName": "$50,000 GOLD RUSH",
        "topPrize": "$50,000.00",
        "topPrizeRemaining": "9 of 80*",
        "ticketCost": "$2.00"
    }, {
        "gameNumber": "1245",
        "gameName": "ESCAPE TO MARGARITAVILLE",
        "topPrize": "$250,000.00",
        "topPrizeRemaining": "4 of 10*",
        "ticketCost": "$5.00"
    }, {
        "gameNumber": "1048",
        "gameName": "LUCKY $200,000 A YEAR FOR LIFE",
        "topPrize": "$200,000.00/Year*",
        "topPrizeRemaining": "1 of 10*",
        "ticketCost": "$20.00"
    }, {
        "gameNumber": "1048",
        "gameName": "LUCKY $200,000 A YEAR FOR LIFE",
        "topPrize": "$50,000.00/Year*",
        "topPrizeRemaining": "4 of 10*",
        "ticketCost": "$20.00"
    }
];