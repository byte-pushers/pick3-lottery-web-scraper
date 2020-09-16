/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by tonte on 10/4/17.
 */
// var request = require('request');
// var cheerio = require('cheerio');

var TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');
var TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

function TexasPick3Lottery(webScraperBaseUrl) {
    'use strict';
    var config = {
        state: "TX",
        stateName: "Texas",
        WebScraper: TexasPick3WebScraper,
        baseUrl: ((webScraperBaseUrl === null || webScraperBaseUrl === undefined) ? TexasPick3UrlScraper.BASE_URL : webScraperBaseUrl),
        pathToScrape: TexasPick3UrlScraper.PATH_TO_SCRAPE,
        UrlScraper: TexasPick3UrlScraper
    };
    var scraper;

    function doScrape (url, callback, request) {
        request(url, callback);
    }

    function getWinningNumberSourcePath (drawingDate, request, pageReader) {
        var winningNumberSourcePathPromise,
            sourcePath = {
                date: drawingDate,
                url: null
            };

        try {
            winningNumberSourcePathPromise = new Promise(function (resolve, reject) {
                doScrape(config.baseUrl + config.pathToScrape, function(error, ignore, html) {
                    if (error) {
                        reject(error);
                    } else {
                        scraper = (config === undefined) ? null : new config.UrlScraper({
                            baseUrl: config.baseUrl,
                            pageReader: pageReader.read(html),
                            drawingDate: drawingDate
                        });
                        try {
                            sourcePath.url = scraper.findSourcePath(drawingDate);
                        } catch (err) {
                            reject(err);
                        }
                        resolve(sourcePath);
                    }
                }, request);
            });
        } catch (e) {
            winningNumberSourcePathPromise = new Promise(function(ignore,reject) {
                reject(e);
            });
        }
        return winningNumberSourcePathPromise;
    }

    this.retrieveWinningNumber = function (drawingState, drawingDate, drawingTime, request, pageReader) {
        var winningNumberPromise,
            winningNumber = {
                date: drawingDate,
                time: drawingTime,
                number: 0
            };

        try {
            winningNumberPromise = new Promise(function(resolve, reject) {
                getWinningNumberSourcePath(drawingDate, request, pageReader)
                    .then(function(successResult) {
                        if (!successResult || successResult.url === null) {
                            reject("Could not find url in state " + drawingState + " for date " + drawingDate);
                        }
                        doScrape(successResult.url, function (error, ignore, html) {
                            if (error) {
                                reject(error);
                            } else {
                                scraper = (config === undefined)? null : new config.WebScraper({
                                    url: successResult.url,
                                    pageReader: pageReader.read(html),
                                    drawingDate: drawingDate,
                                    drawingTime: drawingTime
                                });
                                try {
                                    winningNumber.number = scraper.findWinningNumber(drawingDate, drawingTime);
                                } catch(err) {
                                    reject(err);
                                }
                                resolve(winningNumber);
                            }
                        }, request);
                    }).catch(function(error) {
                    reject(error);
                });
            });
        } catch (error) {
            winningNumberPromise = new Promise(function (ignore, reject) {
                reject(error);
            });
        }
        return winningNumberPromise;
    };

    this.getActualMorningDrawingTime = function() {
        var actualMorningDrawingTime = new Date();

        actualMorningDrawingTime.setHours(9, 5, 0, 0);

        return actualMorningDrawingTime;
    };

    this.getActualDayDrawingTime = function() {
        var actualDayDrawingTime = new Date();

        actualDayDrawingTime.setHours(11, 31, 0, 0);

        return actualDayDrawingTime;
    };

    this.getActualEveningDrawingTime = function() {
        var actualEveningDrawingTime = new Date();

        actualEveningDrawingTime.setHours(17, 3, 0, 0);

        return actualEveningDrawingTime;
    };

    this.getActualNightDrawingTime = function() {
        var actualNightDrawingTime = new Date();

        actualNightDrawingTime.setHours(21, 16, 0, 0);

        return actualNightDrawingTime;
    };
}

module.exports = TexasPick3Lottery;
