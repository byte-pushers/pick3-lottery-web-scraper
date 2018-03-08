/**
 * Created by tonte on 10/4/17.
 */
/*global require*/

var cheerio = require("cheerio");
var request = require("request");

console.log("Grabbing table data from Pick 3");

var url = "http://www.lotteryusa.com/texas/evening-pick-3/"
request(url, function(err,resp,html){

    var $ = cheerio.load(html);

    var results = [];

    $("tbody").each(function(i, element){
    /*Pulled out the Dates, now need to separate them
    */

        var date = $(".date");
        var dateText = date.text();

         // var drawingTime = $();
   /* Pulled out the winnig numbers , Now the numbers need to be parsed into a format
   in which they are separated in threes.
   */
         var win_numbers = $(".draw-result").children().text();


        results.push({
            date: dateText,
            // drawingTime: drawingTime,
            win_numbers: win_numbers
        });
    });
    console.log(results);
});




/*
(function () {
    'use strict';
    var request = require('request');
    var cheerio = require('cheerio');
    var BytePushers = {};

    BytePushers.service.Scraper = BytePushers.namespace("software.service.Scraper");
    BytePushers.service.Scraper.doScrape = function (url, callback) {
        //url: http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html
        request(url, callback)
    };

    BytePushers.service.Scraper.scrapeTxPick3LotterySite = function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html,
                date,
                drawingTime,
                number;



        }
    };

}());
*/

/*function scrapeTxPick3LotterySite = function (error, response, html) {
    if (!error) {
        var $ = cheerio.load(html,
            date,
            drawingTime,
            number;



    }
};

// index.js -> Bytepushers
module.exports = {
    scrapeTxPick3LotterySite: scrapeTxPick3LotterySite,



}*/
