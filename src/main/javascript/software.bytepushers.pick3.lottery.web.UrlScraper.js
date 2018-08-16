/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */
/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');

function UrlScraper(urlScraperConfig) {
    'use strict';
    var self = {};
    
    UrlScraper.prototype.superclass.apply(self, [urlScraperConfig]);
    var drawingDate = (urlScraperConfig && urlScraperConfig.drawingDate) ? urlScraperConfig.drawingDate : null;

    self.getDrawingDate = function() {
        return drawingDate;
    };

    self.scrapeTargetUrl = function() {
        throw new Error("method not implemented by UrlScraper " + self.constructor.name);
    };

    self.findSourcePath = function(drawingDate) {
        var targetUrl = self.scrapeTargetUrl(drawingDate);

        return targetUrl;
    };

    return self;
}

UrlScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
UrlScraper.prototype.constructor = UrlScraper;
UrlScraper.prototype.superclass = BaseWebScraper;

module.exports = UrlScraper;