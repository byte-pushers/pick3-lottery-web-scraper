
var BytePushers = require('bytepushers-js-oop');
var WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');

function TexasPick3WebScraper(TxPick3WebScraperConfig) {
    'use strict';
    TexasPick3WebScraper.prototype.superclass.apply(this, [TxPick3WebScraperConfig]);
    var $ = this.getCheerio();

    this.findWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0;

        switch (drawingTime.toUpperCase()) {
            case TexasPick3WebScraper.DRAWING_TIMES.MORNING.value:
                winningNumber = findMorningWinningNumber(drawingDate);
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = findMorningWinningNumber(drawingDate);
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.DAY.value:
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.DAY.name:
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.EVENING.value:
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.EVENING.name:
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.NIGHT.value:
                break;
            case TexasPick3WebScraper.DRAWING_TIMES.NIGHT.name:
                break;
            default:
                throw new Error("TexasPick3WebScraper.DRAWING_TIMES("+drawingTime+") is not supported.");
        }

        return winningNumber;
    };

    function removeNewLine2(someText) {
        var bytes = []; // char codes

        for (var i = 0; i < someText.length; ++i) {
            var code = someText.charCodeAt(i);

            bytes = bytes.concat([code]);
        }

        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] === 92 && bytes[i+1] === 110) {
                bytes.splice(i, 2);
            }
        }

        someText = convertBinaryArrayToString(bytes);

        return someText.trim();
    }

    function convertBinaryArrayToString(bytes) {
        var result = "";

        for (var i = 0; i < bytes.length; i++) {
            result += String.fromCharCode(bytes[i]);
        }

        return result;
    }

    function scrapeMorningWinningNumber($section) {
        var num1 = $section.find("td:nth-child(2)").text(),
            num2 = $section.find("td:nth-child(3)").text(),
            num3 = $section.find("td:nth-child(4)").text();

        num1 = removeNewLine2(num1).trim();
        num2 = removeNewLine2(num2).trim();
        num3 = removeNewLine2(num3).trim();

        return 100 * num1 + 10 * num2 + 1 * num3;
    }

    function scrapeDrawDateTdElement(drawingDate) {
        var $drawDateTdElement = $('#pastResults').find('tr > td:first-child:contains('+drawingDate+')');

        return $drawDateTdElement;
    }

    function scrapeDrawDateTrElement($targetTdElement) {
        var $drawDateTrElement = $targetTdElement.parent();

        return $drawDateTrElement;
    }

    function findMorningWinningNumber(drawingDate) {
        var $targetTdElement = scrapeDrawDateTdElement(drawingDate),
            $targetTrElement = scrapeDrawDateTrElement($targetTdElement),
            winningNumber = scrapeMorningWinningNumber($targetTrElement);

        return winningNumber;
    }
}

TexasPick3WebScraper.prototype = BytePushers.inherit(WebScraper.prototype);
TexasPick3WebScraper.prototype.constructor = TexasPick3WebScraper;
TexasPick3WebScraper.prototype.superclass = WebScraper;

TexasPick3WebScraper.URL = "http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html";
TexasPick3WebScraper.DRAWING_TIMES = BytePushers.enumeration({
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

module.exports = TexasPick3WebScraper;