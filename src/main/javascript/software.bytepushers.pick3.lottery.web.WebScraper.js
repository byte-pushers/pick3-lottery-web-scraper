(function(BytePushers) {
    BytePushers = BytePushers || {};
    BytePushers.scraper = BytePushers.scraper ||  BytePushers.namespace("software.service.scraper.WebScraper");

    BytePushers.scraper.WebScraper = function WebScraper(txPick3WebScraperConfig) {
        var url = (txPick3WebScraperConfig && txPick3WebScraperConfig.url)? txPick3WebScraperConfig: null;
        var $ = (txPick3WebScraperConfig && txPick3WebScraperConfig.cheerio)? txPick3WebScraperConfig.cheerio: null;
        var drawingDate = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingDate)? txPick3WebScraperConfig.drawingDate: null;
        var drawingTime = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingTime)? txPick3WebScraperConfig.drawingTime: null;
        var drawingNumber = -1;

        this.getUrl = function () {
            return url;
        };

        this.getDrawingDate = function () {
            return drawingDate;
        };

        this.setDrawingDate = function (drawingDate) {
            drawingDate = drawingDate;
        };

        this.getDrawingTime = function () {
            return drawingTime;
        };

        this.setDrawingTime = function (someDrawingTime) {
            drawingTime = someDrawingTime;
        };

        this.getDrawingNumber = function () {
            return drawingNumber;
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

        this.isDrawingNumberAvailable = function () {
            throw Error("method not implemented by " + this.constructor.name);
        };
    };
})(BytePushers);