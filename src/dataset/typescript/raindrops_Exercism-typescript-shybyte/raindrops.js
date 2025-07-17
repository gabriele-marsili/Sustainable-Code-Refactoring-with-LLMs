"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FACTOR_RAINDROP_PAIRS = [
    [3, 'Pling'],
    [5, 'Plang'],
    [7, 'Plong']
];
class Raindrops {
    convert(n) {
        const dropString = FACTOR_RAINDROP_PAIRS
            .map(([factor, drop]) => (n % factor === 0) ? drop : '')
            .join('');
        return dropString || (n.toString());
    }
}
exports.default = Raindrops;
