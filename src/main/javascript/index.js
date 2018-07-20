/*global require, module*/

var BytePushers = {};
BytePushers.opp = require('bytepushers-js-oop');
BytePushers.Pick3LotteryWebScrapingService = require('./software.bytepushers.pick3.lottery.web.Pick3LotteryWebScrapingService');
BytePushers.BaseScraper = require('./software.bytepushers.pick3.lottery.web.BaseScraper');
BytePushers.WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
BytePushers.TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');
BytePushers.UrlScraper = require('./software.bytepushers.pick3.lottery.web.UrlScraper');
BytePushers.TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');

module.exports = BytePushers;