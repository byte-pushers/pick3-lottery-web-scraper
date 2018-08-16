/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

var BytePushers = require('bytepushers-js-oop');

function Exception() {
    'use strict';
    var self = {};
    
    Exception.prototype.superclass.apply(self);

    self.name = "Exception";
    self.code = Exception.Code.BASE_EXCEPTION;

    self.toString = function () {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            self.drawingTime, self.drawingDate, self.expectedDrawTime);
    };

    return self;
}

Exception.prototype = BytePushers.inherit(Error.prototype);
Exception.prototype.constructor = Exception;
Exception.prototype.superclass = Error;

Exception.Code = {};
Exception.Code.BASE = "exception.base";
Exception.Code.DRAWING_TIME_IN_FUTURE = "exception.drawTimeInFuture";
Exception.Code.DRAWING_TIME_NOT_FOUND = "exception.drawTimeNotFound";
Exception.Code.DRAWING_YEAR_NOT_AVAILABLE = "exception.drawYearNotAvailable";
Exception.Code.HTML_PARSE_ERROR = "exception.htmlParseError";

module.exports = Exception;
