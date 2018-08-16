/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingTimeInFutureException(drawingTime, drawingDate, expectedDrawTime) {
    'use strict';
    var self = {};

    DrawingTimeInFutureException.prototype.superclass.apply(self);

    self.name = "DrawingTimeInFutureException";
    self.code = Exception.Code.DRAWING_TIME_IN_FUTURE;
    self.drawingTime = drawingTime;
    self.drawingDate = drawingDate;
    self.expectedDrawTime = expectedDrawTime;

    self.toString = function () {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            self.drawingTime, self.drawingDate, self.expectedDrawTime);
    };

    return self;
}

DrawingTimeInFutureException.prototype = BytePushers.inherit(Error.prototype);
DrawingTimeInFutureException.prototype.constructor = DrawingTimeInFutureException;
DrawingTimeInFutureException.prototype.superclass = Error;

module.exports = DrawingTimeInFutureException;
