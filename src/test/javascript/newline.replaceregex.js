var assert = require('assert');

describe("Regular Express Tests", function() {
    it("should be able to replace new line characters from string", function () {
        var text = "8\n\n",
            expectedText = "8 ",
            actualText = text.replace(/\r|\n/g, "");

        assert.equal(actualText, expectedText);
    });
});