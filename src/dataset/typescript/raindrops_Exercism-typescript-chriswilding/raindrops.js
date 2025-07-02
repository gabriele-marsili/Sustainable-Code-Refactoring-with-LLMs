"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rainsdrops = /** @class */ (function () {
    function Rainsdrops() {
    }
    Rainsdrops.prototype.convert = function (n) {
        var output = [];
        if (n % 3 === 0) {
            output.push('Pling');
        }
        if (n % 5 === 0) {
            output.push('Plang');
        }
        if (n % 7 === 0) {
            output.push('Plong');
        }
        if (output.length) {
            return output.join("");
        }
        return n.toString();
    };
    return Rainsdrops;
}());
exports.default = Rainsdrops;
