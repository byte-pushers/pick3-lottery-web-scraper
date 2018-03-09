/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
//define(['cheerio'], function (cheerio) {
    var assert = require('assert'),
        cheerio = require('cheerio'),
        fs = require('fs'),
        fixturePath = "fixtures/html/",
        $;

    function scrapeMorningWinningNumber($section) {
        var num1 = $section.find("td:nth-child(2)").text(),
            num2 = $section.find("td:nth-child(3)").text(),
            num3 = $section.find("td:nth-child(4)").text();

        num1 = num1.replace(/(\r\n\t|\n|\r\t)/gm,"");
        num2 = num2.replace(/(\r\n\t|\n|\r\t)/gm,"");
        num3 = num3.replace(/(\r\n\t|\n|\r\t)/gm,"");

        return 100 * num1 + 10 * num2 + num3;
    }

    function findMorningWinningNumber(drawingDate) {
        var winningNumber = 0,
            $targetTdElement = $('#pastResults').find('tr > td:first-child:contains('+drawingDate+')'),
            $targetTrElement = $targetTdElement.parent();

        winningNumber = scrapeMorningWinningNumber($targetTrElement);

        return winningNumber;

    }

    //describe("Cheerio tests", function() {
        //it("should be able to find morning winning Number for a specific date", function () {
            var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
                expectedDate = "02/15/2018",
                actualMorningWinningNumber,
                expectedMorningWinningNumber = 158;


            $ = cheerio.load(html);
            actualMorningWinningNumber = findMorningWinningNumber(expectedDate);

            assert.equal(actualMorningWinningNumber, expectedMorningWinningNumber);
        //});
    //});
//});