var BytePushers = require('bytepushers-js-oop');

function WebScraper(txPick3WebScraperConfig) {
    'use strict';
    var url = (txPick3WebScraperConfig && txPick3WebScraperConfig.url)? txPick3WebScraperConfig: null;
    var $ = (txPick3WebScraperConfig && txPick3WebScraperConfig.cheerio)? txPick3WebScraperConfig.cheerio: null;

    this.getUrl = function () {
        return url;
    };

    this.getCheerio = function () {
        return $;
    };

    this.scrape = function (error, response, html) {

        if (!error) {
            $ = cheerio.load(html);
            this.findWinningNumber();
        }
    };

    this.findMorningWinningNumber = function (drawingDate, drawingTime) {
        throw Error("method not implemented by WebScraper" + this.constructor.name);
    };

    this.findDayWinningNumber = function (drawingDate, drawingTime) {
        throw Error("method not implemented by WebScraper" + this.constructor.name);
    };

    this.findEveningWinningNumber = function (drawingDate, drawingTime) {
        throw Error("method not implemented by WebScraper" + this.constructor.name);
    };

    this.findNightWinningNumber = function (drawingDate, drawingTime) {
        throw Error("method not implemented by WebScraper" + this.constructor.name);
    };

    this.findWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0;

        switch (drawingTime.toUpperCase()) {
            case WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = this.findMorningWinningNumber(drawingDate);
                break;
            case WebScraper.DRAWING_TIMES.DAY.name:
                winningNumber = this.findDayWinningNumber(drawingDate);
                break;
            case WebScraper.DRAWING_TIMES.EVENING.name:
                winningNumber = this.findEveningWinningNumber(drawingDate);
                break;
            case WebScraper.DRAWING_TIMES.NIGHT.name:
                winningNumber = this.findNightWinningNumber(drawingDate);
                break;
            default:
                throw new Error("TexasPick3WebScraper.DRAWING_TIMES("+drawingTime+") is not supported.");
        }

        return winningNumber;
    };
}
WebScraper.DRAWING_TIMES = BytePushers.enumeration({
    'MORNING': {
        value: 'Morning',
        description: "Pick 3 Lottery drawing time for morning time drawing."
    },
    'DAY': {
        value: 'Day',
        description: "Pick 3 Lottery drawing time for mid-day time drawing."
    },
    'EVENING': {
        value: 'Evening',
        description: "Pick 3 Lottery drawing time for evening time drawing."
    },
    'NIGHT': {
        value: 'Night',
        description: "Pick 3 Lottery drawing time for night time drawing."
    }
});

module.exports = WebScraper;