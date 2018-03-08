/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll*/
//define(['cheerio'], function (cheerio) {
    var cheerio = require('cheerio');
    describe("Cheerio tests", function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = 'base/src/test/javascript/fixtures/html';
        });

        //began writing filter tests and really need to finish filters period

        it("should be able to find ", function() {
            var html = readFixtures('pick3-morning-drawing-fixture.html');//"<html><body><table id='pastResults'><caption>Pick 3™ Past Winning Numbers 2018</caption><tbody><tr><th>Draw Date</th><th colspan='3'>Morning Winning Numbers</th><th>Sum It Up!</th><th colspan='3'>Day Winning Numbers</th><th>Sum It Up!</th><th colspan='3'>Evening Winning Numbers</th><th>Sum It Up!</th><th colspan='3'>Night Winning Numbers</th><th>Sum It Up!</th></tr><tr><td>02/15/2018</td><td>1</td><td>5</td><td>8\n&nbsp;\n</td><td><strong>14</strong><td colspan='3'>&nbsp;</td><td>&nbsp;</td><td colspan='3'>&nbsp;</td><td>&nbsp;</td><td colspan='3'>&nbsp;</td><td>&nbsp;</td></tr><tr><td>02/14/2018</td><td>2</td><td>9</td><td>9\n&nbsp;\n</td><td><strong>20</strong></td><td>2</td><td>8</td><td>4\n&nbsp;\n</td><td><strong>14</strong></td><td>2</td><td>3</td><td>0\n&nbsp;\n</td><td><strong>6</strong></td><td>1</td><td>2</td><td>9\n&nbsp;\n</td><td><strong>9</strong></td></tr><tr><td>02/13/2018</td><td>2</td><td>4</td><td>0\n&nbsp;\n</td><td><strong>6</strong></td><td>2</td><td>7</td><td>1\n&nbsp;\n</td><td><strong>10</strong></td><td>1</td><td>6</td><td>1\n&nbsp;\n</td><td><strong>8</strong></td><td>8</td><td>2</td><td>0\n&nbsp;\n</td><td><strong>10</strong></td></tr></tbody></table></body></html>";
            var $ = cheerio.load(html);

            expect(true).toBe(true);
        });
    });
//});