var BytePushers = require('bytepushers-js-oop');

function DrawingYearNotAvailableException(drawingYear) {
    'use strict';
    DrawingYearNotAvailableException.prototype.superclass.apply(this);

    this.name = "DrawingYearNotAvailableException";
    this.drawingYear = drawingYear;

    this.toString = function() {
        return String.format("DrawingYearNotAvailableException: data is not available for the requested drawing year \"{1}\".",
            this.drawingYear);
    }
}

DrawingYearNotAvailableException.prototype = BytePushers.inherit(Error.prototype);
DrawingYearNotAvailableException.prototype.constructor = DrawingYearNotAvailableException;
DrawingYearNotAvailableException.prototype.superclass = Error;

module.exports = DrawingYearNotAvailableException;
