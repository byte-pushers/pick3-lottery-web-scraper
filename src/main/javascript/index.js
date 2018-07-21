/*global require, module*/

var BytePushers = {};
BytePushers.opp = require('bytepushers-js-oop');
BytePushers.Pick3LotteryWebScrapingService = require('./software.bytepushers.pick3.lottery.web.Pick3LotteryWebScrapingService');
BytePushers.BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');
BytePushers.WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
BytePushers.TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');
BytePushers.UrlScraper = require('./software.bytepushers.pick3.lottery.web.UrlScraper');
BytePushers.TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');

module.exports = BytePushers;