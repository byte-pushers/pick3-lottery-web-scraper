declare module MDrawingYearNotAvailableException {
    export interface DrawingYearNotAvailableException {
        toString():string;
        new(drawingTime:string, drawingDat:Date):DrawingYearNotAvailableException;
    }

    export interface Main {
        toString():string;
        new(drawingTime:string, drawingDat:Date):DrawingYearNotAvailableException;
    }
}

declare var DrawingYearNotAvailableException:MDrawingYearNotAvailableException.Main;