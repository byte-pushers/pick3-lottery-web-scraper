var BytePushers = require('bytepushers-js-oop');

function HtmlParseException(message) {
    'use strict';
    HtmlParseException.prototype.superclass.apply(this);

    this.name = "HtmlParseException";
    this.message = message;

    this.toString = function() {
        return String.format("HtmlParseException: {1}", this.message);
    }
}

HtmlParseException.prototype = BytePushers.inherit(Error.prototype);
HtmlParseException.prototype.constructor = HtmlParseException;
HtmlParseException.prototype.superclass = Error;

module.exports = HtmlParseException;
