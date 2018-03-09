/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
//define(['cheerio'], function (cheerio) {
    var assert = require('assert'),
        cheerio = require('cheerio'),
        fs = require('fs'),
        fixturePath = "fixtures/html/";

    //describe("Cheerio tests", function() {
        //it("should be able to find morning winning Number for a specific date", function () {
            var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
                $ = cheerio.load(html),
                d = $('#pastResults').find('tr > td:first-child:contains("02/15/2018")'),
                e = $("#pastResults").find("tr:nth-child(2)");
                console.log(e.text());
            assert.notEqual(d, null);
            assert.notEqual(d, undefined);
        //});
    //});
//});