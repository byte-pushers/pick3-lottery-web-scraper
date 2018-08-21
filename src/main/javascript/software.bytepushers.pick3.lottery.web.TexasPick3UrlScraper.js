/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var UrlScraper = require('./software.bytepushers.pick3.lottery.web.UrlScraper');
var DrawingYearNotAvailableException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingYearNotAvailableException');

function TexasPick3UrlScraper(TxPick3UrlScraperConfig) {
    'use strict';
    
    TexasPick3UrlScraper.prototype.superclass.apply(this, [TxPick3UrlScraperConfig]);

    var $ = this.getCheerio();

    this.scrapeTargetUrl = function(targetDate) {
        var targetYear = targetDate.getFullYear(),
            targetUrl = $('#Pick3PastWinningNumbers').find('select > option:contains(' + targetYear + ')').attr("value"),
            baseUrl = this.getBaseUrl();

        if (targetUrl === undefined || targetUrl === null) {
            throw new DrawingYearNotAvailableException(targetYear);
        }
        return baseUrl + targetUrl.replace("index", "print");
    };
}

TexasPick3UrlScraper.prototype = BytePushers.inherit(UrlScraper.prototype);
TexasPick3UrlScraper.prototype.constructor = TexasPick3UrlScraper;
TexasPick3UrlScraper.prototype.superclass = UrlScraper;

TexasPick3UrlScraper.PATH_TO_SCRAPE = "/export/sites/lottery/Games/Pick_3/Winning_Numbers/";
TexasPick3UrlScraper.BASE_URL = "https://www.txlottery.org";

module.exports = TexasPick3UrlScraper;