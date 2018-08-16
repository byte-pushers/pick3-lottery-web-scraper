/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');
var DrawingTimeNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingTimeNotFoundException');

function WebScraper(txPick3WebScraperConfig) {
    'use strict';
    var self = {};
    
    WebScraper.prototype.superclass.apply(self, [txPick3WebScraperConfig]);
    self.drawingDate = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingDate)? txPick3WebScraperConfig.drawingDate : null;
    self.drawingTime = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingTime)? txPick3WebScraperConfig.drawingTime : null;
    self.drawingNumber = -1;

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    self.getDrawingDate = function () {
        return self.drawingDate;
    };

    self.getDrawingTime = function () {
        return self.drawingTime;
    };

    self.getDrawingNumber = function () {
        return self.drawingNumber;
    };

    self.findMorningWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.findDayWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.findEveningWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.findNightWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.getMorningPostTime = function() {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.getDayPostTime = function() {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.getEveningPostTime = function() {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.getNightPostTime = function() {
        throw new Error("method not implemented by WebScraper " + self.constructor.name);
    };

    self.findWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0,
            formattedDrawingDate = self.formatDate(drawingDate);

        if (formattedDrawingDate === undefined || formattedDrawingDate === null) {
            console.error("Problem occurred while trying to format date: " + drawingDate, drawingDate);

            throw new Error("Problem occurred while trying to format date: " + drawingDate);
        }

        switch (drawingTime.toUpperCase()) {
            case WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = self.findMorningWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.DAY.name:
                winningNumber = self.findDayWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.EVENING.name:
                winningNumber = self.findEveningWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.NIGHT.name:
                winningNumber = self.findNightWinningNumber(formattedDrawingDate);
                break;
            default:
                throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
        }

        return winningNumber;
    };

    self.formatDate = function(targetDate) {
        var formattedTargetDate = null;

        if (targetDate instanceof Date) {
            formattedTargetDate = pad(targetDate.getMonth()+1) + "/" + pad(targetDate.getDate()) + "/" + targetDate.getFullYear();
        } else if (typeof targetDate === 'string' || targetDate instanceof String) {
            formattedTargetDate = targetDate;
        }

        return formattedTargetDate;
    };

    return self;
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

WebScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
WebScraper.prototype.constructor = WebScraper;
WebScraper.prototype.superclass = BaseWebScraper;

module.exports = WebScraper;
