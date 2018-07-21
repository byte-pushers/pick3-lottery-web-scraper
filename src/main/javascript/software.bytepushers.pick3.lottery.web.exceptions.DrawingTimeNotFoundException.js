var BytePushers = require('bytepushers-js-oop');

function DrawingTimeNotFoundException(drawingTime, drawingDate) {
    'use strict';
    DrawingTimeNotFoundException.prototype.superclass.apply(this);

    this.name = "DrawingTimeNotFoundException";
    this.drawingTime = drawingTime;
    this.drawingDate = drawingDate;

    this.toString = function() {
        return String.format("DrawingTimeNotFoundException: the requested drawing time \"{1}\" was not available for date {2}",
            this.drawingTime, this.drawingDate);
    }
}

DrawingTimeNotFoundException.prototype = BytePushers.inherit(Error.prototype);
DrawingTimeNotFoundException.prototype.constructor = DrawingTimeNotFoundException;
DrawingTimeNotFoundException.prototype.superclass = Error;

module.exports = DrawingTimeNotFoundException;
