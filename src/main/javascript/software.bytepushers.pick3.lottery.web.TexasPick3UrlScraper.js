/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var UrlScraper = require('./software.bytepushers.pick3.lottery.web.UrlScraper');

function TexasPick3UrlScraper(TxPick3UrlScraperConfig) {
    'use strict';
    TexasPick3UrlScraper.prototype.superclass.apply(this, [TxPick3UrlScraperConfig]);

    var $ = this.getCheerio();

    this.scrapeTargetUrl = function(targetYear) {
        var targetUrl = $('#Pick3PastWinningNumbers').find('select > option:contains(' + targetYear + ')').attr("value"),
            pathArray = this.getUrl().split('/'),
            baseUrl = pathArray[0] + "//" + pathArray[2];

        return baseUrl + targetUrl.replace("index", "print");
    }
}

TexasPick3UrlScraper.prototype = BytePushers.inherit(UrlScraper.prototype);
TexasPick3UrlScraper.prototype.constructor = TexasPick3UrlScraper;
TexasPick3UrlScraper.prototype.superclass = UrlScraper;

TexasPick3UrlScraper.URL = "https://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/";

module.exports = TexasPick3UrlScraper;