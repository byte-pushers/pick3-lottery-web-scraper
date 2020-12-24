/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    url = "http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html",
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

describe("TexasPick3WebScraper Unit Tests for Past Winning Numbers", function() {
    it("should be able to find Morning winning Number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            expectedMorningWinningNumber = 158,
            actualMorningWinningNumber,
            actualDrawDate = new Date("02/15/2018"),
            actualDrawingTime = "Morning",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findPastWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualMorningWinningNumber, expectedMorningWinningNumber);
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
            url: url,
            pageReader: $
        });

        actualDayWinningNumber = scraper.findPastWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualDayWinningNumber, expectedDayWinningNumber);
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
            url: url,
            pageReader: $
        });

        actualEveningWinningNumber = scraper.findPastWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualEveningWinningNumber, expectedEveningWinningNumber);
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
            url: url,
            pageReader: $
        });

        actualNightWinningNumber = scraper.findPastWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualNightWinningNumber, expectedNightWinningNumber);
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the MORNING drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/12/2018",
            drawTime = "MORNING",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the DAY drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/11/2018",
            drawTime = "DAY",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the EVENING drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/12/2018",
            drawTime = "EVENING",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, drawTime);
        }, BytePushers.DrawingTimeNotFoundException)
    });
    it("should throw a DrawingTimeNotFoundException when a date is found but the NIGHT drawing time is unavailable", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            drawDate = "02/11/2018",
            drawTime = "NIGHT",
            scraper;

        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        })

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, drawTime);
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
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "NIGHT");
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
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1001", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/19/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1010", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/20/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1011", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/21/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "EVENING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1100", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/22/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1101", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/23/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "DAY");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1110", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/24/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        assert.throws(() => {
            scraper.findPastWinningNumber(drawDate, "MORNING");
        }, BytePushers.DrawingTimeNotFoundException);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
    it("should correctly identify any combination of missing times -- binary code: 1111", function() {
        var html = fs.readFileSync(fixturePath + "pick3-missing-time-fixture.html", "UTF-8"),
            drawDate = "02/25/2011",
            actualWinningNumber = -1,
            expectedWinningNumber = 123,
            scraper;
        $ = pageReader.read(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: $
        });

        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "MORNING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "DAY");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "EVENING");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
        actualWinningNumber = scraper.findPastWinningNumber(drawDate, "NIGHT");
        assert.strictEqual(actualWinningNumber, expectedWinningNumber);
    });
});

describe("TexasPick3WebScraper Unit Tests for Last Drawn Numbers", function() {
    it("should be able to find Morning winning number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-last-drawn-numbers-fixture.html", "UTF-8"),
            expectedWinningNumber = 723,
            actualMorningWinningNumber,
            actualDrawDate = new Date("12/23/2020"),
            actualDrawingTime = "Morning",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findLastDrawingWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualMorningWinningNumber, expectedWinningNumber);
    });

    it("should be able to find Day winning number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-last-drawn-numbers-fixture.html", "UTF-8"),
            expectedWinningNumber = 75,
            actualMorningWinningNumber,
            actualDrawDate = new Date("12/23/2020"),
            actualDrawingTime = "Day",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findLastDrawingWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualMorningWinningNumber, expectedWinningNumber);
    });

    it("should be able to find Evening winning number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-last-drawn-numbers-fixture.html", "UTF-8"),
            expectedWinningNumber = 7,
            actualMorningWinningNumber,
            actualDrawDate = new Date("12/23/2020"),
            actualDrawingTime = "Evening",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findLastDrawingWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualMorningWinningNumber, expectedWinningNumber);
    });

    it("should be able to find Evening winning number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-last-drawn-numbers-fixture.html", "UTF-8"),
            expectedWinningNumber = 0,
            actualMorningWinningNumber,
            actualDrawDate = new Date("12/23/2020"),
            actualDrawingTime = "Night",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findLastDrawingWinningNumber(actualDrawDate, actualDrawingTime);

        assert.strictEqual(actualMorningWinningNumber, expectedWinningNumber);
    });

    it("should throw WinningNumberNotFoundException when unable to find Morning winning number.", function () {
        var html = fs.readFileSync(fixturePath + "pick3-last-drawn-numbers-with-bad-data-fixture.html", "UTF-8"),
            expectedWinningNumber = 723,
            actualMorningWinningNumber,
            actualDrawDate = new Date("12/23/2020"),
            actualDrawingTime = "Morning",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        assert.throws(() => {
            scraper.findLastDrawingWinningNumber(actualDrawDate, actualDrawingTime)
        }, (error) => {
            assert(error instanceof BytePushers.WinningNumberNotFoundException);
            return true;
        });
    });

    it("should throw DrawingTimeNotFoundException when unable to find Morning winning number for the specified date.", function () {
        var html = fs.readFileSync(fixturePath + "pick3-last-drawn-numbers-with-bad-data-fixture.html", "UTF-8"),
            expectedWinningNumber = 723,
            actualMorningWinningNumber,
            actualDrawDate = new Date("12/24/2020"),
            actualDrawingTime = "Morning",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: url,
            pageReader: pageReader.read(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        assert.throws(() => {
            scraper.findLastDrawingWinningNumber(actualDrawDate, actualDrawingTime)
        }, (error) => {
            assert(error instanceof BytePushers.DrawingTimeNotFoundException);
            return true;
        });
    });
});
