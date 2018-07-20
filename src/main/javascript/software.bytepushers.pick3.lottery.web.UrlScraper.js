/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var BaseScraper = require('./software.bytepushers.pick3.lottery.web.BaseScraper');

function UrlScraper(urlScraperConfig) {
    'use strict';
    UrlScraper.prototype.superclass.apply(this, [urlScraperConfig]);
    var drawingDate = (urlScraperConfig && urlScraperConfig.drawingDate) ? urlScraperConfig.drawingDate : null;

    var $ = this.getCheerio();

    this.getDrawingDate = function() {
        return drawingDate;
    }

    this.scrapeTargetUrl = function(targetYear) {
        throw Error("method not implemented by UrlScraper " + this.constructor.name);
    }

    this.findSourcePath = function(drawingDate) {
        var targetYear = drawingDate.getFullYear(),
            targetUrl = this.scrapeTargetUrl(targetYear);

        return targetUrl;
    }
}

UrlScraper.prototype = BytePushers.inherit(BaseScraper.prototype);
UrlScraper.prototype.constructor = UrlScraper;
UrlScraper.prototype.superclass = BaseScraper;

module.exports = UrlScraper;