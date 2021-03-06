/**
 * Created by kalexmills on 7/20/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    fixturePath = "src/test/javascript/fixtures/html/",
    pageReader = {
        read: (html) => {
            return cheerio.load(html);
        },
        read2: (html) => {
            var r;

            cheerio.load(html).each((a, b) => {
                if (b.localName === "table") {
                    r = cheerio(b);
                }
            });

            return r;
        }
    };

describe("TexasPick3UrlScraper Unit Tests", function() {
    it("should be able to find URLs for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-url-scraper-fixture.html", "UTF-8"),
            expectedUrl = "https://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html",
            actualUrl,
            actualDrawDate = new Date("02/15/2018"),
            scraper;

        scraper = new BytePushers.TexasPick3UrlScraper({
            baseUrl: BytePushers.TexasPick3UrlScraper.BASE_URL,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
        });

        actualUrl = scraper.findDrawingUrlForYear(actualDrawDate);

        assert.strictEqual(expectedUrl, actualUrl);
    });

    it("should be able to find URLs for a date in the past", function () {
        var html = fs.readFileSync(fixturePath + "pick3-url-scraper-fixture.html", "UTF-8"),
            expectedUrl = "https://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8803961.html",
            actualUrl,
            actualDrawDate = new Date("01/31/1997"),
            scraper;

        scraper = new BytePushers.TexasPick3UrlScraper({
            baseUrl: BytePushers.TexasPick3UrlScraper.BASE_URL,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
        });

        actualUrl = scraper.findDrawingUrlForYear(actualDrawDate);

        assert.strictEqual(expectedUrl, actualUrl);
    });

    it("should throw a DrawingYearNotAvailableException when drawing time requested for a date which has no data", function () {
        var html = fs.readFileSync(fixturePath + "pick3-url-scraper-fixture.html", "UTF-8"),
            actualUrl,
            actualDrawDate = new Date("01/31/1986"),
            scraper;

        scraper = new BytePushers.TexasPick3UrlScraper({
            baseUrl: BytePushers.TexasPick3UrlScraper.BASE_URL,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
        });

        assert.throws(() => {
            actualUrl = scraper.findDrawingUrlForYear(actualDrawDate);
        }, BytePushers.DrawingYearNotAvailableException);
    });
});
