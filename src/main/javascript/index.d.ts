declare module MBytePushers {
  export interface DrawingTimeNotFoundException {
    new (drawingTime:string, drawingDat:Date):DrawingTimeNotFoundException;
    toString():string;
  }

  export interface DrawingYearNotAvailableException {
    new (drawingTime:string, drawingDat:Date):DrawingYearNotAvailableException;
    toString():string;
  }

  export interface Pick3LotteryWebScrapingService {
    new (baseUrl: string): Pick3LotteryWebScrapingService;
    retrieveWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string, request: Function):Promise<ScrapingServiceDTO>;
  }

  export interface ScrapingServiceDTO {
    number: number;
    date: Date;
    time: string;
  }

  export interface BaseWebScraper {
    getBaseUrl() : string;
    getCheerio(): object;
  }

  export interface BytePushers {
    BaseWebScraper: BaseWebScraper;
    DrawingTimeNotFoundException: DrawingTimeNotFoundException;
    DrawingYearNotAvailableException: DrawingYearNotAvailableException;
    Pick3LotteryWebScrapingService: Pick3LotteryWebScrapingService;
    ScrapingServiceDTO: ScrapingServiceDTO;
  }

}

declare const BytePushers: MBytePushers.BytePushers;
export = BytePushers;
