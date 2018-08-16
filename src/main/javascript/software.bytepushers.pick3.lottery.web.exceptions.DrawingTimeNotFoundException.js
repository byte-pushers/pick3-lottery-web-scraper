/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingTimeNotFoundException(drawingTime, drawingDate) {
    'use strict';
    var self = {};

    DrawingTimeNotFoundException.prototype.superclass.apply(self);

    self.name = "DrawingTimeNotFoundException";
    self.code = Exception.Code.DRAWING_TIME_NOT_FOUND;
    self.drawingTime = drawingTime;
    self.drawingDate = drawingDate;

    self.toString = function () {
        return String.format("DrawingTimeNotFoundException: the requested drawing time \"{1}\" was not available for date {2}",
            self.drawingTime, self.drawingDate);
    };

    return self;
}

DrawingTimeNotFoundException.prototype = BytePushers.inherit(Error.prototype);
DrawingTimeNotFoundException.prototype.constructor = DrawingTimeNotFoundException;
DrawingTimeNotFoundException.prototype.superclass = Error;

module.exports = DrawingTimeNotFoundException;
