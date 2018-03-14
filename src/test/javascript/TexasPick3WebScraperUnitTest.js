/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    fixturePath = "src/test/javascript/fixtures/html/",
    $;

describe("TexasPick3WebScraper Unit Tests", function() {
    it("should be able to find morning winning Number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            expectedDate = new Date("02/15/2018"),
            expectedMorningWinningNumber = 158,
            actualMorningWinningNumber,
            scraper;

        $ = cheerio.load(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            cheerio: $
        });

        actualMorningWinningNumber = scraper.findWinningNumber(expectedDate, "Morning");

        assert.equal(actualMorningWinningNumber, expectedMorningWinningNumber);
    });
});