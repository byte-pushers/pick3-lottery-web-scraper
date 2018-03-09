var assert = require('assert');

var text = "8\n \n",
    expectedText = "8 ",
    actualText = text.replace(/\r|\n/g, "");

assert(actualText, expectedText);
