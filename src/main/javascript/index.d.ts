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
    retrieveWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string, request: Function, pageReader: {read:Function}):Promise<ScrapingServiceDTO>;
    getActualMorningDrawingTime(drawingState: string): Date;
    getActualDayDrawingTime(drawingState: string): Date
    getActualEveningDrawingTime(drawingState: string): Date;
    getActualNightDrawingTime(drawingState: string): Date;
  }

  export interface ScrapingServiceDTO {
    number: number;
    date: Date;
    time: string;
  }

  export interface BaseWebScraper {
    getBaseUrl() : string;
    getPageReader(): object;
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
