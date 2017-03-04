"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var request = require("request");
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
        var args = this.args;
        var relevance = 0.0;
        var text = "404";
        if (args.apiai) {
            var result = args.apiai.result;
            if (result.action === 'input.unknown') {
                return cb({
                    text: result.fulfillment.speech
                });
            }
            else {
                if (result.action === 'input.person') {
                    var fullname = result.parameters['full-name'];
                    if (fullname['given-name'] && fullname['last-name']) {
                        text = util.format("%s %s", fullname['given-name'], fullname['last-name']);
                    }
                    else {
                        text = fullname;
                    }
                }
                else if (result.action === 'input.place') {
                    text = result.parameters['geo-city'];
                }
            }
        }
        var url = util.format("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%s&text=%s&page=1&format=json&nojsoncallback=1&sort=relevance", process.env.API_KEY, encodeURIComponent(text));
        request.get(url, function (error, response, body) {
            if (error) {
                throw error;
            }
            var photos = JSON.parse(body).photos;
            if (photos && photos.photo.length > 0) {
                var photo = photos.photo[0];
                var url_1 = util.format("http://farm%s.staticflickr.com/%s/%s_%s.jpg", photo.farm, photo.server, photo.id, photo.secret);
                var result = {
                    attachment: {
                        type: "image",
                        payload: {
                            url: url_1
                        }
                    }
                };
                cb(result);
            }
            else {
                cb({
                    text: util.format("Sorry could not find anything for \"%s\"", args.message.text)
                });
            }
        });
    };
    return Bot;
}());
exports.Bot = Bot;
