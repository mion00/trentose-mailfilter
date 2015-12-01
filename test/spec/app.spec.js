describe("MailModel", function () {
    it("should load the initial data", function () {
        expect(MailModel.messages).toBeDefined();
        expect(MailModel.rules).toBeDefined();
        expect(MailModel.messages).toContain("news@spam.com");
        expect(MailModel.rules).toContain("spam.com");
    });

    it("the filter should always return something", function() {
        expect(MailModel.filter()).toBeDefined();
    });

});

describe("MailController", function() {
    it("should be unfiltered initially", function() {
        expect(MailController.filtered).toBeFalsy();
    });
});
