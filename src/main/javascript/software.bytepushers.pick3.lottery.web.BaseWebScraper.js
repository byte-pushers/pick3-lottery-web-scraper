/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

function BaseWebScraper(baseScraperConfig) {
    'use strict';
    var url = (baseScraperConfig && baseScraperConfig.url) ? baseScraperConfig.url : null,
        $ = (baseScraperConfig && baseScraperConfig.cheerio) ? baseScraperConfig.cheerio : {};

    this.getUrl = function () {
        return url;
    };

    this.getCheerio = function () {
        return $;
    };
}

module.exports = BaseWebScraper;