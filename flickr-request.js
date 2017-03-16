"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var request = require("request");
var FlickrRequest = (function () {
    function FlickrRequest() {
    }
    FlickrRequest.prototype.send = function (text, success, err) {
        var url = util.format("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%s&text=%s&page=1&format=json&nojsoncallback=1&sort=relevance", process.env.API_KEY, encodeURIComponent(text));
        request.get(url, function (error, response, body) {
            if (error) {
                throw error;
            }
            var photos = JSON.parse(body).photos;
            if (photos && photos.photo.length > 0) {
                var photo = photos.photo[0];
                var url_1 = util.format("http://farm%s.staticflickr.com/%s/%s_%s.jpg", photo.farm, photo.server, photo.id, photo.secret);
                success({
                    url: url_1
                });
            }
            else {
                err(util.format("Sorry could not find anything for \"%s\"", text));
            }
        });
    };
    return FlickrRequest;
}());
exports.FlickrRequest = FlickrRequest;
