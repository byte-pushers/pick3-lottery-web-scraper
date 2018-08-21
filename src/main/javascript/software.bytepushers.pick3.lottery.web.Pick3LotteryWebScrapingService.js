/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by tonte on 10/4/17.
 */
var request = require('request');
var cheerio = require('cheerio');

var TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');
var TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

function Pick3LotteryWebScrapingService(webScraperUrl) {
    'use strict';
    var registeredScrapers = [
            {state: "TX", stateName: "Texas", WebScraper: TexasPick3WebScraper,
                webScraperUrl: (webScraperUrl === null || webScraperUrl === undefined) ? TexasPick3UrlScraper.URL: webScraperUrl, UrlScraper: TexasPick3UrlScraper }
        ];

    function findRegisteredScraperConfiguration (drawingState) {
        var registeredScraper = registeredScrapers.find(function (registeredScraper) {
            return (drawingState && registeredScraper.state.toUpperCase() === drawingState.toUpperCase());
        });

        if (registeredScraper === undefined) {
            throw new Error("Could not find registered scraper for specified state: " + drawingState);
        }

        return registeredScraper;
    }
    function doScrape (url, callback) {
        request(url, callback);
    }

    function getWinningNumberSourcePath (drawingState, drawingDate) {
        var registeredUrlScraperConfig,
            scraper,
            winningNumberSourcePathPromise,
            sourcePath = {
                date: drawingDate,
                url: null
            };
        try {
            registeredUrlScraperConfig = findRegisteredScraperConfiguration(drawingState);

            winningNumberSourcePathPromise = new Promise(function (resolve, reject) {
                doScrape(registeredUrlScraperConfig.webScraperUrl, function(error, ignore, html) {
                    if (error) {
                        reject(error);
                    } else {
                        scraper = (registeredUrlScraperConfig === undefined) ? null : new registeredUrlScraperConfig.UrlScraper({
                            url: registeredUrlScraperConfig.webScraperUrl,
                            cheerio: cheerio.load(html),
                            drawingDate: drawingDate
                        });
                        try {
                            sourcePath.url = scraper.findSourcePath(drawingDate);
                        } catch (err) {
                            reject(err);
                        }
                        resolve(sourcePath);
                    }
                });
            });
        } catch (e) {
            winningNumberSourcePathPromise = new Promise(function(ignore,reject) {
                reject(e);
            });
        }
        return winningNumberSourcePathPromise;
    }

    this.retrieveWinningNumber = function (drawingState, drawingDate, drawingTime) {
        var registeredScraperConfig,
            scraper,
            winningNumberPromise,
            winningNumber = {
                date: drawingDate,
                time: drawingTime,
                number: 0
            };

        try {
            registeredScraperConfig = findRegisteredScraperConfiguration(drawingState, drawingDate, drawingTime);

            winningNumberPromise = new Promise(function(resolve, reject) {
                getWinningNumberSourcePath(drawingState, drawingDate, registeredScraperConfig.webScraperUrl)
                    .then(function(successResult) {
                        if (!successResult || successResult.url === null) {
                            reject("Could not find url in state " + drawingState + " for date " + drawingDate);
                        }
                        doScrape(successResult.url, function (error, ignore, html) {
                            if (error) {
                                reject(error);
                            } else {
                                scraper = (registeredScraperConfig === undefined)? null : new registeredScraperConfig.WebScraper({
                                    url: successResult.url,
                                    cheerio: cheerio.load(html),
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
                        });
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
}

module.exports = Pick3LotteryWebScrapingService;