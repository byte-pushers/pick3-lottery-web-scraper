(function(BytePushers) {
    BytePushers = BytePushers || {};
    BytePushers.scraper = BytePushers.scraper ||  BytePushers.namespace("software.service.scraper.TexasPick3WebScraper");

    BytePushers.scraper.TexasPick3WebScraper = function TexasPick3WebScraper(TxPick3WebScraperConfig) {
        BytePushers.scraper.TexasPick3WebScraper.prototype.superclass.apply(this, [TxPick3WebScraperConfig]);
        

    };

    BytePushers.scraper.TexasPick3WebScraper.prototype = BytePushers.inherit(BytePushers.scraper.WebScraper.prototype);
    BytePushers.scraper.TexasPick3WebScraper.prototype.constructor = BytePushers.scraper.TexasPick3WebScraper;
    BytePushers.scraper.TexasPick3WebScraper.prototype.superclass = BytePushers.scraper.WebScraper;

    BytePushers.scraper.TexasPick3WebScraper.URL = "http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html";
})(BytePushers);