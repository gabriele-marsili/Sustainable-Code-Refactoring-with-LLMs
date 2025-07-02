"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FACTOR_RAINDROP_PAIRS = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
];
var Raindrops = /** @class */ (function () {
    function Raindrops() {
    }
    Raindrops.prototype.convert = function (n) {
        var dropString = FACTOR_RAINDROP_PAIRS
            .map(function (_a) {
            var factor = _a[0], drop = _a[1];
            return (n % factor === 0) ? drop : '';
        })
            .join('');
        return dropString || (n.toString());
    };
    return Raindrops;
}());
exports.default = Raindrops;
