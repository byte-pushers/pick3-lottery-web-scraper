/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var UrlScraper = require('./software.bytepushers.pick3.lottery.web.UrlScraper');
var DrawingYearNotAvailableException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingYearNotAvailableException');

function TexasPick3UrlScraper(TxPick3UrlScraperConfig) {
    'use strict';
    var self = {};
    
    TexasPick3UrlScraper.prototype.superclass.apply(self, [TxPick3UrlScraperConfig]);

    var $ = self.getCheerio();

    self.scrapeTargetUrl = function(targetDate) {
        var targetYear = targetDate.getFullYear(),
            targetUrl = $('#Pick3PastWinningNumbers').find('select > option:contains(' + targetYear + ')').attr("value"),
            pathArray = self.getUrl().split('/'),
            baseUrl = pathArray[0] + "//" + pathArray[2];

        if (targetUrl === null) {
            throw new DrawingYearNotAvailableException(targetYear);
        }
        return baseUrl + targetUrl.replace("index", "print");
    };

    return self;
}

TexasPick3UrlScraper.prototype = BytePushers.inherit(UrlScraper.prototype);
TexasPick3UrlScraper.prototype.constructor = TexasPick3UrlScraper;
TexasPick3UrlScraper.prototype.superclass = UrlScraper;

TexasPick3UrlScraper.URL = "https://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/";

module.exports = TexasPick3UrlScraper;