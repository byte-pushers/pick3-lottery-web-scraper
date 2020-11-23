declare module MWinningNumberNotFoundException {
    export interface WinningNumberNotFoundException {
        toString():string;
        new(drawingTime:string, drawingDat:Date):WinningNumberNotFoundException;
    }
}

declare const WinningNumberNotFoundException:MWinningNumberNotFoundException.WinningNumberNotFoundException;
export = WinningNumberNotFoundException;
