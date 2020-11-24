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
        request.request(url, callback);
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
                            resolve(sourcePath);
                        } catch (err) {
                            reject(err);
                        }
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
                                    baseUrl: successResult.url,
                                    pageReader: pageReader.read2(html),
                                    drawingDate: drawingDate,
                                    drawingTime: drawingTime
                                });
                                try {
                                    winningNumber.number = scraper.findWinningNumber(drawingDate, drawingTime);
                                    resolve(winningNumber);
                                } catch (err) {
                                    reject(err);
                                }
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
        var midnight = new Date();
        midnight.setHours(23, 59, 59, 0);
        //TODO: re-factor to only look a the time of day and not include the date in calculation.
        if (compareTime(currentTime, TexasPick3Lottery.getActualDayDrawingTime().getDateTime()) == -1) {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING(currentTime);
        } else if (compareTime(currentTime, TexasPick3Lottery.getActualEveningDrawingTime().getDateTime()) == -1) {
            return TexasPick3Lottery.DRAWING_TIMES.DAY(currentTime);
        } else if (compareTime(currentTime, TexasPick3Lottery.getActualNightDrawingTime().getDateTime()) == -1) {
            return TexasPick3Lottery.DRAWING_TIMES.EVENING(currentTime);
        } else if (compareTime(currentTime, TexasPick3Lottery.getActualNightDrawingTime().getDateTime()) == 1 ||
            compareTime(currentTime, TexasPick3Lottery.getActualNightDrawingTime().getDateTime()) == 0){
            return TexasPick3Lottery.DRAWING_TIMES.NIGHT(currentTime);
        } else if (compareTime(currentTime, midnight) == -1 || compareTime(currentTime, midnight) == 0) {
            return TexasPick3Lottery.DRAWING_TIMES.NIGHT(currentTime);
        } else {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING(currentTime);
        }
    };

    function compareTime(time1, time2) {
        if (time1 && time2 ) {
            if (!time1.getHours() && !time2.getHours()) {
                return 0;
            } else if (!time1.getHours() && time2.getHours()) {
                return -1;
            } else if (time1.getHours() && !time2.getHours()) {
                return 1;
            } else if (time1.getHours() < time2.getHours()) {
                return -1;
            } else if (time1.getHours > time2.getHours()) {
                return 1;
            } else if (time1.getHours() == time2.getHours()) {
                if (!time1.getMinutes() && !time2.getMinutes()) {
                    return 0;
                } else if (!time1.getMinutes() && time2.getMinutes()) {
                    return -1;
                } else if (time1.getMinutes() && !time2.getMinutes()) {
                    return 1;
                } else if (time1.getMinutes() < time2.getMinutes()) {
                    return -1;
                } else if (time1.getMinutes > time2.getMinutes()) {
                    return 1;
                } else if (time1.getMinutes() == time2.getMinutes()) {
                    return 0;
                }
            }
        } else if (time1 && !time2) {
            return -1;
        } else if (!time1 && time2) {
            return 1;
        } else {
            return 0;
        }
    }

    this.getCurrentDrawingTime = function() {
        return this.getDrawingTime(new Date());
    };

    this.getBackgroundImageUrl = function () {
        return config.theme.backgroundImageUrl;
    };

    this.winningNumberHasBeenDrawn = function (pick3DrawTime) {
        var now = new Date();
        now.setDate(now.getDate() - 1);
        now.setHours(17, 30, 0, 0);

        var drawingTime = this.getDrawingTime(/*now*/pick3DrawTime.getDateTime());
        var winningNumberDrawn = false;

        if (now >= drawingTime.getDateTime()) {
            winningNumberDrawn = true;
        }

        return winningNumberDrawn;
    };
}
TexasPick3Lottery.getActualMorningDrawingTime = function(actualMorningDrawingTime) {
    if (!actualMorningDrawingTime) {
        actualMorningDrawingTime = new Date();
    }
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

TexasPick3Lottery.getActualDayDrawingTime = function(actualDayDrawingTime) {
    if (!actualDayDrawingTime) {
        actualDayDrawingTime = new Date();
    }

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

TexasPick3Lottery.getActualEveningDrawingTime = function(actualEveningDrawingTime) {
    if (!actualEveningDrawingTime) {
        actualEveningDrawingTime = new Date();
    }
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

TexasPick3Lottery.getActualNightDrawingTime = function(actualNightDrawingTime) {
    if (!actualNightDrawingTime) {
        actualNightDrawingTime = new Date();
    }
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
    MORNING: TexasPick3Lottery.getActualMorningDrawingTime,
    DAY: TexasPick3Lottery.getActualDayDrawingTime,
    EVENING: TexasPick3Lottery.getActualEveningDrawingTime,
    NIGHT: TexasPick3Lottery.getActualNightDrawingTime
};
module.exports = TexasPick3Lottery;
