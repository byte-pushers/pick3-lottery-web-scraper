/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert'),
    request = require('request');

describe("WebScraperService Integration Tests", function() {
    it("should be able to scrape Texas Pick3 Lottery website and return winning number for a specific date", function () {
        var actualDrawingStateAbbreviation = "TX",
            actualDrawingTime = "Morning",
            actualDrawingDate = new Date("02/15/2018"),
            expectedMorningWinningNumber = 158,
            service;

        service = new BytePushers.Pick3LotteryWebScrapingService(BytePushers.TexasPick3UrlScraper.BASE_URL);

        return service.retrieveWinningNumber(actualDrawingStateAbbreviation, actualDrawingDate, actualDrawingTime, request).then(function(actualMorningWinningNumber) {
            assert.equal(actualMorningWinningNumber.number, expectedMorningWinningNumber);
        });
    });
    it("should be able to scrape Texas Pick3 Lottery website and return winning number for a historical date", function () {
        var actualDrawingStateAbbreviation = "TX",
            actualDrawingTime = "Morning",
            actualDrawingDate = new Date("02/15/2020"),
            expectedMorningWinningNumber = 647,
            service;

        service = new BytePushers.Pick3LotteryWebScrapingService(BytePushers.TexasPick3UrlScraper.BASE_URL);

        return service.retrieveWinningNumber(actualDrawingStateAbbreviation, actualDrawingDate, actualDrawingTime, request).then(function(actualMorningWinningNumber) {
            assert.equal(actualMorningWinningNumber.number, expectedMorningWinningNumber);
        });
    });
    it("should be able to scrape Texas Pick3 Lottery website and return DrawingTimeNotFoundException when drawing times are unavailable", function() {
        var actualDrawingStateAbbreviation = "TX",
            actualDrawingTime = "Morning",
            actualDrawingDate = new Date("06/14/1999"),
            service;

        service = new BytePushers.Pick3LotteryWebScrapingService(BytePushers.TexasPick3UrlScraper.BASE_URL);

        return service.retrieveWinningNumber(actualDrawingStateAbbreviation, actualDrawingDate, actualDrawingTime, request).catch(function(error) {
            assert.equal(error.code, BytePushers.Exception.Code.DRAWING_TIME_NOT_FOUND);
        });
    });
    it("should be able to scrape Texas Pick3 Lottery website and return DrawingYearNotAvailable when a drawing year is unavailable", function() {
        var actualDrawingStateAbbreviation = "TX",
            actualDrawingTime = "Morning",
            actualDrawingDate = new Date("06/22/1972"),
            service;

        service = new BytePushers.Pick3LotteryWebScrapingService(BytePushers.TexasPick3UrlScraper.BASE_URL);

        return service.retrieveWinningNumber(actualDrawingStateAbbreviation, actualDrawingDate, actualDrawingTime, request).catch(function(error) {
            assert.equal(error.code, BytePushers.Exception.Code.DRAWING_YEAR_NOT_AVAILABLE);
        });
    });
});
