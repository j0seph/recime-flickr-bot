"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiai_1 = require("./apiai");
var flickr_request_1 = require("./flickr-request");
var Bot = (function () {
    function Bot(args) {
        this.args = args;
    }
    Object.defineProperty(Bot.prototype, "extract", {
        get: function () {
            return "message.text";
        },
        enumerable: true,
        configurable: true
    });
    Bot.prototype.execute = function (cb) {
        new flickr_request_1.FlickrRequest().send(new apiai_1.ApiAi().extract(this.args), function (result) {
            cb({
                "type": "photo",
                "payload": {
                    "photo": result.url
                }
            });
        }, function (err) {
            cb({
                text: err
            });
        });
    };
    return Bot;
}());
exports.Bot = Bot;
