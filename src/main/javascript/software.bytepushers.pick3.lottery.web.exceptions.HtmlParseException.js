/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function HtmlParseException(message) {
    'use strict';
    var self = {};
    
    HtmlParseException.prototype.superclass.apply(self);

    self.name = "HtmlParseException";
    self.code = Exception.Code.HTML_PARSE_ERROR;
    self.message = message;

    self.toString = function () {
        return String.format("HtmlParseException: {1}", self.message);
    };

    return self;
}

HtmlParseException.prototype = BytePushers.inherit(Exception.prototype);
HtmlParseException.prototype.constructor = HtmlParseException;
HtmlParseException.prototype.superclass = Exception;

module.exports = HtmlParseException;
