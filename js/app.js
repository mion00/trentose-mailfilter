/* your code should go here */


// You can modify this object, add functions that you need
var MailModel = {
    /**
     * Initialises the model with the "database" of filter rules
     * and messages. This function is already implemented.
     */
    init: function () {
        this.rules = rules;
        this.messages = msgs;
    },

    matchFilter: function (message) {
        var found = false;
        this.rules.forEach(function(rule) {
            if ((message.indexOf(rule)) != -1) {
                //console.log(message.indexOf(rule));
                found = true;
            }
        });
        return found;
    },
    /**
     * Filters out messages in the "database" that match the spam rules.
     * @return array of messages, excluding those that match the filter rules.
     */
    filter: function () {
        var messages = [];
        this.messages.forEach(function (elem) {
            if (!MailModel.matchFilter(elem)) {
                //console.log(elem);
                messages.push(elem);
            }
        });
        return messages;
    }


};

var MailController = {
    filtered: false,
    init: function() {
        MailModel.init();
        MailView.init();
        MailView.showMail(MailModel.messages);
        $("#filter").click(MailController.filter);
    },
    filter: function(event) {
        if (MailController.filtered) {
            MailController.filtered = false;
            MailView.showMail(MailModel.messages);
        } else {
            MailController.filtered = true;
            MailView.showMail(MailModel.filter());
        }
    }
};

var MailView = {
    init: function() {
        MailView.list = $("ul.result");
    },
    showMail: function(mails) {
        //console.log(mails);
        MailView.list.empty();
        mails.forEach(function(elem) {
            var html = "<ul>"+elem+"</ul>";
            MailView.list.append(html);
        });
    }
};

// Example of usage:
// MailModel.init()
// MailModel.filter() 
//  -> ["carlo@gmail.com", "trentose2@googlegroups.com"]


// We suggest to use js patters. 
// you can add here your views and controllers if you decide to do so.


$(document).ready(function () {
    MailController.init();
});