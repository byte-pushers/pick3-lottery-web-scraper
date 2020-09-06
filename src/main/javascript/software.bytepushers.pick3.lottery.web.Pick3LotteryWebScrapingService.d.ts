declare module MPick3LotteryWebScrapingService {
    // import ScrapingServiceDTO = BytePushers.ScrapingServiceDTO;
    export interface ScrapingServiceDTO {
        number: number;
        date: Date;
        time: string;
    }

    export interface Pick3LotteryWebScrapingService {
        new():Pick3LotteryWebScrapingService;
    }

    export interface Main {
        retrieveWinningNumber(drawingState:string, drawingDate:Date, drawingTime:string):Promise<ScrapingServiceDTO>;
        new():Pick3LotteryWebScrapingService;
    }
}

declare var Pick3LotteryWebScrapingService:MPick3LotteryWebScrapingService.Main;
