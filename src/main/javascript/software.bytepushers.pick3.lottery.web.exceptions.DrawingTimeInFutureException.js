var BytePushers = require('bytepushers-js-oop');

function DrawingTimeInFutureException(drawingTime, drawingDate, expectedDrawTime) {
    'use strict';
    DrawingTimeInFutureException.prototype.superclass.apply(this);

    this.name = "DrawingTimeInFutureException";
    this.drawingTime = drawingTime;
    this.drawingDate = drawingDate;
    this.expectedDrawTime = expectedDrawTime;

    this.toString = function() {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            this.drawingTime, this.drawingDate, this.expectedDrawTime);
    }
}

DrawingTimeInFutureException.prototype = BytePushers.inherit(Error.prototype);
DrawingTimeInFutureException.prototype.constructor = DrawingTimeInFutureException;
DrawingTimeInFutureException.prototype.superclass = Error;

module.exports = DrawingTimeInFutureException;