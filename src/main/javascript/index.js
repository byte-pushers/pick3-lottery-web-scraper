/*global require, module, BytePushers, let */

var BytePushers = {};
BytePushers.opp = require('bytepushers-js-oop');
BytePushers.WebScraperService = require('./software.bytepushers.pick3.lottery.web.WebScraperService');
BytePushers.WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
BytePushers.TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

module.exports = BytePushers;

/*module.exports = {
    webscraper: require('./software.bytepushers.pick3.lottery.web.scraper')

};*/



