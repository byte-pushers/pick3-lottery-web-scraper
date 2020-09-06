/**
 * Created by tonte on 2/15/18.
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
        }
    };

describe("TexasPick3WebScraper Unit Tests", function() {
    it("should be able to find Morning winning Number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            expectedMorningWinningNumber = 158,
            actualMorningWinningNumber,
            actualDrawDate = new Date("02/15/2018"),
            actualDrawingTime = "Morning",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualMorningWinningNumber, expectedMorningWinningNumber);
    });
    it("should be able to find Day Winning Number for a specific date", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            actualDrawDate = "02/14/2018",
            expectedDayWinningNumber = 284,
            actualDrawingTime = "Day",
            actualDayWinningNumber,
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualDayWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualDayWinningNumber, expectedDayWinningNumber);
    });
    it("should be able to find Evening Winning Number for a specific date", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            actualDrawDate = "02/14/2018",
            expectedEveningWinningNumber = 230,
            actualDrawingTime = "Evening",
            actualEveningWinningNumber,
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualEveningWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualEveningWinningNumber, expectedEveningWinningNumber);
    });
    it("should be able to find Night Winning Number for a specific date", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            actualDrawDate = "02/14/2018",
            expectedNightWinningNumber = 129,
            actualDrawingTime = "Night",
            actualNightWinningNumber,
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualNightWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualNightWinningNumber, expectedNightWinningNumber);
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the MORNING drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/12/2018",
            drawTime = "MORNING",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the DAY drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/11/2018",
            drawTime = "DAY",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the EVENING drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/12/2018",
            drawTime = "EVENING",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the NIGHT drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/11/2018",
            drawTime = "NIGHT",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should correctly identify any combination of missing times -- binary code: 0000", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/10/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0001", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/11/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0010", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/12/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0011", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/13/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0100", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/14/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0101", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/15/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0110", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/16/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 0111", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/17/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "NIGHT");
        }, BytePushers.DrawingTimeNotFoundException);
    });
    it("should correctly identify any combination of missing times -- binary code: 1000", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/18/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1001", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/19/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1010", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/20/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1011", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/21/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1100", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/22/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1101", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/23/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1110", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/24/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1111", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/25/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            pageReader: $
        });

        actualWinningNumber = scraper.findWinningNumber(drawDate, "MORNING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "DAY");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "EVENING");
        assert.equal(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findWinningNumber(drawDate, "NIGHT");
        assert.equal(actualWinningNumber, expectedWinningNumber);
    });
});
