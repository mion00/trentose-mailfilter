describe("MailModel", function () {
    it("should load the initial data", function () {
        expect(MailModel.messages).toBeDefined();
        expect(MailModel.rules).toBeDefined();
        expect(MailModel.messages).toContain({
            from : "news@spam.com",
            subject : "we have a special offer for you"
        });
        expect(MailModel.rules).toContain({
            subject : "special offer"
        });
    });

    it("the filter should always return something", function() {
        expect(MailModel.filter()).toBeDefined();
    });
    it("the filter should correctly filter the emails", function() {
        var mails = MailModel.filter();
        mails.forEach(function(mail) {
            MailModel.rules.forEach(function(rule) {
               if (rule.from) {
                   expect(mail.from).not.toContain(rule.from);
               }
                if (rule.subject) {
                    expect(mail.subject).not.toContain(rule.subject);
                }
            });
        })
    })
});

describe("MailController", function() {
    it("should be unfiltered initially", function() {
        expect(MailController.filtered).toBeFalsy();
    });
    it("should return all mails if not filtered", function() {
        spyOn(MailView, 'showMail');
        MailController.filtered = true;
        MailController.filter();
        expect(MailView.showMail).toHaveBeenCalled();
        expect(MailView.showMail.mostRecentCall.args[0]).toBe(MailModel.messages);
    });
    it("should return only allowed mails if filtered", function() {
        spyOn(MailView, 'showMail');
        MailController.filtered = false;
        MailController.filter();
        expect(MailView.showMail).toHaveBeenCalled();

        var filteredMails = MailModel.filter();
        var viewMails = MailView.showMail.mostRecentCall.args[0];
        expect(filteredMails.length).toBe(viewMails.length);
        viewMails.forEach(function(elem) {
            expect(filteredMails).toContain(elem);
        });
    })
});
