"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var ApiAi = (function () {
    function ApiAi() {
    }
    ApiAi.prototype.extract = function (args) {
        if (args.apiai) {
            var result = args.apiai.result;
            if (result.action === 'input.unknown') {
                return result.fulfillment.speech;
            }
            else {
                if (result.action === 'input.person') {
                    var fullname = result.parameters['full-name'];
                    if (fullname['given-name'] && fullname['last-name']) {
                        return util.format("%s %s", fullname['given-name'], fullname['last-name']);
                    }
                    else {
                        return fullname;
                    }
                }
                else if (result.action === 'input.place') {
                    return result.parameters['geo-city'];
                }
            }
        }
        return args.message.text;
    };
    return ApiAi;
}());
exports.ApiAi = ApiAi;
