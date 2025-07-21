"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FACTOR_RAINDROP_PAIRS = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
];
class Raindrops {
    convert(n) {
        let dropString = '';
        for (const [factor, drop] of FACTOR_RAINDROP_PAIRS) {
            if (n % factor === 0) {
                dropString += drop;
            }
        }
        return dropString || n.toString();
    }
}
exports.default = Raindrops;
