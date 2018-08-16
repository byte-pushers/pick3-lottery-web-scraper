/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingYearNotAvailableException(drawingYear) {
    'use strict';
    var self = {};
    
    DrawingYearNotAvailableException.prototype.superclass.apply(self);

    self.name = "DrawingYearNotAvailableException";
    self.code = Exception.Code.DRAWING_YEAR_NOT_AVAILABLE;
    self.drawingYear = drawingYear;

    self.toString = function () {
        return String.format("DrawingYearNotAvailableException: data is not available for the requested drawing year \"{1}\".",
            self.drawingYear);
    };

    return self;
}

DrawingYearNotAvailableException.prototype = BytePushers.inherit(Error.prototype);
DrawingYearNotAvailableException.prototype.constructor = DrawingYearNotAvailableException;
DrawingYearNotAvailableException.prototype.superclass = Error;

module.exports = DrawingYearNotAvailableException;
