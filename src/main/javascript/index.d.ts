
declare module MBytePushers {

  export interface DrawingTimeNotFoundException {
    (drawingTime:string, drawingDat:Date):DrawingTimeNotFoundException;
    toString():string;
  }

  export interface DrawingYearNotAvailableException {
    (drawingTime:string, drawingDat:Date):DrawingYearNotAvailableException;
    toString():string;
  }

  export interface Pick3LotteryWebScrapingService {
    (): Pick3LotteryWebScrapingService;
    retrieveWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string):Promise<ScrapingServiceDTO>;
    retrieveWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string, urlToScrape:string):Promise<ScrapingServiceDTO>;
  }

  export interface ScrapingServiceDTO {
    number: number;
    date: Date;
    time: string;
  }

  export interface BaseWebScraper {
    get
    getBaseUrl() : string;
    getCheerio(): object;
  }

  export interface BytePushers {
    BaseWebScraper: BaseWebScraper;
    DrawingTimeNotFoundException: DrawingTimeNotFoundException;
    DrawingYearNotAvailableException: DrawingYearNotAvailableException;
    Pick3LotteryWebScrapingService:Pick3LotteryWebScrapingService;
    ScrapingServiceDTO: ScrapingServiceDTO;
  }

}

declare var BytePushers:MBytePushers.BytePushers;
