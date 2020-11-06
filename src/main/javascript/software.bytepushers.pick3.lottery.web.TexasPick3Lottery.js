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
    var state = "TX",
        stateName = "Texas",
        config = {
        state: state,
        stateName: stateName,
        WebScraper: TexasPick3WebScraper,
        baseUrl: ((webScraperBaseUrl === null || webScraperBaseUrl === undefined) ? TexasPick3UrlScraper.BASE_URL : webScraperBaseUrl),
        pathToScrape: TexasPick3UrlScraper.PATH_TO_SCRAPE,
        UrlScraper: TexasPick3UrlScraper,
        theme: {
            backgroundImageUrl: 'https://blairhouseinn.com/wp-content/uploads/2020/02/Bluebonnets-in-Texas-Hill-Country-1170x475.jpg'
        }
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

    this.getState = function () {
        return state;
    };

    this.getStateName = function () {
        return stateName;
    };

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

    this.getDrawingTime = function(currentTime) {
        if (currentTime < TexasPick3Lottery.getActualDayDrawingTime().getDateTime()) {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING;
        } else if (currentTime < TexasPick3Lottery.getActualEveningDrawingTime().getDateTime()) {
            return TexasPick3Lottery.DRAWING_TIMES.DAY;
        } else if (currentTime < TexasPick3Lottery.getActualNightDrawingTime().getDateTime()) {
            return TexasPick3Lottery.DRAWING_TIMES.EVENING;
        } else if (currentTime >= TexasPick3Lottery.getActualNightDrawingTime().getDateTime()){
            return TexasPick3Lottery.DRAWING_TIMES.NIGHT;
        } else if (currentTime < new Date().setHours(24, 0, 0, 0)) {
            return TexasPick3Lottery.DRAWING_TIMES.NIGHT;
        } else {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING;
        }
    };

    this.getCurrentDrawingTime = function() {
        return this.getDrawingTime(new Date());
    };

    this.getBackgroundImageUrl = function () {
        return config.theme.backgroundImageUrl;
    };

    this.winningNumberHasBeenDrawn = function (pick3DrawTime) {
        var now = new Date().setHours(17, 0, 0, 0);
        var drawingTime = this.getDrawingTime(pick3DrawTime.getDateTime());
        var winningNumberDrawn = false;

        if (now >= drawingTime.getDateTime()) {
            winningNumberDrawn = true;
        }

        return winningNumberDrawn;
    };
}
TexasPick3Lottery.getActualMorningDrawingTime = function() {
    var actualMorningDrawingTime = new Date();
    var drawingTime = {
        type: "Morning",
        dateTime: actualMorningDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(9, 5, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getActualDayDrawingTime = function() {
    var actualDayDrawingTime = new Date();
    var drawingTime = {
        type: "Day",
        dateTime: actualDayDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(11, 31, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getActualEveningDrawingTime = function() {
    var actualEveningDrawingTime = new Date();
    var drawingTime = {
        type: "Evening",
        dateTime: actualEveningDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(17, 3, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getActualNightDrawingTime = function() {
    var actualNightDrawingTime = new Date();
    var drawingTime = {
        type: "Night",
        dateTime: actualNightDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(21, 16, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.DRAWING_TIMES = {
    MORNING: TexasPick3Lottery.getActualMorningDrawingTime(),
    DAY: TexasPick3Lottery.getActualDayDrawingTime(),
    EVENING: TexasPick3Lottery.getActualEveningDrawingTime(),
    NIGHT: TexasPick3Lottery.getActualNightDrawingTime()
};
module.exports = TexasPick3Lottery;
