declare module MPick3LotteryWebScrapingService {
    export interface Pick3LotteryWebScrapingService {
        toString():string;
        new(drawingTime:string, drawingDat:Date):Pick3LotteryWebScrapingService;
    }

    export interface Main {
        retrieveWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string):Promise;
        new(drawingTime:string, drawingDat:Date):Pick3LotteryWebScrapingService;
    }
}

declare var Pick3LotteryWebScrapingService:MPick3LotteryWebScrapingService.Main;