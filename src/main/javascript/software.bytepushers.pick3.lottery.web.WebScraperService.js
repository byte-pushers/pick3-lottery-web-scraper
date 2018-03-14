/**
 * Created by tonte on 10/4/17.
 */
var request = require('request');
var cheerio = require('cheerio');

var TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

function Pick3LotteryWebScrapingService() {
    'use strict';
    //TODO: Create endpoint function

    this.retrieveWinningNumber = function (drawingState, drawingDate, drawingTime) {
        var scraper, winningNumber = {
            date: drawingDate,
            time: drawingTime,
            number: 0
        };

        try {
            scraper = findRegisteredScraper(drawingState, drawingDate, drawingTime);

            doScrape(scraper.getUrl(), scraper.scrape);

            winningNumber.date = scraper.getDrawingDate();
            winningNumber.time = scraper.getDrawingTime();
            winningNumber.number = scraper.getDrawingNumber();
        } catch (e) {
            //TODO: Handle error
        }

        return winningNumber;
    };

    function doScrape(url, callback) {
        request(url, callback)
    }

    function findRegisteredScraper(stateAbbreviation, drawingDate, drawingTime) {
        var registeredScraper = registeredScrapers.find(function (registeredScraper) {
                return (stateAbbreviation && registeredScraper.state.toUpperCase() === stateAbbreviation.toUpperCase());
            }),
            scraper = (registeredScraper === undefined)? null : new registeredScraper.Scraper({
                url: registeredScraper.url,
                cheerio: cheerio,
                drawingDate: drawingDate,
                drawingTime: drawingTime
            });

        if (scraper === null && registeredScraper === undefined) {
            throw new Error("Could not find registered scraper for specified state: " + stateAbbreviation);
        }

        return scraper;
    }

    var registeredScrapers = [
        {state: "TX", stateName: "Texas", url: TexasPick3WebScraper.URL, Scraper: TexasPick3WebScraper}
    ]
}

module.exports = Pick3LotteryWebScrapingService;
