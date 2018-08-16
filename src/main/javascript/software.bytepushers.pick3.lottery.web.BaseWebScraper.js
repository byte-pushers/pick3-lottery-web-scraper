/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

function BaseWebScraper(baseScraperConfig) {
    'use strict';
    var self = {};

    var url = (baseScraperConfig && baseScraperConfig.url) ? baseScraperConfig.url : null;
    var $ = (baseScraperConfig && baseScraperConfig.cheerio) ? baseScraperConfig.cheerio : {};

    self.getUrl = function () {
        return url;
    };

    self.getCheerio = function () {
        return $;
    };

    return self;
}

module.exports = BaseWebScraper;