/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by tonte on 10/4/17.
 */
// var request = require('request');
// var cheerio = require('cheerio');

var TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');
var TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');
var TexasPick3Lottery = require('./software.bytepushers.pick3.lottery.web.TexasPick3Lottery');

function Pick3LotteryWebScrapingService(webScraperBaseUrl) {
    'use strict';
    const registeredPick3Lotteries = [
        {
            state: "TX",
            stateName: "Texas",
            WebScraper: TexasPick3WebScraper,
            baseUrl: ((webScraperBaseUrl === null || webScraperBaseUrl === undefined) ? TexasPick3UrlScraper.BASE_URL : webScraperBaseUrl),
            pathToScrape: TexasPick3UrlScraper.PATH_TO_SCRAPE,
            UrlScraper: TexasPick3UrlScraper,
            pick3Lottery: new TexasPick3Lottery(webScraperBaseUrl)
        }
    ];

    function findRegisteredPick3Lottery (drawingState) {
        const registeredPick3Lottery = registeredPick3Lotteries.find(function (registeredScraper) {
            return (drawingState && registeredScraper.state.toUpperCase() === drawingState.toUpperCase());
        });

        if (registeredPick3Lottery === undefined) {
            throw new Error("Could not find registered scraper for specified state: " + drawingState);
        }

        return registeredPick3Lottery;
    }

    this.retrieveWinningNumber = function (drawingState, drawingDate, drawingTime, request, pageReader) {
        let registeredPick3Lottery = findRegisteredPick3Lottery(drawingState, drawingDate, drawingTime);
        return registeredPick3Lottery.pick3Lottery.retrieveWinningNumber(drawingState, drawingDate, drawingTime, request, pageReader);
    };

    this.getActualMorningDrawingTime = function(drawingState) {
        const registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualMorningDrawingTime();
    };

    this.getActualDayDrawingTime = function(drawingState) {
        const registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualDayDrawingTime()
    };

    this.getActualEveningDrawingTime = function(drawingState) {
        const registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualEveningDrawingTime();
    };

    this.getActualNightDrawingTime = function(drawingState) {
        const registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualNightDrawingTime();
    };
}

module.exports = Pick3LotteryWebScrapingService;
