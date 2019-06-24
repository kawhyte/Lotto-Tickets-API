const puppeteer = require('puppeteer');

(async function main() {

    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36');
        await page.goto('https://www.flalottery.com/remainingPrizes');
        await page.waitForSelector('.gameNameLink');
        //console.log('showing up');

        const data = await page.$$eval('tbody tr td', tds => tds.map((td) => {
            return td.innerHTML;
        })); 
        
        console.log(data.length);

    } catch (error) {
        console.log('Kennys error', error);
    }
})();