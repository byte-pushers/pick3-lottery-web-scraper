declare module MDrawingTimeNotFoundException {
    export interface DrawingTimeNotFoundException {
        toString():string;
        new(drawingTime:string, drawingDat:Date):DrawingTimeNotFoundException;
    }

    export interface Main {
        toString():string;
        new(drawingTime:string, drawingDat:Date):DrawingTimeNotFoundException;
    }
}

declare var DrawingTimeNotFoundException:MDrawingTimeNotFoundException.Main;