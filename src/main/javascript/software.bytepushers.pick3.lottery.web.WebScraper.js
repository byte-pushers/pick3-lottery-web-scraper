
function WebScraper(txPick3WebScraperConfig) {
    'use strict';
    var url = (txPick3WebScraperConfig && txPick3WebScraperConfig.url)? txPick3WebScraperConfig: null;
    var $ = (txPick3WebScraperConfig && txPick3WebScraperConfig.cheerio)? txPick3WebScraperConfig.cheerio: null;

    this.getUrl = function () {
        return url;
    };

    this.getCheerio = function () {
        return $;
    };

    this.scrape = function (error, response, html) {

        if (!error) {
            $ = cheerio.load(html);
            this.findWinningNumber();
        }
    };

    this.findWinningNumber = function (drawingDate, drawingTime) {
        throw Error("method not implemented by " + this.constructor.name);
    };
}

module.exports = WebScraper;