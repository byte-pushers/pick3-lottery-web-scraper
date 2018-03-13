/**
 * Created by tonte on 10/4/17.
 */
//var BytePushers = require('bytepushers-js-oop');
var request = require('request');
var cheerio = require('cheerio');

/*global require*/
//(function (BytePushers) {
    'use strict';

    /*BytePushers = BytePushers || {};
    BytePushers.service = BytePushers.service ||  BytePushers.namespace("software.service.Pick3LotteryWebScrapingService");
    BytePushers.service.Pick3LotteryWebScrapingService = */
    function Pick3LotteryWebScrapingService() {
        //TODO: Create endpoint function

        this.retrieveWinningNumber = function (drawingState, drawingDate, drawingTime) {
            var scraper, winningNumber = {
                date: drawingDate,
                time: drawingTime,
                number: 0
            };

            try {
                scraper = findRegisteredScraper(drawingState, drawingDate, drawingTime);

                doScrape(scraper.url, scraper.scrape);

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
                    return registeredScraper.state === stateAbbreviation
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
            {state: "TX", stateName: "Texas", url: /*BytePushers.scraper.*/TexasPick3WebScraper.url, Scraper: /*BytePushers.scraper.*/TexasPick3WebScraper}
        ]
    }

    module.exports = Pick3LotteryWebScrapingService;
//}(global.BytePushers));
