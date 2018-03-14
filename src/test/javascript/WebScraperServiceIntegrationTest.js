/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    fixturePath = "src/test/javascript/fixtures/html/",
    $;

describe("WebScraperService Integration Tests", function() {
    it("should be able to scrape Texas Pick3 Lottery website and return winning number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            expectedDate = new Date("02/15/2018"),
            expectedMorningWinningNumber = 158,
            actualMorningWinningNumber,
            service;

        $ = cheerio.load(html);

        service = new BytePushers.WebScraperService({
            url: BytePushers.TexasPick3WebScraper.URL,
            cheerio: $
        });

        actualMorningWinningNumber = service.retrieveWinningNumber("TX", expectedDate, "Morning");

        assert.equal(actualMorningWinningNumber.number, expectedMorningWinningNumber);
    });
});