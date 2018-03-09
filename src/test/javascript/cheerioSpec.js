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
                d = $('#pastResults').find('tr > td:first-child:contains("02/15/2018")');

            assert.notEqual(d, null);
            assert.notEqual(d, undefined);
        //});

        /*it("should be able to find date of first row", function() {
            //var html = readFixtures('pick3-morning-drawing-fixture.html');
            var html = "<html>" +
                "<body>" +
                "<table id='pastResults'>" +
                "<caption>Pick 3™ Past Winning Numbers 2018</caption>" +
                "<tbody>" +
                "<tr>" +
                "<th>Draw Date</th>" +
                "<th colspan='3'>Morning Winning Numbers</th>" +
                "<th>Sum It Up!</th>" +
                "<th colspan='3'>Day Winning Numbers</th>" +
                "<th>Sum It Up!</th>" +
                "<th colspan='3'>Evening Winning Numbers</th>" +
                "<th>Sum It Up!</th>" +
                "<th colspan='3'>Night Winning Numbers</th>" +
                "<th>Sum It Up!</th>" +
                "</tr>" +
                "<tr class='info'>" +
                "<td id='date' >02/15/2018</td>" +
                "<td>1</td><td>5</td><td>8\n&nbsp;\n</td>" +
                "<td><strong>14</strong><td colspan='3'>&nbsp;</td><td>&nbsp;</td><td colspan='3'>&nbsp;</td><td>&nbsp;</td><td colspan='3'>&nbsp;</td><td>&nbsp;</td></tr><tr><td>02/14/2018</td><td>2</td><td>9</td><td>9\n&nbsp;\n</td><td><strong>20</strong></td><td>2</td><td>8</td><td>4\n&nbsp;\n</td><td><strong>14</strong></td><td>2</td><td>3</td><td>0\n&nbsp;\n</td><td><strong>6</strong></td><td>1</td><td>2</td><td>9\n&nbsp;\n</td><td><strong>9</strong></td></tr><tr><td>02/13/2018</td><td>2</td><td>4</td><td>0\n&nbsp;\n</td><td><strong>6</strong></td><td>2</td><td>7</td><td>1\n&nbsp;\n</td><td><strong>10</strong></td><td>1</td><td>6</td><td>1\n&nbsp;\n</td><td><strong>8</strong></td><td>8</td><td>2</td><td>0\n&nbsp;\n</td><td><strong>10</strong></td></tr></tbody></table></body></html>";
            var $ = cheerio.load(html);
            var expectedDrawDate = "02/15/2018";
            var tableData = $('td').text(); //Be able to pull specific date(one type of number at a time)
            var actualDate = tableData.split(" ");
            expect(expectedDrawDate).toBe(actualDate);
        });

        it("should be able to find the date of the second row", function(){
            function splitString(stringToSplit, separator){
                var arrayOfData = stringToSplit.split(separator);
                var space = ' ';
                var comma = ",";

            }

        })*/
    //});
//});