// Web Scraping FL Lotto
//const rp = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
//const Table = require('cli-table2');

request('http://www.flalottery.com/remainingPrizes', (error, response, html) => {
    let ids = [];
    let gameNames = [];
    let topPrizes = [];
    let topPrizesRemaining = [];
    let ticketCosts = [];
    let scrapedJSON = [];

    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const tableData = $('.gameContent');

        //get ids
        $(tableData).find('tbody').find('.column1').each(function () {
            ids.push($(this).text().trim());
        });

        //Game Names
        $(tableData).find('tbody').find('.column2').each(function () {
            gameNames.push($(this).text().trim());
        });

        //Top Prizes
        $(tableData).find('tbody').find('.column3').each(function () {
            topPrizes.push($(this).text().trim());
        });

        //Top Prizes Remaining
        $(tableData).find('tbody').find('.column4').each(function () {
            topPrizesRemaining.push($(this).text().trim());
        });

        // Ticket cost
        $(tableData).find('tbody').find('.column5').each(function () {
            ticketCosts.push($(this).text().trim());
        });

        for (let index = 0; index < ids.length; index++) {

            let obj = {
                ticketNumber: ids[index],
                ticketName: gameNames[index],
                topPrize: topPrizes[index],
                topPrizeRemaining: topPrizesRemaining[index],
                ticketCost: ticketCosts[index]
            }

            scrapedJSON.push(obj);



        }

        outputFile = JSON.stringify(scrapedJSON)
        console.log(outputFile);

        fs.writeFile('./lotto-data.json', outputFile, (err) => {
            if (!err) {
                console.log('done');
            }
        });
    }

});