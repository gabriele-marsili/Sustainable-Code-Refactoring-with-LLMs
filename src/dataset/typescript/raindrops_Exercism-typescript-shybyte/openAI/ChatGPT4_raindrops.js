"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FACTOR_RAINDROP_PAIRS = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
];
class Raindrops {
    convert(n) {
        let result = '';
        for (const [factor, drop] of FACTOR_RAINDROP_PAIRS) {
            if (n % factor === 0)
                result += drop;
        }
        return result || n.toString();
    }
}
exports.default = Raindrops;
