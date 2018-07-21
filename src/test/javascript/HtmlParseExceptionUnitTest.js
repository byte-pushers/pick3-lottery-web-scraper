/**
 * Created by kalexmills on 7/20/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert');

describe("HtmlParseException Unit Tests", function() {
    it("should return toString() messages as specified", function () {
        var expectedMsg = "HtmlParseException: test msg here",
            exception = new BytePushers.HtmlParseException("test msg here"),
            actualMsg = exception.toString();

        assert.equal(expectedMsg, actualMsg);
    });
});